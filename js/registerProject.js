document.addEventListener("DOMContentLoaded", () => {
  // Función para cargar las categorías
  fetch('http://localhost:8080/projectCat/active')
    .then(response => response.json())  // Convertimos la respuesta en JSON
    .then(data => {
      console.log('Categorías:', data);  // Verifica la respuesta del servidor
      const categoriaSelect = document.getElementById('P.categoria');

      // Asegúrate de que la respuesta contiene 'result' y que no está vacía
      if (data.type === 'SUCCESS' && Array.isArray(data.result) && data.result.length > 0) {
        // Recorrer cada categoría en 'result' y crear una opción en el select
        data.result.forEach(category => {
          const option = document.createElement('option');
          option.value = category.id;  // Aquí usamos el 'id' de la categoría
          option.textContent = category.name;  // Usamos el 'name' de la categoría
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

  // Función para cargar los clientes (suponiendo que se tenga el mismo formato para los clientes)
  fetch('http://localhost:8080/customers/active')
    .then(response => response.json())  // Convertimos la respuesta en JSON
    .then(data => {
      console.log('Clientes:', data);  // Verifica la respuesta del servidor
      const clienteSelect = document.getElementById('P.cliente');

      // Asegúrate de que la respuesta contiene 'result' y que no está vacía
      if (data.type === 'SUCCESS' && Array.isArray(data.result) && data.result.length > 0) {
        // Recorrer cada cliente en 'result' y crear una opción en el select
        data.result.forEach(customer => {
          const option = document.createElement('option');
          option.value = customer.id;  // Aquí usamos el 'id' del cliente
          option.textContent = customer.name;  // Usamos el 'name' del cliente
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

  // Manejo del formulario de registro
  const form = document.getElementById('project-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevenir el comportamiento por defecto (recargar la página)

    // Crear el objeto de datos del formulario
    const formData = new FormData(form);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // Verificar los datos que se están enviando antes de enviarlos
    console.log('Datos del formulario:', formObject);

    // Enviar los datos al backend con fetch
    fetch('http://localhost:8080/projects/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formObject),  // Aquí enviamos los datos del formulario como JSON
    })
      .then(response => response.json())
      .then(data => {
        if (data.type === 'SUCCESS') {
          alert('Proyecto guardado exitosamente');
          form.reset(); // Resetea el formulario si es necesario
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
