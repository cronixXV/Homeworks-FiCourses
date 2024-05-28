const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

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

http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    // Обработка статических файлов
    if (req.method === "GET" && parsedUrl.pathname.startsWith("/static")) {
      const filePath = path.join(__dirname, parsedUrl.pathname);
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end("Not found");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        }
      });
      return;
    }

    // Обработка JavaScript-файлов
    else if (req.method === "GET" && parsedUrl.pathname.endsWith(".js")) {
      const filePath = path.join(__dirname, parsedUrl.pathname);
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end("Not found");
        } else {
          res.writeHead(200, { "Content-Type": "application/javascript" });
          res.end(data);
        }
      });
      return;
    }

    if (req.method === "GET" && parsedUrl.pathname === "/technologies") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(technologies));
    } else if (
      req.method === "POST" &&
      parsedUrl.pathname === "/technologies"
    ) {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const newTechnology = JSON.parse(body);
        technologies.push(newTechnology);
        res.writeHead(201);
        res.end();
      });
    } else if (
      req.method === "PUT" &&
      parsedUrl.pathname.startsWith("/technologies/")
    ) {
      const id = parseInt(parsedUrl.pathname.split("/")[2]);
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const updatedTechnology = JSON.parse(body);
        technologies[id] = updatedTechnology;
        res.writeHead(200);
        res.end();
      });
    } else if (
      req.method === "DELETE" &&
      parsedUrl.pathname.startsWith("/technologies/")
    ) {
      const id = parseInt(parsedUrl.pathname.split("/")[2]);
      technologies.splice(id, 1);
      res.writeHead(200);
      res.end();
    } else if (req.method === "GET" && parsedUrl.pathname === "/projects") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(projects));
    } else if (req.method === "POST" && parsedUrl.pathname === "/feedback") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const newFeedback = JSON.parse(body);
        feedbacks.push(newFeedback);
        res.writeHead(201);
        res.end();
      });
    } else {
      fs.readFile("portfolio.html", (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end("Not found");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        }
      });
    }
  })
  .listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
  });
