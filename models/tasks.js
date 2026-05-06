const mongoose = require("mongoose");
const workspace = require("./workspace");

const taskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
    },
    status : {
        type : String,
        enum : ["pending", "in-progress", "completed"],
        default : "pending",
    },
    priority : {
        type : String,
        enum : ["low", "medium", "high"],
        default : "medium",
    },
    workspaceId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Workspace",
        required : true,
    },
    assignedTo : [{ 
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    }],
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    comments: [
        {
            text: {
                type: String,
                required: true
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
},
    {timestamps : true}
);  

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;


