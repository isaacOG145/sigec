document.addEventListener("DOMContentLoaded", function () {

  function loadCustomers(statusFilter = "") {
    const customerList = document.getElementById("customer-list");
    customerList.innerHTML = "";

    // Hacer fetch de la API
    fetch(`http://localhost:8080/customers/all`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

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
      });
  }

  window.toggleStatus = function (customerId) {
    const customerDto = { id: customerId };

    fetch("http://localhost:8080/customers/change-status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerDto),
    })
      .then(response => response.json())
      .then(data => {
        if (data.type === "SUCCESS") {
          loadCustomers();
        } else {
          alert(data.text);
        }
      })
      .catch(error => {
        console.error("Error al cambiar el estado:", error);
        alert("Hubo un problema al cambiar el estado del cliente.");
      });
  };

  loadCustomers();

  document.getElementById("Categoria").addEventListener("change", function (event) {
    const statusFilter = event.target.value;
    loadCustomers(statusFilter);
  });

  window.editCustomer = function (customerId, button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');
    const nameCell = cells[0];
    const emailCell = cells[1];
    const phoneCell = cells[2]; // Aquí también cambiamos a phoneNumber

    if (nameCell.querySelector('input') || nameCell.querySelector('select')) {
      return;
    }

    const originalData = {
      name: nameCell.textContent,
      email: emailCell.textContent,
      phone: phoneCell.textContent // Cambié aquí a phoneNumber
    };

    nameCell.innerHTML = `<input type="text" class="form-control" value="${originalData.name}" />`;
    emailCell.innerHTML = `<input type="text" class="form-control" value="${originalData.email}" />`;
    phoneCell.innerHTML = `<input type="text" class="form-control" value="${originalData.phone}" />`; // Cambié aquí a phoneNumber

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
    row.querySelector('.btn-edit').parentNode.appendChild(cancelButton);

    button.addEventListener('click', function () {
      const updatedName = nameCell.querySelector('input').value;
      const updatedEmail = emailCell.querySelector('input').value;
      const updatedPhone = phoneCell.querySelector('input').value;


      const updatedCustomer = {
        id: customerId,
        name: updatedName,
        email: updatedEmail,
        phoneNumber: updatedPhone // Cambié aquí a phoneNumber
      };

      // Realizar el PUT para guardar los cambios en la nueva ruta
      fetch(`http://localhost:8080/customers/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCustomer),
      })
        .then(response => response.json())
        .then(data => {
          if (data.type === 'SUCCESS') {

            nameCell.textContent = updatedName;
            emailCell.textContent = updatedEmail;
            phoneCell.textContent = updatedPhone;

            window.location.reload();
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
