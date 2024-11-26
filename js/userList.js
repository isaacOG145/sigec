document.addEventListener("DOMContentLoaded", function () {

  function loadUsers(statusFilter = "") {
    const userList = document.getElementById("user-list");
    userList.innerHTML = "";

    // Hacer fetch de la API
    fetch(`http://localhost:8080/user/all`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const users = data.result;

        const filteredUsers = statusFilter
          ? users.filter((user) => user.status === (statusFilter === "Activos"))
          : users;

        filteredUsers.forEach((user) => {
          const tr = document.createElement("tr");

          tr.innerHTML = `
            <td class="editable">${user.name}</td>
            <td class="editable">${user.lastName}</td>
            <td class="editable">${user.email}</td>
            <td class="editable">${user.phoneNumber}</td>
            <td class="editable">${user.role.name === "ROLE_ADMIN" ? "Administrador" : "Usuario"}</td>
            <td>
              <button class="btn-sm ${user.status ? 'btn-success' : 'btn-danger'}" onclick="toggleStatus(${user.id})">
                ${user.status ? "Activo" : "Inactivo"}
              </button>
            </td>
            <td>
              <button class="btn-edit" onclick="editUser(${user.id}, this)">
                Editar
              </button>
            </td>
          `;

          userList.appendChild(tr);
        });
      })
      .catch((error) => {
        console.error("Error al cargar los usuarios:", error);
      });
  }

  window.toggleStatus = function (userId) {
    const userDto = { id: userId };

    fetch("http://localhost:8080/user/change-status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDto),
    })
      .then(response => response.json())
      .then(data => {
        if (data.type === "SUCCESS") {
          loadUsers();
        } else {
          alert(data.text);
        }
      })
      .catch(error => {
        console.error("Error al cambiar el estado:", error);
        alert("Hubo un problema al cambiar el estado del usuario.");
      });
  };

  window.editUser = function (userId, button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');
    const nameCell = cells[0];
    const lastNameCell = cells[1];
    const emailCell = cells[2];
    const phoneCell = cells[3];
    const roleCell = cells[4];

    if (nameCell.querySelector('input')) {
      return;
    }

    const originalData = {
      name: nameCell.textContent,
      lastName: lastNameCell.textContent,
      email: emailCell.textContent,
      phone: phoneCell.textContent,
      roleId: roleCell.textContent.trim() === "Administrador" ? 1 : 2,
    };

    nameCell.innerHTML = `<input type="text" class="form-control" value="${originalData.name}" />`;
    lastNameCell.innerHTML = `<input type="text" class="form-control" value="${originalData.lastName}" />`;
    emailCell.innerHTML = `<input type="text" class="form-control" value="${originalData.email}" />`;
    phoneCell.innerHTML = `<input type="text" class="form-control" value="${originalData.phone}" />`;
    roleCell.innerHTML = `
      <select class="form-select">
        <option value="1" ${originalData.roleId === 1 ? "selected" : ""}>Administrador</option>
        <option value="2" ${originalData.roleId === 2 ? "selected" : ""}>Usuario</option>
      </select>
    `;

    button.textContent = "Guardar";

    const cancelButton = document.createElement("button");
    cancelButton.classList.add('btn', 'btn-secondary', 'ms-2');
    cancelButton.textContent = "Cancelar";
    cancelButton.addEventListener('click', function () {
      nameCell.textContent = originalData.name;
      lastNameCell.textContent = originalData.lastName;
      emailCell.textContent = originalData.email;
      phoneCell.textContent = originalData.phone;
      roleCell.textContent = originalData.roleId === 1 ? "Administrador" : "Usuario";

      button.textContent = "Editar";
      cancelButton.remove();
    });

    row.querySelector('td:last-child').appendChild(cancelButton);

    button.addEventListener('click', function () {
      const updatedUser = {
        id: userId,
        name: nameCell.querySelector('input').value,
        lastName: lastNameCell.querySelector('input').value,
        email: emailCell.querySelector('input').value,
        phoneNumber: phoneCell.querySelector('input').value,
        role: { id: parseInt(roleCell.querySelector('select').value) },
      };

      fetch(`http://localhost:8080/user/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      })
        .then(response => response.json())
        .then(data => {
          if (data.type === 'SUCCESS') {
            loadUsers();
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

  loadUsers();

  document.getElementById("Categoria").addEventListener("change", function (event) {
    const statusFilter = event.target.value;
    loadUsers(statusFilter);
  });

});
