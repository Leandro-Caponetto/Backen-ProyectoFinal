import mongoose from "mongoose";

const userCollection = "users"

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    social: String,
    role: String,
    tickets: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tickets'
        }]
    }
})

mongoose.set("strictQuery", false)
const UserModel = mongoose.model(userCollection, userSchema)

export default UserModel