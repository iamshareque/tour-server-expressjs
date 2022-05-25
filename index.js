import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));

app.use("/api/users", userRouter); //http://localhost:5000/api/users/signup

const MONGODB_URL = "mongodb+srv://tourdb:tourdb123@cluster0.qzfoc.mongodb.net/tourdb?retryWrites=true&w=majority";

const port =5000;

mongoose.connect(MONGODB_URL).then(() => {
    app.listen(port, () => { console.log(`Server is running on port ${port}`); })
}).catch(err => {
    console.log("Error", err.message);
})

app.get("/", (req, res) => {
    res.send("Hello Express");
})



