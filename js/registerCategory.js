const form = document.getElementById('categoryForm');

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

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const nombre = document.getElementById('PC.nombre').value;
  const descripcion = document.getElementById('PC.descripcion').value;

  if (!nombre || !descripcion) {
    showMessage('warning', 'Los campos nombre y descripción no pueden estar vacíos.');
    return;
  }

  const data = {
    name: nombre,
    description: descripcion
  };

  try {
    const response = await fetch('http://localhost:8080/projectCat/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {

      showMessage(result.type.toLowerCase(), result.text);

      setTimeout(() => {
        window.location.href = '../views/categoryList.html';
      }, 2000);
    } else {
      showMessage('danger', result.text || 'Hubo un problema al registrar la categoría');
    }
  } catch (error) {
    showMessage('danger', 'Error al enviar los datos. Intenta nuevamente más tarde.');
  }
});
