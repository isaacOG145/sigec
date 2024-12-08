const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const messageElement = document.getElementById('message');
const messageText = document.getElementById('message-text');

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
}

function showMessage(type, message) {
  messageElement.className = `alert alert-${type}`;
  messageText.textContent = message;
  messageElement.style.display = 'block';

  setTimeout(() => {
    messageElement.style.display = 'none';
  }, 5000);
}



loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    showMessage('warning', 'Por favor ingresa tu correo y contraseña');
    return;
  }

  if (!isValidEmail(email)) {
    showMessage('warning', 'Por favor ingresa un correo válido');
    return;
  }

  const loginData = {
    email: email,
    password: password
  };

  try {

    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    if (!response.ok) {
      throw new Error('Usuario o contraseña incorrectos ');
    }


    const data = await response.json();

    const { jwt, userId, role, expiration } = data;

    localStorage.setItem('jwt', data.jwt);
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('email',email);
    localStorage.setItem('role', role);
    localStorage.setItem('expiration', Date.now() + data.expiration);

    if(localStorage.getItem('role') == 'ROLE_ADMIN') {
      window.location.href = '../views/projectList.html';
    }else{
      window.location.href = '../views/projectListStatic.html';
    }


  } catch (error) {

    showMessage('danger', error.message);
  }
});
