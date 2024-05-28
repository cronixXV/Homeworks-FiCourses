fetch("/technologies")
  .then((response) => response.json())
  .then((technologies) => {
    const techList = document.querySelector("#tech-list");
    technologies.forEach((tech) => {
      const techItem = document.createElement("div");
      techItem.classList.add("tech-item");
      const techImage = document.createElement("img");
      techImage.src = tech.image;
      techImage.alt = tech.name;
      techItem.appendChild(techImage);
      const techName = document.createElement("p");
      techName.textContent = tech.name;
      techItem.appendChild(techName);
      techList.appendChild(techItem);
    });
  })
  .catch((error) => {
    console.error("Error fetching technologies:", error);
  });
