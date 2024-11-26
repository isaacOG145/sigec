document.addEventListener("DOMContentLoaded", () => {

  fetch('http://localhost:8080/projectCat/active')
    .then(response => response.json())
    .then(data => {
      console.log('Categorías:', data);
      const categoriaSelect = document.getElementById('P.categoria');


      if (data.type === 'SUCCESS' && Array.isArray(data.result) && data.result.length > 0) {

        data.result.forEach(category => {
          const option = document.createElement('option');
          option.value = category.id;
          option.textContent = category.name;
          categoriaSelect.appendChild(option);
        });
      } else {
        const option = document.createElement('option');
        option.textContent = 'No se encontraron categorías';
        categoriaSelect.appendChild(option);
      }
    })
    .catch(error => {
      console.error('Error al cargar categorías:', error);
    });

  fetch('http://localhost:8080/customers/active')
    .then(response => response.json())
    .then(data => {
      console.log('Clientes:', data);
      const clienteSelect = document.getElementById('P.cliente');

      if (data.type === 'SUCCESS' && Array.isArray(data.result) && data.result.length > 0) {

        data.result.forEach(customer => {
          const option = document.createElement('option');
          option.value = customer.id;
          option.textContent = customer.name;
          clienteSelect.appendChild(option);
        });
      } else {
        const option = document.createElement('option');
        option.textContent = 'No se encontraron clientes';
        clienteSelect.appendChild(option);
      }
    })
    .catch(error => {
      console.error('Error al cargar clientes:', error);
    });

  const form = document.getElementById('project-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    console.log('Datos del formulario:', formObject);

    fetch('http://localhost:8080/projects/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formObject),
    })
      .then(response => response.json())
      .then(data => {
        if (data.type === 'SUCCESS') {
          alert('Proyecto guardado exitosamente');

          window.location.href = '../views/projectList.html';

        } else {
          alert('Error al guardar el proyecto: ' + data.message);
        }
      })
      .catch(error => {
        console.error('Error al enviar los datos:', error);
        alert('Hubo un problema al guardar el proyecto. Intenta nuevamente.');
      });

  });
});
