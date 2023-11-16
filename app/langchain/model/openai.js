import "dotenv/config";
import { ChatOpenAI } from "langchain/chat_models/openai";

const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo",
    temperature: 0.5,
});

export default model;
