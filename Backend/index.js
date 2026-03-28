import dotenv from "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/db/db.js";

const port = process.env.PORT;


connectDB();
app.listen(port,()=>{
    console.log("server running");
})