import mongoose from "mongoose";

type connectionObject = {
    isConnected?: number
}

const connection: connectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to database");
        return;
    }

    try {

        const db = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/anonymous-messages', {})
        connection.isConnected = db.connections[0].readyState
        console.log("DB connected successfully")

    } catch (error) {
        console.error("Database connection failed", error);
        /* The process.exit() method instructs Node.js to terminate the process synchronously with an exit status of code. 
        If code is omitted, exit uses either the 'success' code 0 or the value of process.exitCode if it has been set. 
        Node.js will not terminate until all the 'exit' event listeners are called. */
        process.exit(1);
    }
}

export default dbConnect