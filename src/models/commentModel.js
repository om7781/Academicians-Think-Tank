import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    commentData: {
        type : String,
        required : true
    }
})

const Comment =  mongoose.models.comments || mongoose.model("comments", commentSchema)
export default Comment;