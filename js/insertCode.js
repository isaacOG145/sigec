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
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('email');

  if (email) {

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

      const response = await fetch('http://localhost:8080/user/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, code: code})
      });

      const result = await response.json();

      if (response.ok) {
        showMessage('success', 'Código verificado correctamente. Ahora puedes cambiar tu contraseña.', email);

        localStorage.setItem('email', email);

        window.location.href = `../views/changePass.html?email=${encodeURIComponent(email)}`;
      } else {
        showMessage('danger', result.text || 'Hubo un problema al verificar el código.');
      }
    } catch (error) {
      showMessage('danger', 'Error al verificar el código. Intenta nuevamente más tarde.');
    }
  });
});
