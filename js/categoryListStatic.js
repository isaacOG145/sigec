document.addEventListener("DOMContentLoaded", function () {

  function loadCategories(statusFilter = "") {
    const categoryList = document.getElementById("category-list");
    categoryList.innerHTML = "";

    // Hacer fetch de la API
    fetch(`http://localhost:8080/projectCat/all`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const categories = data.result;

        const filteredCategories = statusFilter
          ? categories.filter((category) => category.status === (statusFilter === "Activos"))
          : categories;

        filteredCategories.forEach((category) => {
          const tr = document.createElement("tr");

          tr.innerHTML = `
            <td>${category.name}</td>
            <td>${category.description}</td>
            <td>
              <span class="${category.status ? 'text-success' : 'text-danger'}">
                ${category.status ? "Activo" : "Inactivo"}
              </span>
            </td>
          `;

          categoryList.appendChild(tr);
        });
      })
      .catch((error) => {
        console.error("Error al cargar las categorías:", error);
        showMessage('danger', "Hubo un problema al cargar las categorías.");
      });
  }

  loadCategories();

  document.getElementById("Categoria").addEventListener("change", function (event) {
    const statusFilter = event.target.value;
    loadCategories(statusFilter);
  });

});

