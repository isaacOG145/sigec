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
    redirectButton.textContent = "Cambiar Contraseña";
    redirectButton.className = "btn btn-success";
    redirectButton.onclick = function() {
      window.location.href = `changePassword.html?email=${encodeURIComponent(email)}`;
    };

    buttonDiv.appendChild(redirectButton);
  }

  setTimeout(() => {
    messageElement.style.display = 'none';
  }, 5000);
}

document.addEventListener('DOMContentLoaded', function () {
  // Obtener el correo electrónico de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('email');  // Obtener el email desde los parámetros de la URL

  if (email) {
    // Si hay un correo, colocarlo en el campo de email
    document.getElementById('email').value = email;
  }

  document.getElementById('confirm-code').addEventListener('submit', async function(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const codeInput = document.getElementById('code');
    const email = emailInput.value;
    const code = codeInput.value;

    if (!email || !email.includes('@') || !email.includes('.')) {
      showMessage('warning', 'Por favor, ingresa un correo electrónico válido.');
      return;
    }

    if (!code) {
      showMessage('warning', 'Por favor, ingresa el código de recuperación.');
      return;
    }

    try {
      showMessage('info', 'Verificando código, por favor espera...');

      const response = await fetch('http://localhost:8080/verify-code', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, code: code })
      });

      const result = await response.json();

      if (response.ok) {
        showMessage('success', 'Código verificado correctamente. Ahora puedes cambiar tu contraseña.', email);

        localStorage.setItem('jwt', result.jwt);
        localStorage.setItem('userId', result.userId);
        localStorage.setItem('email', result.email);
        localStorage.setItem('expiration', Date.now() + result.expiration);

        console.log('JWT Token:', localStorage.getItem('jwt')); // Verifica que el token se guardó correctamente.

        // Redirigir al cambio de contraseña
        window.location.href = `../views/changePass.html?email=${encodeURIComponent(email)}`;
      } else {
        showMessage('danger', result.text || 'Hubo un problema al verificar el código.');
      }
    } catch (error) {
      showMessage('danger', 'Error al verificar el código. Intenta nuevamente más tarde.');
    }
  });
});
