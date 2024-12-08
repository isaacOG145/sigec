const token = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');

if (!token) {
  window.location.href = '../index.html';
}

document.addEventListener("DOMContentLoaded", function () {

  function loadCustomers(statusFilter = "") {
    const customerList = document.getElementById("customer-list");
    customerList.innerHTML = "";

    // Hacer fetch de la API
    fetch(`http://localhost:8080/customers/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const customers = data.result;

        const filteredCustomers = statusFilter
          ? customers.filter((customer) => customer.status === (statusFilter === "Activos"))
          : customers;

        filteredCustomers.forEach((customer) => {
          const tr = document.createElement("tr");

          tr.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phoneNumber}</td>
            <td>
              <span class="${customer.status ? 'text-success' : 'text-danger'}">
                ${customer.status ? "Activo" : "Inactivo"}
              </span>
            </td>
          `;

          customerList.appendChild(tr);
        });
      })
      .catch((error) => {
        console.error("Error al cargar los clientes:", error);
      });
  }

  loadCustomers();

  document.getElementById("Categoria").addEventListener("change", function (event) {
    const statusFilter = event.target.value;
    loadCustomers(statusFilter);
  });

});
