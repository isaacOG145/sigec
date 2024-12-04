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
            <td>${user.name}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.phoneNumber}</td>
            <td>${user.role.name === "ROLE_ADMIN" ? "Administrador" : "Usuario"}</td>
            <td>
              <span class="${user.status ? 'text-success' : 'text-danger'}">
                ${user.status ? "Activo" : "Inactivo"}
              </span>
            </td>
          `;

          userList.appendChild(tr);
        });
      })
      .catch((error) => {
        console.error("Error al cargar los usuarios:", error);
      });
  }

  loadUsers();

  document.getElementById("Categoria").addEventListener("change", function (event) {
    const statusFilter = event.target.value;
    loadUsers(statusFilter);
  });

});
