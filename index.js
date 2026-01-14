const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://todopro-nu.vercel.app/",
    ],
  })
);


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
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "Server is healthy ✅" });
  });

  app.use(notFound);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
startServer();
