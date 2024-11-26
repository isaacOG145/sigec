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

  fetch('http://localhost:8080/user/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.type === 'SUCCESS') {
        alert('Usuario registrado exitosamente');

        window.location.href = "../views/userRegister.html";
      } else {
        alert('Error: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error al enviar el formulario:', error);
      alert('Hubo un error al intentar registrar el usuario.');
    });
});
