const auth = require("../service/auth");

async function restrictToLoggedinUserOnly(req,res,next){
    const userUid = req.cookies?.uid;
    if(!userUid) return res.status(401).json({ message: "Unauthorized: No token provided" });

    const user = auth.getUser(userUid);
    if(!user) return res.status(401).json({ message: "Unauthorized: Invalid token" });
    req.user = user;
    next();
}


module.exports = {
    restrictToLoggedinUserOnly,
}




