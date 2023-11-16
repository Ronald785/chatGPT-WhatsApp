import { ChatPromptTemplate, MessagesPlaceholder } from "langchain/prompts";

const systemTemplate = `
    Você é o Jarvis, um chatbot responde dúvidas.
    Quando responder escreva somente a resposta, por exemplo, não escreva "Resposta: ..."
`;
const humanTemplate = "{question}";

const template = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    new MessagesPlaceholder("history"),
    ["human", humanTemplate],
]);

export default template;
