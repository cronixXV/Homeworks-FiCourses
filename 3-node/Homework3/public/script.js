fetch("http://localhost:3000/technologies")
  .then((response) => response.json())
  .then((technologies) => {
    const techList = document.querySelector("#tech-list");
    technologies.forEach((tech) => {
      const techItem = document.createElement("li");
      techItem.textContent = tech.name;
      techList.appendChild(techItem);
    });
  })
  .catch((error) => {
    console.error("Error fetching technologies:", error);
  });
