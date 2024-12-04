

// Obtén el token desde el almacenamiento local o sesión
const token = localStorage.getItem('token') || sessionStorage.getItem('token');

if (token) {
  // Decodificar el token (suponiendo que es JWT y está en formato base64)
  const payload = JSON.parse(atob(token.split('.')[1]));
  const userRole = payload.role; // Suponiendo que el campo 'role' existe en el token

  // Mostrar u ocultar los enlaces según el rol
  if (userRole === 'admin') {
    document.getElementById('user-link').style.display = 'block';
    document.getElementById('category-link').style.display = 'block';
    document.getElementById('customer-link').style.display = 'block';
  } else if (userRole === 'manager') {
    document.getElementById('user-link').style.display = 'none';
    document.getElementById('category-link').style.display = 'none';
    document.getElementById('customer-link').style.display = 'block';
  } else {
    document.getElementById('user-link').style.display = 'none';
    document.getElementById('category-link').style.display = 'none';
    document.getElementById('customer-link').style.display = 'none';
  }
}
