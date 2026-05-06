const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
    },
    description : {
        type : String,
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",  
        required : true,
    },
    members : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    }],
},
    {timestamps : true}
);


const Workspace = mongoose.models.Workspace || mongoose.model("Workspace", workspaceSchema);
module.exports = Workspace;


