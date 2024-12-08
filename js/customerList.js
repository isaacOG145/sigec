const token = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');

if (!token) {
  window.location.href = '../index.html';
}

function showMessage(type, message) {
  const messageElement = document.getElementById("message");
  const messageText = document.getElementById("message-text");

  messageElement.className = `alert alert-${type}`;
  messageText.textContent = message;

  messageElement.style.display = 'block';

  setTimeout(() => {
    messageElement.style.display = 'none';
  }, 5000);
}

document.addEventListener("DOMContentLoaded", function () {

  // Función para cargar los clientes
  function loadCustomers(statusFilter = "") {
    const customerList = document.getElementById("customer-list");
    customerList.innerHTML = "";

    fetch("http://localhost:8080/customers/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const customers = data.result;

        const filteredCategories = statusFilter
          ? customers.filter((customer) => customer.status === (statusFilter === "Activos"))
          : customers;


        filteredCategories.forEach((customer) => {
          const tr = document.createElement("tr");

          tr.innerHTML = `
            <td class="editable">${customer.name}</td>
            <td class="editable">${customer.email}</td>
            <td class="editable">${customer.phoneNumber}</td> <!-- Cambié aquí a phoneNumber -->
            <td>
              <button class="btn-sm ${customer.status ? 'btn-success' : 'btn-danger'}" onclick="toggleStatus(${customer.id})">
                ${customer.status ? "Activo" : "Inactivo"}
              </button>
            </td>
            <td>
              <button class="btn-edit" onclick="editCustomer(${customer.id}, this)">
                Editar
              </button>
            </td>
          `;

          customerList.appendChild(tr);
        });
      })
      .catch((error) => {
        console.error("Error al cargar los clientes:", error);
        showMessage("danger", "No se encontraron datos de clientes.");
      });
  }

  // Función para cambiar el estado del cliente
  window.toggleStatus = function (customerId) {
    const customerDto = { id: customerId };

    fetch("http://localhost:8080/customers/change-status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(customerDto),
    })
      .then(response => response.json())
      .then(data => {
        if (data.type === "SUCCESS") {
          loadCustomers(); // Recargar los clientes después de cambiar el estado
          showMessage("success", "Estado del cliente actualizado correctamente.");
        } else {
          showMessage("danger", data.text);
        }
      })
      .catch(error => {
        console.error("Error al cambiar el estado:", error);
        showMessage("danger", "Hubo un problema al cambiar el estado del cliente.");
      });
  };


  document.getElementById("Categoria").addEventListener("change", function (event) {
    const statusFilter = event.target.value;
    loadCustomers(statusFilter);
  });

  window.editCustomer = function (customerId, button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');
    const nameCell = cells[0];
    const emailCell = cells[1];
    const phoneCell = cells[2];

    // Si ya estamos en modo de edición, no hacer nada
    if (nameCell.querySelector('input')) {
      return;
    }

    const originalData = {
      name: nameCell.textContent,
      email: emailCell.textContent,
      phone: phoneCell.textContent
    };

    nameCell.innerHTML = `<input type="text" class="form-control" value="${originalData.name}" />`;
    emailCell.innerHTML = `<input type="text" class="form-control" value="${originalData.email}" />`;
    phoneCell.innerHTML = `<input type="text" class="form-control" value="${originalData.phone}" />`;

    button.textContent = "Guardar";

    const cancelButton = document.createElement("button");
    cancelButton.classList.add('btn', 'btn-secondary', 'ms-2');
    cancelButton.textContent = "Cancelar";
    cancelButton.addEventListener('click', function () {
      nameCell.textContent = originalData.name;
      emailCell.textContent = originalData.email;
      phoneCell.textContent = originalData.phone;

      button.textContent = "Editar";
      cancelButton.remove();
    });
    row.querySelector('td:last-child').appendChild(cancelButton);

    button.addEventListener('click', function () {
      const updatedName = nameCell.querySelector('input').value;
      const updatedEmail = emailCell.querySelector('input').value;
      const updatedPhone = phoneCell.querySelector('input').value;

      const updatedCustomer = {
        id: customerId,
        name: updatedName,
        email: updatedEmail,
        phone: updatedPhone
      };

      fetch(`http://localhost:8080/customers/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedCustomer),
      })
        .then(response => response.json())
        .then(data => {
          if (data.type === 'SUCCESS') {
            loadCustomers();
            showMessage("success", "Usuario editado correctamente.");
          } else {
            showMessage("danger", data.text);
          }
        })
        .catch(error => {
          console.error("Error al guardar:", error);
          showMessage("danger", "Hubo un problema al guardar los cambios.");
        });
    });
  };

  loadCustomers();

});
