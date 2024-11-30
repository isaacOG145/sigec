// Obtener el JWT del localStorage
const jwt = localStorage.getItem('jwt');

// Verificar que el JWT esté presente
if (!jwt) {
  console.log("No hay JWT en el localStorage.");
  window.location.href = "login.html"; // Redirigir si no está autenticado
} else {
  // Obtener el ID del usuario (si es que lo necesitas)
  const userId = localStorage.getItem('userId'); // O bien, usa el JWT para obtener el ID
  if (!userId) {
    console.log("No hay ID de usuario en el localStorage.");
    window.location.href = "login.html"; // Redirigir si no hay userId
  }

  // Realizar la solicitud GET para obtener los datos del usuario
  fetch(`http://localhost:8080/user/${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${jwt}`, // Incluir el JWT para la autenticación
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al obtener los datos del usuario");
      }
      return response.json();
    })
    .then(data => {
      // Verificar que la respuesta contiene los datos en la propiedad 'result'
      if (data.type === 'SUCCESS' && data.result) {
        // Llenar los campos con los datos del usuario
        document.getElementById('nombre').textContent = data.result.name;
        document.getElementById('apellido').textContent = data.result.lastName;
        document.getElementById('email').textContent = data.result.email;
        document.getElementById('telefono').textContent = data.result.phoneNumber;
        document.getElementById('rol').textContent = data.result.role.name === "ROLE_ADMIN" ? "Administrador" : "Usuario";
      } else {
        console.error("Error en los datos de la respuesta:", data.text);
        window.location.href = "login.html"; // Redirigir si hay un error con los datos
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Manejar el error (mostrar mensaje o redirigir a login)
      window.location.href = 'login.html'; // Redirigir a login si ocurre un error
    });
}

// Agregar event listeners para los botones de modificar perfil y cambiar contraseña
document.getElementById('modify-profile').addEventListener('click', () => {
  // Redirigir a la página de modificar perfil (deberías tener esa página)
  window.location.href = "modifyProfile.html"; // Ajusta el nombre de la página de modificación
});

document.getElementById('change-password').addEventListener('click', () => {
  // Redirigir a la página de cambiar contraseña (deberías tener esa página)
  window.location.href = "changePassword.html"; // Ajusta el nombre de la página de cambiar contraseña
});

document.getElementById('logout').addEventListener('click', () => {
  // Eliminar el JWT y el userId del localStorage para cerrar sesión
  localStorage.removeItem('jwt');
  localStorage.removeItem('userId');
  window.location.href = 'login.html'; // Redirigir al login
});
