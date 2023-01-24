const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        min: 3,
        max: 25,
        
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 50,

    },
    currentpassword: {
        type: String, 
        required: true,
        min: 6,
        max: 50, 
        
    },
    profileimg: {
        type: String,
        default: "",
    },
    desc: {
        type: String,
        max: 500,
    }
    

},
    { timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);