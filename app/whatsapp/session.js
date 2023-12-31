import "dotenv/config";
import pkg from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { MongoStore } from "wwebjs-mongo";
import mongoose from "mongoose";
import __dirname from "../utils/dirname.js";
import chat from "../langchain/chat.js";
import db from "../db/index.js";
import operations from "../db/operations.js";
import memory from "../langchain/memory.js";

const { Client, RemoteAuth } = pkg;

class Session {
    clientData = null;

    constructor(myNumber, allowedNumbers) {
        this.myNumber = myNumber;
        this.allowedNumbers = allowedNumbers;
    }

    async initialize() {
        await mongoose.connect(process.env.MONGO_URI + process.env.MONGO_DB);

        const authStrategy = new RemoteAuth({
            clientId: this.myNumber,
            dataPath: __dirname + `/sessions/${this.myNumber}`,
            store: new MongoStore({ mongoose: mongoose }),
            backupSyncIntervalMs: 60000,
        });

        const puppeteer = {
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-extensions",
                "--disable-dev-shm-usage",
                "--disable-accelerated-2d-canvas",
                "--no-first-run",
                "--no-zygote",
                "--single-process", // <- this one doesn't works in Windows
                "--disable-gpu",
            ],
            executablePath: "/usr/bin/google-chrome-stable",
        };

        this.clientData = new Client({
            qrMaxRetries: 5,
            authStrategy,
            puppeteer,
        });

        this.clientData.initialize();

        this.clientData.on("qr", (qr) => {
            qrcode.generate(qr, { small: true });
        });

        this.clientData.on("ready", () => {
            console.log("Client is ready!");
        });

        this.clientData.on("remote_session_saved", () => {
            console.log("remote_session_saved!");
        });

        this.clientData.on("message", async (message) => {
            const contact = await message.getContact();
            const contactChat = await message.getChat();

            if (!this.allowedNumbers.includes(contact.number)) {
                contactChat.sendStateTyping();
                this.sendPrivateMessage(contact.number, "Você não tem permissão para usufruir da IA");
                return;
            }

            const handledMessage = await handleMessage(message);

            if (!handledMessage.type == "text") return;

            contactChat.sendStateTyping();

            const contactDoc = await operations.getOrCreateContact(this.myNumber, contact.number);

            await db.client.connect();
            const chatAI = await chat(contactDoc._id);

            try {
                const responseAI = await chatAI.call({ question: handledMessage.text });
                this.sendPrivateMessage(contact.number, responseAI.response);
            } catch (error) {
                if (error.code == "context_length_exceeded") {
                    const memoryChat = memory(contactDoc._id);
                    await memoryChat.chatHistory.clear();
                    this.sendPrivateMessage(
                        contactDoc.number,
                        "O limite do histórico foi excedido, por conta disso, o histórico de conversa com o bot foi limpo.",
                    );
                    const responseAI = await chatAI.call({ question: handledMessage.text });
                    this.sendPrivateMessage(contactDoc.number, responseAI.response);
                } else {
                    console.log(error.code);
                }
            }
            await db.client.close();
        });
    }

    sendPrivateMessage(numberOfContact, message) {
        this.clientData.sendMessage(numberOfContact + "@c.us", message);
    }
}

async function handleMessage(msg) {
    const response = {
        text: null,
        type: null,
    };

    if (msg.type === "chat") {
        response.text = msg.body;
        response.type = "text";
    }

    return response;
}

export default Session;
