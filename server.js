const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const itemRoutes = require("./routes/itemRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

const allowedOrigins = ['http://localhost:4200', 'http://localhost:53703'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// روتات التطبيق
app.use("/items", itemRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);


// الاتصال بقاعدة البيانات
mongoose
  .connect(process.env.MONGO_URL, { dbName: "furnitureDB" })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});