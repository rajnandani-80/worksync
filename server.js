const express = require('express');
const app = express();
const port = 3011;

require('dotenv').config();
const cors = require("cors");
app.use(cors({ origin: "*" }));
const cookieParser = require('cookie-parser');

const connectToMongoDB = require('./connect');
const userRoute = require('./routes/user');
const workspaceRoute = require('./routes/workspace');
const taskRoute = require('./routes/task');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


connectToMongoDB(process.env.url)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));


app.get("/", (req, res) => {
    res.send("WorkSync backend is running 🚀");
});


app.use('/user',userRoute);
app.use('/workspace',workspaceRoute);
app.use('/task',taskRoute);








app.listen(port, () => {
  console.log(`Server is running on ${port}`);
})
