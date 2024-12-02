import { Schema, model } from "mongoose";

const DatesSchema = new Schema({
    name_pet:{
        type:String,
        required:true
    },
    age_pet:{
        type:Number,
        required:true
    },
    breed:{
        type:String,
        required:true
    },
    name_user:{
        type:String,
        required:true
    },
    contact_number:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
});

export const DatesModel = model("dates", DatesSchema)