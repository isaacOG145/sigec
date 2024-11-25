function submitForm() {
  const form = document.getElementById("customer-form");
  const formData = new FormData(form);

  const customerData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  };


  fetch("http://localhost:8080/customers/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(customerData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.type === 'SUCCESS') {
        alert('Cliente registrado exitosamente');

        window.location.href = '/clientes';
      } else {
        alert('Error al registrar el cliente: ' + data.message);
      }
    })
    .catch(error => {
      alert('Hubo un error al enviar el formulario');
      console.error(error);
    });
}
