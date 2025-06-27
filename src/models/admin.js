import mongoose from "mongoose";

const adminData = new mongoose.Schema({
    links : {
        type : String,
        require : true
    }
})

const Admin = mongoose.models.admin || mongoose.model('admin',adminData)
export default Admin;