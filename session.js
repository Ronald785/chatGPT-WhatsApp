import "dotenv/config";
import pkg from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

const { Client } = pkg;

class Session {
    clientData = null;

    constructor(myNumber, allowedNumbers) {
        this.myNumber = myNumber;
        this.allowedNumbers = allowedNumbers;
    }

    async initialize() {
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
            puppeteer,
        });

        this.clientData.initialize();

        this.clientData.on("qr", (qr) => {
            qrcode.generate(qr, { small: true });
        });

        this.clientData.on("ready", () => {
            console.log("Client is ready!");
        });

        this.clientData.on("message", async (message) => {
            console.log(message.body);

            const contact = await message.getContact();
            const contactChat = await message.getChat();

            if (!this.allowedNumbers.includes(contact.number)) return;

            const handledMessage = await handleMessage(message);

            if (!handledMessage.type == "text") return;

            contactChat.sendStateTyping();

            this.sendPrivateMessage(contact.number, "Reply: \n" + message.body);
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
