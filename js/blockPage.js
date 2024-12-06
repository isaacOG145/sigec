
const userRole = localStorage.getItem('role');


const requiredRole = 'ROLE_ADMIN';

if (userRole !== requiredRole) {

  window.location.href = '../views/projectListStatic.html';
} else {

  console.log('Acceso permitido');
}
