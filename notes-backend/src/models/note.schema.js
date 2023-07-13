import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Please provide a title"],
        minLength: [5, "Title length cannot be less than 5 characters"]
    },
    body:{
        type: String,
        required: [true, "Please write your content"],
        minLength: [20, "Title length cannot be less than 20 characters"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    archived:{
        type: Boolean,
        default: false
    }
},{timestamps: true})

export default mongoose.model("Note", noteSchema);