function abrirVideo(url) {
  const modal = document.getElementById("videoModal");
  const iframe = document.getElementById("videoFrame");

  // Agregar autoplay al URL
  iframe.src = url + "?autoplay=1";
  modal.style.display = "block";

  // Prevenir scroll del body
  document.body.style.overflow = "hidden";
}

function cerrarVideo() {
  const modal = document.getElementById("videoModal");
  const iframe = document.getElementById("videoFrame");

  // Detener el video
  iframe.src = "";
  modal.style.display = "none";

  // Restaurar scroll del body
  document.body.style.overflow = "auto";
}

// Cerrar con tecla ESC
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    cerrarVideo();
  }
});
