const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());

// Технологии
let technologies = [
  { name: "Git", image: "/images/git.svg" },
  { name: "HTML5", image: "/images/HTML5.svg" },
  { name: "CSS3", image: "/images/css.svg" },
  { name: "Node.js", image: "/images/Nodejs.svg" },
];

// Проекты
let projects = [
  { name: "Project 1", description: "Description of Project 1" },
  { name: "Project 2", description: "Description of Project 2" },
];

// Отзывы
let feedbacks = [];

// Endpoint для получения списка технологий
app.get("/technologies", (req, res) => {
  res.json(technologies);
});

// Endpoint для добавления новой технологии
app.post("/technologies", (req, res) => {
  const newTechnology = req.body;
  technologies.push(newTechnology);
  res.status(201).json(newTechnology);
});

// Endpoint для обновления информации о технологии
app.put("/technologies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTechnology = req.body;
  technologies[id] = updatedTechnology;
  res.json(updatedTechnology);
});

// Endpoint для удаления технологии
app.delete("/technologies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  technologies.splice(id, -1);
  res.sendStatus(204);
});

// Endpoint для получения списка проектов
app.get("/projects", (req, res) => {
  res.json(projects);
});

// Endpoint для отправки отзыва
app.post("/feedback", (req, res) => {
  const newFeedback = req.body;
  feedbacks.push(newFeedback);
  res.status(201).json(newFeedback);
});

// Endpoint для отдачи статических файлов
app.use(express.static(__dirname));

// Маршрут для отправки файла portfolio.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "portfolio.html"));
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
