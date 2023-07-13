import mongoose from "mongoose";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";


import AuthRoles from "../utils/authRoles.util.js";
import config from "../config/index.config.js";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide the name"],
        maxLength: [50, "Name of the user cannot be more than 50 characters"]
    },
    email: {
        type: String,
        required: [true, "Provide the email"]
    },
    password: {
        type: String,
        required: [true, "Provide the password"],
        minLength: [8, "Password Length shouldn't less than 8 characters"],
        select: false
    },
    role: {
        type: String,
        enum: Object.values(AuthRoles),
        default: AuthRoles.USER
    }

}, {timestamps: true});


userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods = {
    comparePassword: async function(enteredPassword){
        return await bcrypt.compare(enteredPassword, this.password);
    },
    getJWTtoken: function (){
        return JWT.sign({_id: this._id}, config.JWT_SECRET, {expiresIn: config.JWT_EXPIRY})
    }
}


export default mongoose.model("User", userSchema);