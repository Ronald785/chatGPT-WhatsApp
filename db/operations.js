import "dotenv/config";
import db from "./index.js";
import { ObjectId } from "mongodb";

async function getOrCreateContact(myNumber, contactNumber) {
    try {
        await db.client.connect();

        const existingDoc = await db.collectionContact.findOne({ myNumber, contactNumber });

        if (existingDoc) {
            return existingDoc;
        } else {
            const newDoc = { _id: new ObjectId(), myNumber, contactNumber, createdAt: new Date() };

            await db.collectionContact.insertOne(newDoc);

            return newDoc;
        }
    } catch (err) {
        console.error(`Error getOrCreateContact: `, err);
        return [];
    } finally {
        await db.client.close();
    }
}

const operations = { getOrCreateContact };

export default operations;
