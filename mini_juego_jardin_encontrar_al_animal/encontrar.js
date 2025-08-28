document.addEventListener("DOMContentLoaded", () => {
  const cuadroDeTexto = document.querySelector(".cuadrodetexto");
  const arbustoImg = document.getElementById("arbusto");
  const btnVolverInicio = document.getElementById("btnVolverInicio");
  const animalImg = document.getElementById("yaguarete"); // Selecciona el img existente

  // Configuración por región
  const juegosPorRegion = {
    Noroeste: ["../mapa-y-puzzle/puzzzlee", "../mini_juego_jardin_lugar/lugar"],
    Noreste: ["../mapa-y-puzzle/puzzzlee", "../mini_juego_jardin_lugar/lugar"],
    Cuyo: ["../mapa-y-puzzle/puzzzlee", "./encontrar"],
    Centro: ["../mapa-y-puzzle/puzzzlee", "./encontrar"],
    Patagonia: [
      "../mapa-y-puzzle/puzzzlee",
      "../mini_juego_jardin_lugar/lugar",
    ],
  };
  const imagenesPorRegion = {
    Centro: ["./Imagenes/jaguar.png", "¡Muy bien, has encontrado al jaguar!"],
    Cuyo: ["./Imagenes/Huemul.png", "¡Muy bien, has encontrado al huemul!"],
  };

  // Obtener región desde la URL
  const params = new URLSearchParams(window.location.search);
  const region = params.get("region");

  // Mostrar animal según la región
  function mostrarAnimal() {
    if (imagenesPorRegion[region]) {
      animalImg.src = imagenesPorRegion[region][0];
      animalImg.alt = `Animal de la región ${region}`;
      animalImg.style.display = "block";
    } else {
      animalImg.style.display = "none";
    }
  }
  mostrarAnimal();

  // Mostrar cuadro de texto
  if (cuadroDeTexto) {
    cuadroDeTexto.style.display = "block";
    cuadroDeTexto.scrollIntoView({ behavior: "smooth" });
  }

  // Al encontrar el animal
  function animalEncontrado() {
    arbustoImg.style.display = "none";
    animalImg.style.display = "block";
    const pText = cuadroDeTexto.querySelector("p");
    pText.style.display = "none"; // Ocultar el texto de instrucciones
    const h3 = cuadroDeTexto.querySelector("h3");
    h3.textContent =
      imagenesPorRegion[region]?.[1] || "¡Muy bien, has encontrado al animal!";
    btnVolverInicio.textContent = "Continuar";
    cuadroDeTexto.scrollIntoView({ behavior: "smooth" });

    // Guardar progreso
    const juego = juegoNombre(window.location.pathname.split("/").pop());
    const completados =
      JSON.parse(localStorage.getItem("juegosCompletados")) || {};
    const regionCompletada = completados[region] || [];
    if (!regionCompletada.includes(juego)) {
      regionCompletada.push(juego);
      completados[region] = regionCompletada;
      localStorage.setItem("juegosCompletados", JSON.stringify(completados));
    }
  }

  // Botón para continuar o volver al menú
  if (btnVolverInicio) {
    btnVolverInicio.onclick = () => {
      const juegos = juegosPorRegion[region] || [];
      const completados =
        JSON.parse(localStorage.getItem("juegosCompletados")) || {};
      const jugados = completados[region] || [];
      const juegosRestantes = juegos.filter(
        (j) => !jugados.includes(juegoNombre(j))
      );

      if (juegosRestantes.length > 0) {
        // Ir al siguiente minijuego pendiente (aleatorio)
        const siguienteJuego =
          juegosRestantes[Math.floor(Math.random() * juegosRestantes.length)];
        window.location.href = `${siguienteJuego}.html?region=${encodeURIComponent(
          region
        )}`;
      } else {
        // Si era el último, volver al mapa y marcar región completada
        const progreso =
          JSON.parse(localStorage.getItem("progresoRegiones")) || {};
        if (!progreso[region]) {
          progreso[region] = true;
          localStorage.setItem("progresoRegiones", JSON.stringify(progreso));
          let monedas = parseInt(localStorage.getItem("monedas")) || 0;
          monedas += 3;
          localStorage.setItem("monedas", monedas);
        } else {
          window.location.href = "../mapa-y-puzzle/mapa-test.html";
        }
      }
    };
  }

  // Listener para encontrar el animal
  if (arbustoImg) {
    arbustoImg.addEventListener("click", animalEncontrado);
  }

  // Audio pista
  const btnAudio = document.getElementById("audioo");
  const audioPista = new Audio("Santii.mp3");
  if (btnAudio) {
    btnAudio.addEventListener("click", () => {
      audioPista.currentTime = 0;
      audioPista.play();
    });
  }

  // Actualizar título con la región
  const titulo = document.querySelector("h1");
  if (titulo && region) {
    titulo.textContent = `Minijuego de la Región ${region}`;
  }

  function juegoNombre(path) {
    // Quita la extensión y posibles rutas
    return path
      .replace(/\.html?$/, "")
      .split("/")
      .pop();
  }
});
