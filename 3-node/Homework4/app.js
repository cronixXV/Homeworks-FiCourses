const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Technology = require("./models/technology");
// const Project = require("./models/project");
const Feedback = require("./models/feedback");
const projectRoutes = require("./routes/projects");
const path = require("path");

const app = express();
app.use(bodyParser.json());

mongoose
  .connect("mongodb://root:1234@localhost:27017/mydatabase?authSource=admin")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Подключение маршрутов для проектов
app.use("/api/projects", projectRoutes);

// Endpoint для получения списка технологий
app.get("/technologies", async (req, res) => {
  try {
    const technologies = await Technology.find();
    res.json(technologies);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Endpoint для добавления новой технологии
app.post("/technologies", async (req, res) => {
  const newTechnology = new Technology(req.body);
  try {
    await newTechnology.save();
    res.status(201).json(newTechnology);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Endpoint для обновления информации о технологии
app.put("/technologies/:id", async (req, res) => {
  const id = req.params.id;
  const updatedTechnology = req.body;
  try {
    const technology = await Technology.findByIdAndUpdate(
      id,
      updatedTechnology,
      { new: true }
    );
    res.json(technology);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Endpoint для удаления технологии
app.delete("/technologies/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Technology.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Endpoint для отправки отзыва
app.post("/feedback", async (req, res) => {
  const newFeedback = new Feedback(req.body);
  try {
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Endpoint для отдачи статических файлов
app.use(express.static(path.join(__dirname, "public")));

// Маршрут для отправки файла portfolio.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "portfolio.html"));
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
