import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    googleId: { type: String, required: false },
    id: { type: String, required: false },
    avatar: { type: String,required: false },
    date: { type: Date, default: Date.now },
});

export default mongoose.model("UserModel", userSchema);