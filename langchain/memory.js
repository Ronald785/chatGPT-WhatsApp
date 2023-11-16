import { MongoDBChatMessageHistory } from "langchain/stores/message/mongodb";
import { BufferMemory } from "langchain/memory";
import db from "../db/index.js";
import { ObjectId } from "mongodb";

const collection = db.collectionChatHistory;

const memory = (id) => {
    const chatHistory = new MongoDBChatMessageHistory({
        collection,
        sessionId: new ObjectId(id),
    });

    return new BufferMemory({
        memoryKey: "history",
        returnMessages: true,
        chatHistory,
    });
};

export default memory;
