const Workspace = require("../models/workspace");
const User = require("../models/user");
const { isUserInWorkspace } = require("../utilityFunction");



async function handleCreateWorkspace(req,res){
    try {
        const newWorkspace = await Workspace.create({
            name : req.body.name,
            description : req.body.description,
            owner : req.user._id,
            members : [req.user._id],
        });
        

        res.status(201).json(newWorkspace);
    } 
    catch (error) {
        console.error("Error creating workspace:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function handleAddMemberToWorkspace(req,res){
    try {
        const workspaceId = req.body.workspaceId;
        const userIdToAdd = req.body.userId;
        const workspace = await Workspace.findById(workspaceId);
        const user = await User.findById(userIdToAdd);

        if(!user) return res.status(404).json({ message: "User not found" });
        
        if(!workspace) return res.status(404).json({ message: "Workspace not found" }); 
        
        if(!isUserInWorkspace(req.user, workspace)) {
                    return res.status(403).json({ message: "Forbidden: You do not have access to this workspace" });
        }

        if (workspace.members.some(
            id => id.toString() === userIdToAdd.toString()
        )) {
            return res.status(400).json({ message: "User is already a member" });
        }

        workspace.members.push(userIdToAdd);
        await workspace.save();

        res.status(200).json({ message: "Member added successfully" });
    }
    catch (error) {
        console.error("Error adding member to workspace:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function handleGetWorkspace(req,res){
    try{
        const workspaceId = req.params.id;
        const workspace = await Workspace.findById(workspaceId).populate('owner','name email ').populate('members','name email');

        if(!workspace) {
            return res.status(404).json({ message: "Workspace not found" });
        }
        console.log(req.user);

        if(!isUserInWorkspace(req.user, workspace)) {
            return res.status(403).json({ message: "Forbidden: You do not have access to this workspace" });
        }
        
        res.status(200).json(workspace);
    }
    catch (error) {
        console.error("Error fetching workspace:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    handleCreateWorkspace,
    handleAddMemberToWorkspace,
    handleGetWorkspace,
}


