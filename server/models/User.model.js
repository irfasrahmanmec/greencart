import mongoose from "mongoose";

const  userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String, 
        required: [true, "Password is required"]
    },
    cartItems: {
        type: Object,
        required: true,
        default: {},
    },

},{minimize: false})

const User = mongoose.models.user || mongoose.model('user',userSchema);

export default User;