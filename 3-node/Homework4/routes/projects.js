const express = require("express");
const router = express.Router();
const Technology = require("../models/technology");
const Project = require("../models/project");

//Маршрут GET для получения всех технологий
router.get("/technologies", async (req, res) => {
  try {
    const technologies = await Technology.find();
    res.json(technologies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Маршрут POST для добавления новой технологии
router.post("/technologies", async (req, res) => {
  const technology = new Technology({
    name: req.body.name,
    description: req.body.description,
  });

  try {
    const newTechnology = await technology.save();
    res.status(201).json(newTechnology);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Маршрут GET для получения всех проектов
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Маршрут POST для добавления нового проекта
router.post("/projects", async (req, res) => {
  const project = new Project({
    name: req.body.name,
    description: req.body.description,
    technologies: req.body.technologies,
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Маршрут DELETE для удаления проекта по его ID
router.delete("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
