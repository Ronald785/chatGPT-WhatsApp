import "dotenv/config";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db(process.env.MONGO_DB);

const collectionChatHistory = db.collection(process.env.MONGO_COLLECTION_CHAT_HISTORY);
const collectionContact = db.collection(process.env.MONGO_COLLECTION_CONTACT);

export { client, collectionChatHistory, collectionContact };
