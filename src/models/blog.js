import mongoose from "mongoose";


const blogSchema = new mongoose.Schema({
    user_id : {
        type: String,
        required: true,
    },
    username: {
        type : String,
        required: true,
    },
    title : {
        type: String,
        required: true,
    },
    upload_date: {
        type : Date,
        required: true
    },
    content : {
        type: String,
        required: true,
    },
    likesCount : [],
    comments: [
  {
    username: String,
    comment: String,
    timestamp: { type: Date }
  }
],
})

const Blog = mongoose.models.blogs || mongoose.model("blogs",blogSchema)
export default Blog;