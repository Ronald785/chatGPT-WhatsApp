import "dotenv/config";
import Session from "./session.js";

const session = new Session(process.env.MY_NUMBER, [process.env.ALLOWED_NUMBER]);

session.initialize();
