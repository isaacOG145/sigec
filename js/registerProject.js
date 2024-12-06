document.addEventListener("DOMContentLoaded", () => {

  fetch('http://localhost:8080/projectCat/active')
    .then(response => response.json())
    .then(data => {
      const categoriaSelect = document.getElementById('category');

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

  // Cargar los clientes activos
  fetch('http://localhost:8080/customers/active')
    .then(response => response.json())
    .then(data => {
      const clienteSelect = document.getElementById('customer');

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

  // Función para mostrar mensajes
  function showMessage(type, message) {
    const messageElement = document.getElementById("message");
    const messageText = document.getElementById("message-text");

    messageElement.className = `alert alert-${type}`;
    messageText.textContent = message;

    messageElement.style.display = 'block';

    setTimeout(() => {
      messageElement.style.display = 'none';
    }, 5000);
  }

  // Formulario de registro de proyecto
  const form = document.getElementById('project-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // Validar si todos los campos están llenos
    const requiredFields = ['name', 'abbreviation', 'description', 'projectCategoryId', 'customerId'];
    let isValid = true;
    let missingFields = [];

    requiredFields.forEach(field => {
      if (!formObject[field]) {
        isValid = false;0
        missingFields.push(field);
      }
    });

    if (!isValid) {
      showMessage('warning', `Por favor, llena todos los campos. Faltan: ${missingFields.join(', ')}`);
      return; // Detener la ejecución si hay campos vacíos
    }

    // Enviar datos del formulario a la API
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
          showMessage('success', 'Proyecto guardado exitosamente');

          form.reset();
        } else {
          showMessage('danger', data.text || 'Error al guardar el proyecto');
        }
      })
      .catch(error => {
        console.error('Error al enviar los datos:', error);
        showMessage('danger', 'Hubo un problema al guardar el proyecto. Intenta nuevamente.');
      });
  });
});
