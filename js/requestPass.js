
function showMessage(type, message, email) {
  const messageElement = document.getElementById("message");
  const messageText = document.getElementById("message-text");
  const buttonDiv = document.getElementById("button-div");

  messageElement.className = `alert alert-${type}`;
  messageText.textContent = message;
  messageElement.style.display = 'block';

  if (type === 'success') {

    buttonDiv.innerHTML = '';

    const redirectButton = document.createElement("button");
    redirectButton.textContent = "Ir a la verificación";
    redirectButton.className = "btn btn-success";
    redirectButton.onclick = function() {
      window.location.href = `insertCode.html?email=${encodeURIComponent(email)}`;
    };

    buttonDiv.appendChild(redirectButton);
  }

  setTimeout(() => {
    messageElement.style.display = 'none';
  }, 2000);
}


document.getElementById('request-pass').addEventListener('submit', async function(event) {
  event.preventDefault();

  const emailInput = document.getElementById('email');
  const email = emailInput.value;
  const messageDiv = document.getElementById('message');
  const messageText = document.getElementById('message-text');

  if (!email || !email.includes('@') || !email.includes('.')) {
    showMessage('warning', 'Por favor, ingresa un correo electrónico válido.');
    return;
  }

  try {

    showMessage('info', 'Enviando correo, por favor espera un momento');

    const response = await fetch('http://localhost:8080/user/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    });

    const result = await response.json();

    if (response.ok) {
      showMessage('success', 'Correo enviado correctamente. Ingresa el código que recibiste.', email);
    } else {

      showMessage('danger', result.text || 'Hubo un problema al enviar el correo.');
    }
  } catch (error) {

    showMessage('danger', 'Error al enviar el correo. Intenta nuevamente más tarde.');
  }
});
