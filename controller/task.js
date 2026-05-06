const Task = require("../models/tasks");
const Workspace = require("../models/workspace");
const User = require("../models/user");
const { isUserInWorkspace } = require("../utilityFunction");



async function handleCreateTask(req,res){
    try {
        const { title, description, status, priority, workspaceId, assignedTo } = req.body;
        const workspace = await Workspace.findById(workspaceId);

        if(!workspace) {
            return res.status(404).json({ message: "Workspace not found" });
        }
        if(!isUserInWorkspace(req.user, workspace)) {
            return res.status(403).json({ message: "Forbidden: You do not have access to this workspace" });
        }

        const newTask = await Task.create({
            title,
            description,    
            status,
            priority,
            workspaceId,
            assignedTo,
            createdBy : req.user._id,
        });
        res.status(201).json(newTask);
    } 
    catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function handleGetTask(req,res){
    try {
        const workspaceId = req.params.workspaceId;
        const workspace = await Workspace.findById(workspaceId);
        console.log(workspaceId);

        if(!workspace) {
            return res.status(404).json({ message: "Workspace not found" });
        }

        if(!isUserInWorkspace(req.user, workspace)) {
            return res.status(403).json({ message: "Forbidden: You do not have access to this workspace" });
        }

        const tasks = await Task.find({ workspaceId }).populate('assignedTo', 'name email').populate('createdBy', 'name email');
        res.status(200).json(tasks);
    }
    catch (error) {
        console.error("Error fetching task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

async function handleUpdateTask(req,res){
    try {
        const taskId = req.params.id;
        const { title, description, status, priority, assignedTo } = req.body;
        const existingTask = await Task.findById(taskId);
        if(!existingTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        const workspace = await Workspace.findById(existingTask.workspaceId);
        if(!workspace) {
            return res.status(404).json({ message: "Workspace not found" });
        }

        if(!isUserInWorkspace(req.user, workspace)) {
            return res.status(403).json({ message: "Forbidden: You do not have access to this workspace" });
        }
        
        if(req.user._id.toString() !== existingTask.assignedTo.toString() && req.user._id.toString() !== workspace.owner.toString()) {
            return res.status(403).json({ message: "Forbidden: Only task Assigned member or workspace owner can update the task" });
        }

        existingTask.title = title || existingTask.title;
        existingTask.description = description || existingTask.description;
        existingTask.status = status || existingTask.status;
        existingTask.priority = priority || existingTask.priority;
        existingTask.assignedTo = assignedTo || existingTask.assignedTo;
        await existingTask.save();
        res.status(200).json(existingTask);
    }
    catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function handleDeleteTask(req,res){
    try {
        const taskId = req.params.id;
        const existingTask = await Task.findById(taskId);
        if(!existingTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        const workspace = await Workspace.findById(existingTask.workspaceId);
        if(!workspace) {
            return res.status(404).json({ message: "Workspace not found" });
        }
        if(req.user._id.toString() !== existingTask.createdBy.toString() && req.user._id.toString() !== workspace.owner.toString()) {
            return res.status(403).json({ message: "Forbidden: Only task creator or workspace owner can delete the task" });
        }
        await existingTask.deleteOne();
        res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

async function handleAddComment(req,res) {
    try {
        const taskId = req.params.id;
        const { text } = req.body;
        const task = await Task.findById(taskId);
        if(!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        const workspace = await Workspace.findById(task.workspaceId);
        if(!workspace) {
            return res.status(404).json({ message: "Workspace not found" });
        }
        if(!isUserInWorkspace(req.user, workspace)) {
            return res.status(403).json({ message: "Forbidden: You do not have access to this workspace" });
        }
        task.comments.push({ text, userId: req.user._id });
        await task.save();
        res.status(200).json(task);
    }
    catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function handleGetComments(req,res) {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId).populate('comments.userId', 'name email');
        if(!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        const workspace = await Workspace.findById(task.workspaceId);
        if(!workspace) {
            return res.status(404).json({ message: "Workspace not found" });
        }
        if(!isUserInWorkspace(req.user, workspace)) {
            return res.status(403).json({ message: "Forbidden: You do not have access to this workspace" });
        }
        res.status(200).json(task.comments);
    }
    catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    handleCreateTask,
    handleGetTask,
    handleUpdateTask,
    handleDeleteTask,
    handleAddComment,
    handleGetComments
};
























