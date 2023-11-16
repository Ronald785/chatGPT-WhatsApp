import chat from "../langchain/chat.js";
import db from "../db/index.js";

async function test(id) {
    db.client.connect();

    const chatIA = await chat(id);

    const responseChat1 = await chatIA.call({ question: "O que é jujutsu?" });
    console.log(responseChat1.response + "\n");

    const responseChat2 = await chatIA.call({ question: "Estou falando do anime" });
    console.log(responseChat2.response + "\n");

    const responseChat3 = await chatIA.call({ question: "Quem é o mais forte do anime?" });
    console.log(responseChat3.response + "\n");

    db.client.close();
}

test("61b9c3b14f14695166b83c3e");
