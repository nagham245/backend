const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const itemRoutes = require("./routes/itemRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
<<<<<<< HEAD

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
=======
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); 

>>>>>>> e6187289e5c8e2b6df654ac0dcba3631db3df171
app.use("/items", itemRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

<<<<<<< HEAD

// الاتصال بقاعدة البيانات
mongoose
  .connect(process.env.MONGO_URL, { dbName: "furnitureDB" })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
=======
mongoose
  .connect(process.env.MONGO_URL, { dbName: "furnitureDB" })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
>>>>>>> e6187289e5c8e2b6df654ac0dcba3631db3df171
