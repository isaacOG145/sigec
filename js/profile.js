document.addEventListener("DOMContentLoaded", function () {
  const jwt = localStorage.getItem('jwt');
  const userId = localStorage.getItem('userId');

  if (!jwt || !userId) {
    console.log("No hay JWT o ID de usuario en el localStorage.");
    window.location.href = "../index.html";
    return;
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

  fetch(`http://localhost:8080/user/findId/${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      if (data.type === 'SUCCESS' && data.result) {
        document.getElementById('nombre').value = data.result.name;
        document.getElementById('apellido').value = data.result.lastName;
        document.getElementById('email').value = data.result.email;
        document.getElementById('telefono').value = data.result.phoneNumber;
        document.getElementById('rol').textContent = data.result.role.name === "ROLE_ADMIN" ? "Administrador" : "Usuario";
      } else {
        console.error("Error al obtener los datos del usuario:", data.text);
        window.location.href = "../index.html";
      }
    })
    .catch(error => {
      console.error('Error:', error);
      window.location.href = '../index.html';
    });

  // Modificar perfil
  document.getElementById('modify-profile').addEventListener('click', () => {
    const nameField = document.getElementById('nombre');
    const lastNameField = document.getElementById('apellido');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('telefono');

    const modifyButton = document.getElementById('modify-profile');
    if (nameField.readOnly) {

      nameField.removeAttribute('readonly');
      lastNameField.removeAttribute('readonly');
      emailField.removeAttribute('readonly');
      phoneField.removeAttribute('readonly');
      modifyButton.textContent = "Guardar cambios";

      const cancelButton = document.createElement('button');
      cancelButton.classList.add('btn', 'btn-outline-danger', 'ms-3', 'rounded', 'px-3', 'py-2'); // ms-3 para mayor margen
      cancelButton.textContent = "Cancelar";

      cancelButton.style.transition = 'background-color 0.3s, color 0.3s';
      cancelButton.addEventListener('mouseover', () => {
        cancelButton.style.backgroundColor = '#dc3545';
        cancelButton.style.color = '#fff';
      });
      cancelButton.addEventListener('mouseout', () => {
        cancelButton.style.backgroundColor = 'transparent';
        cancelButton.style.color = '#dc3545';
      });

      // Evento para cancelar la edición
      cancelButton.addEventListener('click', () => {
        // Cancelar edición y volver al estado original
        nameField.setAttribute('readonly', true);
        lastNameField.setAttribute('readonly', true);
        emailField.setAttribute('readonly', true);
        phoneField.setAttribute('readonly', true);
        modifyButton.textContent = "Modificar Perfil";
        cancelButton.remove();
      });

      modifyButton.parentElement.appendChild(cancelButton);

      // Guardar cambios
      modifyButton.addEventListener('click', () => {
        const updatedData = {
          id: `${userId}`,
          name: nameField.value,
          lastName: lastNameField.value,
          email: emailField.value,
          phoneNumber: phoneField.value,
          role: {
            id: document.getElementById('rol').textContent === "Administrador" ? 1 : 2
          }
        };

        fetch("http://localhost:8080/user/update", {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        })
          .then(response => response.json())
          .then(data => {
            if (data.type === 'SUCCESS') {
              // Mostrar mensaje de éxito
              showMessage('success', "Perfil actualizado correctamente");

              // Deshabilitar los campos de texto y ocultar el botón de "Cancelar"
              nameField.setAttribute('readonly', true);
              lastNameField.setAttribute('readonly', true);
              emailField.setAttribute('readonly', true);
              phoneField.setAttribute('readonly', true);
              modifyButton.textContent = "Modificar Perfil";
              cancelButton.remove();
            } else if (data.type === 'WARNING') {
              // Mostrar mensaje de advertencia
              showMessage('warning', data.text);
            } else {
              // Mostrar mensaje de error
              showMessage('danger', "Error al actualizar el perfil");
            }
          })
          .catch(error => {
            // En caso de un error en la petición
            console.error('Error al guardar los cambios:', error);
            showMessage('danger', "Hubo un problema al guardar los cambios.");
          });
      });

    }
  });

  document.getElementById('change-password').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    window.location.href = `../views/changePass.html?email=${encodeURIComponent(email)}`;
  });

  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userId');
    window.location.href = '../index.html';
  });
});
