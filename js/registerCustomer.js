const token = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
const form = document.getElementById('customer-form');

if (!token) {
  window.location.href = '../index.html';
}

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


form.addEventListener('submit', async (event) =>{
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  if (!name || !email || !phone ) {
    showMessage('warning', 'Debes llenar todos los campos obligatorios.');
    return;
  }

  const data = {
    name: name,
    email: email,
    phone: phone
  };

  try {
    const response = await fetch('http://localhost:8080/customers/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok && result.type === 'SUCCESS') {

      showMessage(result.type.toLowerCase(), result.text);
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('phone').value = '';

    } else {
      showMessage('danger', result.text || 'Hubo un problema al registrar el cliente');
    }
  } catch (error) {
    showMessage('danger', 'Error al enviar los datos. Intenta nuevamente más tarde.');
  }

});

