require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");

require("./database"); // ensures the DB is created and seeded on boot

const authRoutes = require("./routes/auth.routes");
const menuRoutes = require("./routes/menu.routes");
const ordersRoutes = require("./routes/orders.routes");
const profileRoutes = require("./routes/profile.routes");
const { notFound, errorHandler } = require("./middleware/error.middleware");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Fast Pizza API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/profile", profileRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Fast Pizza API listening on port ${PORT}`);
});
