const mongoose=require('mongoose');


const empSchema=new mongoose.Schema({
    full_name: {
        type:String,
        required:true
    },
   email: {
        type:String,
        required:true,
        unique:true
    },
    phone_no: {
        type:Number,
        required:true,
        unique:true
    },
    age: {
        type:Number,
        required:true,
        
    },
    gender: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    confirm_password: {
        type:String,
        required:true
    },
    country: {
        type:String,
        required:true
    },
    city: {
        type:String,
        required:true
    },
    region:{
        type:String,
        required:true
    },
   postal_code:{
        type:Number,
        required:true
    },
    


     
})


const Registration=new mongoose.model("Registration",empSchema);
module.exports=Registration;