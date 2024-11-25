// Seleccionamos el formulario y elementos de entrada
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Función para manejar el login
async function handleLogin(event) {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  // Hacer la solicitud POST al backend para autenticar al usuario
  try {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    // Verificamos si la respuesta es exitosa (status 200)
    if (response.ok) {
      const data = await response.json(); // Obtenemos la respuesta JSON (que contiene el JWT)
      const token = data.jwt; // JWT que viene del servidor

      // Guardamos el token JWT en el localStorage
      localStorage.setItem('jwt', token);

      // Redirigimos a una página protegida (por ejemplo, el dashboard)
      window.location.href = '../views/projectList.html'; // Cambia la URL a donde quieres redirigir
    } else {
      // Si la respuesta no es exitosa, mostramos un mensaje de error
      const errorData = await response.json();
      alert('Error: ' + errorData.message);
    }
  } catch (error) {
    // Manejo de errores de red
    console.error('Error al hacer login:', error);
    alert('Hubo un error al intentar iniciar sesión');
  }
}

// Agregar el evento submit al formulario
loginForm.addEventListener('submit', handleLogin);
