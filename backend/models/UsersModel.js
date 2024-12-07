import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default: "client"
    }
    /*lastUser: {
        name: {
            type: String,
        },
        password: {
            type: String,
        },
        email: {
            type: String,
        }
    }*/
});
export const UserModel = model("users", UserSchema);