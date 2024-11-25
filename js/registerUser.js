document.getElementById('userForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('U.nombre').value;
  const lastName = document.getElementById('U.apellidos').value;
  const email = document.getElementById('U.email').value;
  const phoneNumber = document.getElementById('U.telefono').value;
  const password = document.getElementById('U.password').value;
  const confirmPassword = document.getElementById('U.Cpassword').value;

  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }

  const userData = {
    name: name,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    password: password,
    role: {
      // Aquí asumes que el rol es parte de la estructura, lo cual deberías adaptar según tu lógica
      id: 1 // Cambiar a la ID del rol que quieras asignar
    }
  };

  // Configurar la solicitud fetch
  fetch('http://localhost:8080/user/save', {
    method: 'POST', // Usar el método POST
    headers: {
      'Content-Type': 'application/json', // El cuerpo de la solicitud estará en JSON
    },
    body: JSON.stringify(userData) // Convertir el objeto a JSON
  })
    .then(response => response.json()) // Obtener la respuesta en formato JSON
    .then(data => {
      if (data.type === 'SUCCESS') {
        alert('Usuario registrado exitosamente');
        // Aquí puedes redirigir al usuario a otra página si lo deseas
        // window.location.href = "/otraPagina";
      } else {
        alert('Error: ' + data.message); // Mostrar mensaje de error
      }
    })
    .catch(error => {
      console.error('Error al enviar el formulario:', error);
      alert('Hubo un error al intentar registrar el usuario.');
    });
});
