const bcrypt = require('bcrypt');
const User = require('../models/user');
const auth = require('../service/auth');



async function handleRegister(req,res) {
    try{
        const data = req.body;
        if(!data.name || !data.email || !data.password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        const user = new User(data);
        user.password = await bcrypt.hash(user.password, 10);

        const savedata = await user.save();
         res.status(201).json({ message: "User registered successfully", user: savedata });
    } 

    catch (error) {
        console.error("Error registering user:", error);
        if (error.code === 11000) { 
            res.status(400).json({ message: "Email already exists" }); 
        } 
        else { 
            res.status(500).json({ message: "Internal server error" }); 
        }
    }
}


async function handleLogin(req,res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        user.lastLogin = new Date();
        await user.save();

        
        const token = auth.setUser(user);
        console.log("token", token);
        res.cookie("uid", token);
        res.status(200).json({ message: "Login successful", user, token });
    } 
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}





module.exports = {
    handleRegister,
    handleLogin
};

