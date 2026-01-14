const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/authRoutes");


dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("MERN Todo Backend Running ✅");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.use("/api/todos", todoRoutes);
  app.use("/api/auth", authRoutes);


  app.get("/", (req, res) => {
    res.send("MERN Todo Backend Running ✅");
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
startServer();
