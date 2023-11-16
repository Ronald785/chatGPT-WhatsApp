import "dotenv/config";
import { ConversationChain } from "langchain/chains";
import model from "./model/index.js";
import template from "./template.js";
import memory from "./memory.js";

const chat = (id) => {
    return new Promise((resolve) => {
        const memoryChat = memory(id);
        const chain = new ConversationChain({ llm: model, memory: memoryChat, prompt: template });
        resolve(chain);
    });
};

export default chat;
