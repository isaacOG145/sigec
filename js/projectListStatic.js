document.addEventListener("DOMContentLoaded", function () {

  function loadProjects(statusFilter = "") {
    const projectsList = document.getElementById("projects-list");
    projectsList.innerHTML = "";

    fetch(`http://localhost:8080/projects/all`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const projects = data.result;

        const filteredProjects = statusFilter
          ? projects.filter((project) => project.status === (statusFilter === "Activos"))
          : projects;

        filteredProjects.forEach((project) => {
          const tr = document.createElement("tr");

          tr.innerHTML = `
            <td>${project.name}</td>
            <td>${project.abbreviation}</td>
            <td>${project.description}</td>
            <td>${project.customer.name}</td>
            <td>${project.projectCategory.name}</td>
            <td>
              <span class="${project.status ? 'text-success' : 'text-danger'}">
                ${project.status ? "Activo" : "Inactivo"}
              </span>
            </td>
          `;

          projectsList.appendChild(tr);
        });
      })
      .catch((error) => {
        console.error("Error al cargar los proyectos:", error);
      });
  }

  loadProjects();

  document.getElementById("Categoria").addEventListener("change", function (event) {
    const statusFilter = event.target.value;
    loadProjects(statusFilter);
  });

});
