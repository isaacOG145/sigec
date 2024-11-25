document.addEventListener('DOMContentLoaded', () => {
  // Verificar si hay un token en localStorage
  const token = localStorage.getItem('jwt');

  // Si no hay token, redirigir al login
  if (!token) {
    window.location.href = '/login.html'; // Si no hay token, redirigir a login
  } else {
    // Si hay token, proceder con la carga de la página
    getProjectsList(token);  // Función para cargar los proyectos
  }
});

// Función para obtener la lista de proyectos
async function getProjectsList(token) {
  try {
    const response = await fetch('http://localhost:8080/projects', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token // Incluir el token en las cabeceras
      }
    });

    if (response.ok) {
      const projects = await response.json(); // Obtener la lista de proyectos

      // Aquí puedes llenar la tabla con los proyectos
      const tableBody = document.querySelector('table tbody');
      projects.forEach(project => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${project.name}</td>
          <td>${project.abbreviation}</td>
          <td>${project.description}</td>
          <td>${project.category}</td>
          <td>${project.client}</td>
          <td><input type="checkbox" ${project.status === 'Active' ? 'checked' : ''}></td>
          <td><button class="btn-edit">Editar</button></td>
        `;
        tableBody.appendChild(row);
      });
    } else {
      const errorData = await response.json();
      alert('Error: ' + errorData.message);
    }
  } catch (error) {
    console.error('Error al cargar los proyectos:', error);
    alert('Hubo un error al cargar los proyectos');
  }
}
