
function isUserInWorkspace(user, workspace) {
    const userId = user._id.toString();
    const isOwner = workspace.owner.toString() === userId;

    const isMember = workspace.members.some(
        member => member._id.toString() === userId
    );
    
    return isOwner || isMember;
}


module.exports = {  
    isUserInWorkspace,
}

