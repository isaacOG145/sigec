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
            <td class="editable">${category.name}</td>
            <td class="editable">${category.description}</td>
            <td>
              <button class="btn-sm ${category.status ? 'btn-success' : 'btn-danger'}" onclick="toggleStatus(${category.id})">
                ${category.status ? "Activo" : "Inactivo"}
              </button>
            </td>
            <td>
              <button class="btn-edit" onclick="editCategory(${category.id}, this)">
                Editar
              </button>
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

  window.toggleStatus = function (categoryId) {
    const projectCatDto = { id: categoryId };

    fetch("http://localhost:8080/projectCat/change-status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectCatDto),
    })
      .then(response => response.json())
      .then(data => {
        if (data.type === "SUCCESS") {
          loadCategories();
          showMessage('success', "Estado actualizado correctamente.");
        } else {
          showMessage('warning', data.text);
        }
      })
      .catch(error => {
        console.error("Error al cambiar el estado:", error);
        showMessage('danger', "Hubo un problema al cambiar el estado del proyecto.");
      });
  };

  loadCategories();

  document.getElementById("Categoria").addEventListener("change", function (event) {
    const statusFilter = event.target.value;
    loadCategories(statusFilter);
  });

  window.editCategory = function (categoryId, button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');
    const nameCell = cells[0];
    const descriptionCell = cells[1];

    if (nameCell.querySelector('input') || nameCell.querySelector('select')) {
      return;
    }

    // Guardar los valores originales
    const originalData = {
      name: nameCell.textContent,
      description: descriptionCell.textContent,
    };

    // Convertir celdas a campos de entrada
    nameCell.innerHTML = `<input type="text" class="form-control" value="${originalData.name}" />`;
    descriptionCell.innerHTML = `<input type="text" class="form-control" value="${originalData.description}" />`;

    button.textContent = "Guardar";

    const cancelButton = document.createElement("button");
    cancelButton.classList.add('btn', 'btn-secondary', 'ms-2');
    cancelButton.textContent = "Cancelar";
    cancelButton.addEventListener('click', function () {

      nameCell.textContent = originalData.name;
      descriptionCell.textContent = originalData.description;

      button.textContent = "Editar";
      cancelButton.remove();
    });
    row.querySelector('.btn-edit').parentNode.appendChild(cancelButton);

    button.addEventListener('click', function () {
      const updatedName = nameCell.querySelector('input').value;
      const updatedDescription = descriptionCell.querySelector('input').value;

      const updatedCategory = {
        id: categoryId,
        name: updatedName,
        description: updatedDescription,
        status: true
      };

      // Realizar el PUT para guardar los cambios en la nueva ruta
      fetch(`http://localhost:8080/projectCat/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCategory),
      })
        .then(response => response.json())
        .then(data => {
          if (data.type === 'SUCCESS') {
            nameCell.textContent = updatedName;
            descriptionCell.textContent = updatedDescription;

            // Mostrar mensaje de éxito
            showMessage('success', "Categoría actualizada correctamente.");
            window.location.reload();
          } else {
            showMessage('warning', 'Error al guardar los cambios');
          }
        })
        .catch(error => {
          console.error("Error al guardar:", error);
          showMessage('danger', "Hubo un problema al guardar los cambios.");
        });
    });
  };

});
