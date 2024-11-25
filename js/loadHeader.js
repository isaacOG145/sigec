document.addEventListener("DOMContentLoaded", () => {
  const headerPlaceholder = document.getElementById("header-placeholder");

  fetch("../views/header.html")
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudo cargar el header");
      }
      return response.text();
    })
    .then(data => {
      headerPlaceholder.innerHTML = data;
    })
    .catch(error => console.error("Error al cargar el header:", error));
});
