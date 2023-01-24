const mongoose = require("mongoose");

const PostShema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    desc: {
        type: String,
        max:50,
    },
    desc2: {
        type: String,
        max:500,
    },
    img: {
        type: String,

    },
 
},
{ timestamps: true } 
);

module.exports = mongoose.model("Post", PostShema);