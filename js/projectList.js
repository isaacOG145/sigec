document.addEventListener("DOMContentLoaded", function () {

  function loadProjects(statusFilter = "") {
    const projectsList = document.getElementById("projects-list");
    projectsList.innerHTML = ""; // Limpiamos la lista antes de cargar

    fetch(`http://localhost:8080/projects/all`)
      .then((response) => response.json())
      .then((data) => {
        const projects = data.result;

        const filteredProjects = statusFilter
          ? projects.filter((project) => project.status === (statusFilter === "Activos"))
          : projects;

        filteredProjects.forEach((project) => {
          const tr = document.createElement("tr");

          tr.innerHTML = `
            <td class="editable">${project.name}</td>
            <td class="editable">${project.abbreviation}</td>
            <td class="editable">${project.description}</td>
            <td class="editable">${project.customer.name}</td>
            <td class="editable">${project.projectCategory.name}</td>
            <td>
              <button class="btn-sm ${project.status ? 'btn-success' : 'btn-danger'}" onclick="toggleStatus(${project.id_project})">
                ${project.status ? "Activo" : "Inactivo"}
              </button>
            </td>
            <td>
              <button class="btn-edit" onclick="editProject(${project.id_project}, this)">
                Editar
              </button>
            </td>
          `;

          projectsList.appendChild(tr);
        });
      });
  }

  window.toggleStatus = function (projectId) {
    const projectDto = { id: projectId };

    fetch("http://localhost:8080/projects/change-status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectDto),
    })
      .then(response => response.json())
      .then(data => {
        if (data.type === "SUCCESS") {
          loadProjects();
        } else {
          alert(data.text);
        }
      })
      .catch(error => {
        console.error("Error al cambiar el estado:", error);
        alert("Hubo un problema al cambiar el estado del proyecto.");
      });
  };

  loadProjects();

  document.getElementById("Categoria").addEventListener("change", function (event) {
    const statusFilter = event.target.value;
    loadProjects(statusFilter);
  });

  function loadCategoriesAndClients() {
    return Promise.all([
      fetch("http://localhost:8080/projectCat/active")
        .then(response => response.json())
        .then(data => {
          if (data.type === 'SUCCESS' && Array.isArray(data.result)) {
            return data.result;
          } else {
            return [];
          }
        })
        .catch(error => {
          console.error('Error al cargar categorías:', error);
          return [];
        }),
      fetch("http://localhost:8080/customers/active")
        .then(response => response.json())
        .then(data => {
          if (data.type === 'SUCCESS' && Array.isArray(data.result)) {
            return data.result;
          } else {
            return [];
          }
        })
        .catch(error => {
          console.error('Error al cargar clientes:', error);
          return [];
        })
    ]).then(([categories, customers]) => {
      return { categories, customers };
    });
  }

  window.editProject = function (projectId, button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');
    const nameCell = cells[0];
    const abbreviationCell = cells[1];
    const descriptionCell = cells[2];
    const customerCell = cells[3];
    const categoryCell = cells[4];

    // Verificar si ya estamos en edición
    if (nameCell.querySelector('input') || nameCell.querySelector('select')) {
      return; // Ya estamos editando esta fila
    }

    // Guardar los valores originales
    const originalData = {
      name: nameCell.textContent,
      abbreviation: abbreviationCell.textContent,
      description: descriptionCell.textContent,
      customer: customerCell.textContent,
      category: categoryCell.textContent,
    };

    // Convertir celdas a campos de entrada
    nameCell.innerHTML = `<input type="text" class="form-control" value="${originalData.name}" />`;
    abbreviationCell.innerHTML = `<input type="text" class="form-control" value="${originalData.abbreviation}" />`;
    descriptionCell.innerHTML = `<input type="text" class="form-control" value="${originalData.description}" />`;

    loadCategoriesAndClients().then(data => {
      // Crear select para categorías
      const categorySelect = document.createElement('select');
      categorySelect.classList.add('form-select');
      let categoryId = null;
      data.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
        if (category.name === originalData.category) {
          categoryId = category.id; // Asignamos el id de la categoría correspondiente
        }
      });
      categorySelect.value = categoryId;  // Establecer el valor correcto al `select`
      categoryCell.innerHTML = categorySelect.outerHTML;

      // Crear select para clientes
      const customerSelect = document.createElement('select');
      customerSelect.classList.add('form-select');
      let customerId = null;
      data.customers.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer.id;
        option.textContent = customer.name;
        customerSelect.appendChild(option);
        if (customer.name === originalData.customer) {
          customerId = customer.id; // Asignamos el id del cliente correspondiente
        }
      });
      customerSelect.value = customerId;  // Establecer el valor correcto al `select`
      customerCell.innerHTML = customerSelect.outerHTML;
    });

    // Cambiar el botón de Editar a Guardar
    button.textContent = "Guardar";

    // Añadir el botón Cancelar
    const cancelButton = document.createElement("button");
    cancelButton.classList.add('btn', 'btn-secondary', 'ms-2');
    cancelButton.textContent = "Cancelar";
    cancelButton.addEventListener('click', function () {
      // Revertir cambios en caso de cancelar
      nameCell.textContent = originalData.name;
      abbreviationCell.textContent = originalData.abbreviation;
      descriptionCell.textContent = originalData.description;
      customerCell.textContent = originalData.customer;
      categoryCell.textContent = originalData.category;

      button.textContent = "Editar"; // Volver a Editar
      cancelButton.remove(); // Eliminar el botón Cancelar
    });
    row.querySelector('.btn-edit').parentNode.appendChild(cancelButton);

    // Botón de guardar cambios
    button.addEventListener('click', function () {
      const updatedName = nameCell.querySelector('input').value;
      const updatedAbbreviation = abbreviationCell.querySelector('input').value;
      const updatedDescription = descriptionCell.querySelector('input').value;
      const updatedCustomer = customerCell.querySelector('select').value;
      const updatedCategory = categoryCell.querySelector('select').value;

      const updatedProject = {
        id: projectId, // Incluir el ID en el JSON
        name: updatedName,
        abbreviation: updatedAbbreviation,
        description: updatedDescription,
        customerId: parseInt(updatedCustomer), // Usar customerId según el backend
        projectCategoryId: parseInt(updatedCategory), // Usar projectCategoryId según el backend
        status: true // Suponiendo que el proyecto está activo
      };

      // Realizar el PUT para guardar los cambios en la nueva ruta
      fetch(`http://localhost:8080/projects/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProject),
      })
        .then(response => response.json())
        .then(data => {
          if (data.type === 'SUCCESS') { // Asegúrate de que la respuesta tenga esta propiedad
            // Actualizar la interfaz después de guardar
            nameCell.textContent = updatedName;
            abbreviationCell.textContent = updatedAbbreviation;
            descriptionCell.textContent = updatedDescription;
            customerCell.textContent = updatedCustomer; // Usar el nombre o ID, según sea necesario
            categoryCell.textContent = updatedCategory; // Usar el nombre o ID, según sea necesario

            // Recargar la página para aplicar los cambios
            window.location.reload(); // Esto recargará toda la página
          } else {
            alert('Error al guardar los cambios');
          }
        })
        .catch(error => {
          console.error("Error al guardar:", error);
          alert("Hubo un problema al guardar los cambios.");
        });
    });
  };


});
