function showMessage(type, message) {
  const messageElement = document.getElementById("message");
  const messageText = document.getElementById("message-text");

  messageElement.className = `alert alert-${type}`;
  messageText.textContent = message;
  messageElement.style.display = 'block';

  setTimeout(() => {
    messageElement.style.display = 'none';
  }, 2000);
}

document.getElementById('request-pass').addEventListener('submit', async function(event) {
  event.preventDefault();  // Prevenir que el formulario se envíe automáticamente

  const emailInput = document.getElementById('email');
  const email = emailInput.value;

  // Validación de correo
  if (!email || !email.includes('@') || !email.includes('.')) {
    showMessage('warning', 'Por favor, ingresa un correo electrónico válido.');
    return;
  }

  try {
    // Mostrar mensaje de "Enviando correo"
    showMessage('info', 'Enviando correo, por favor espera un momento');

    // Realizar la solicitud para enviar el correo
    const response = await fetch('http://localhost:8080/user/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    });

    const result = await response.json();

    if (response.ok) {

      showMessage('success', 'Correo enviado correctamente. Ingresa el código que recibiste.');


      window.location.href = `../views/insertCode.html?email=${encodeURIComponent(email)}`;
    } else {

      showMessage('danger', result.text || 'Hubo un problema al enviar el correo.');
    }

  } catch (error) {

    showMessage('danger', 'Error al enviar el correo. Intenta nuevamente más tarde.');
  }
});
