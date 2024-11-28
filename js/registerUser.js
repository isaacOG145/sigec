const form = document.getElementById('userForm');

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

  const name = document.getElementById('U.nombre').value;
  const lastName = document.getElementById('U.apellidos').value;
  const email = document.getElementById('U.email').value;
  const phoneNumber = document.getElementById('U.telefono').value;
  const password = document.getElementById('U.password').value;
  const confirmPassword = document.getElementById('U.Cpassword').value;
  const roleSelect = document.getElementById('U.rol');
  const selectedRole = roleSelect.value;

  if (!name || !lastName || !email || !phoneNumber || !password || !confirmPassword || !selectedRole) {
    showMessage('warning', 'Debes llenar todos los campos obligatorios.');
    return;
  }

  // Validación de contraseñas
  if (password !== confirmPassword) {
    showMessage('warning', 'Las contraseñas no coinciden');
    return;
  }

  const roleMapping = {
    "Administrador": 1,
    "Usuario": 2
  };

  const userData = {
    name: name,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    password: password,
    role: {
      id: roleMapping[selectedRole]
    }
  };

  try {
    const response = await fetch('http://localhost:8080/user/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (response.ok && result.type === 'SUCCESS') {

      showMessage(result.type.toLowerCase(), result.text);
      document.getElementById('U.nombre').value = '';
      document.getElementById('U.apellidos').value = '';
      document.getElementById('U.email').value = '';
      document.getElementById('U.telefono').value = '';
      document.getElementById('U.password').value = '';
      document.getElementById('U.Cpassword').value = '';
      document.getElementById('U.rol').value = "";

    } else {
      showMessage('danger', result.text || 'Hubo un problema al registrar la categoría');
    }
  } catch (error) {
    showMessage('danger', 'Error al enviar los datos. Intenta nuevamente más tarde.');
  }

});

