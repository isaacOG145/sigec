const form = document.getElementById('categoryForm');


form.addEventListener('submit', async (event) => {
  event.preventDefault();


  const nombre = document.getElementById('PC.nombre').value;
  const descripcion = document.getElementById('PC.descripcion').value;

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

      alert('Categoría registrada con éxito');

      window.location.href = '../views/categoryList.html';
    } else {

      alert(`Error: ${result.message || 'Hubo un problema al registrar la categoría'}`);
    }
  } catch (error) {

    alert('Error al enviar los datos. Intenta nuevamente más tarde.');
  }
});
