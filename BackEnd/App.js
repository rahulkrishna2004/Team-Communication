require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");

//DB Connection
const ConnectionDb = require("./Config/MongoDb");
// Auth Router Import
const AuthRouter = require("./Router/AuthRouter");
// User Router import
const UserRouter = require("./Router/UserRoutes");
// Message Router Import
const MessageRouter = require("./Router/messageRoutes");
// group Router Import
const GroupRouter = require("./Router/groupRoutes");
// notifaction Router import
const NotificationRoutes = require("./Router/notificationRoutes");
// File Router import
const FileRouter = require("./Router/fileRoutes");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// DBConnection
ConnectionDb();

// Auth Routes
app.use("/api/auth", AuthRouter);     //done WITH WORKING
// User Routes
app.use("/api/user", UserRouter);       //done with working
// Message Routes
app.use("/api/message", MessageRouter);   // done with working
// Gruop Routes
app.use("/api/group", GroupRouter);         // done with working
// Notifaction Routes
app.use("/api/notifaction", NotificationRoutes);    // done 
// File Routes
app.use("/api/files", FileRouter);       

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Runing on ${PORT}`);
});
