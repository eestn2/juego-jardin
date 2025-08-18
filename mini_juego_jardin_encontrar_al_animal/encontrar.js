// Espera a que el DOM (Document Object Model) esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  const cuadroDeTexto = document.querySelector(".cuadrodetexto");
  const arbustoImg = document.getElementById("arbusto");
  const yaguateImg = document.getElementById("yaguarete");
  const btnVolverInicio = document.getElementById("btnVolverInicio");

  // Minijuegos por región
  const juegosPorRegion = {
    Noroeste: ["../mapa-y-puzzle/puzzzlee", "../mini_juego_jardin_lugar/lugar"],
    Noreste: ["../mapa-y-puzzle/puzzzlee", "../mini_juego_jardin_lugar/lugar"],
    Cuyo: ["../mapa-y-puzzle/puzzzlee", "/encontrar"],
    Centro: ["../mapa-y-puzzle/puzzzlee", "/encontrar"],
    Patagonia: [
      "../mapa-y-puzzle/puzzzlee",
      "../mini_juego_jardin_lugar/lugar",
    ],
  };

  // Solo agrega el listener si ambos existen
  [arbustoImg, yaguateImg].forEach((img) => {
    if (img) {
      img.addEventListener("click", () => {
        arbustoImg.style.display = "none";
        const h3 = cuadroDeTexto.querySelector("h3");
        if (h3) h3.textContent = "¡Muy bien, has encontrado al yaguarete!";
        btnVolverInicio.textContent = "Continuar";
        const elemento = document.querySelector(".cuadrodetexto");
        elemento.scrollIntoView({ behavior: "smooth" });
        const region = new URLSearchParams(window.location.search).get(
          "region"
        );
        const juego = window.location.pathname
          .split("/")
          .pop()
          .replace(".html", "");

        // Guardar progreso del minijuego
        const completados =
          JSON.parse(localStorage.getItem("juegosCompletados")) || {};
        const regionCompletida = completados[region] || [];
        if (!regionCompletida.includes(juego)) {
          regionCompletida.push(juego);
          completados[region] = regionCompletida;
          localStorage.setItem(
            "juegosCompletados",
            JSON.stringify(completados)
          );
        }

        // Verificar si completó todos los juegos de la región
        const juegosDeEstaRegion = juegosPorRegion[region] || [];
        const completos = regionCompletida.filter((j) =>
          juegosDeEstaRegion.includes(j)
        );
        if (completos.length >= juegosDeEstaRegion.length) {
          const progreso =
            JSON.parse(localStorage.getItem("progresoRegiones")) || {};
          if (!progreso[region]) {
            progreso[region] = true;
            localStorage.setItem("progresoRegiones", JSON.stringify(progreso));
            let monedas = parseInt(localStorage.getItem("monedas")) || 0;
            monedas += 3;
            localStorage.setItem("monedas", monedas);
            // Desbloquear siguientes regiones
            const estadoRegiones =
              JSON.parse(localStorage.getItem("estadoRegiones")) || {};
            const desbloqueo = {
              Centro: ["Noreste", "Cuyo"],
              Noreste: ["Noroeste"],
              Cuyo: ["Patagonia"],
              Noroeste: [],
              Patagonia: [],
            };
            (desbloqueo[region] || []).forEach(
              (r) => (estadoRegiones[r] = true)
            );
            localStorage.setItem(
              "estadoRegiones",
              JSON.stringify(estadoRegiones)
            );
          }
        }
      });
    }
  });

  // Función para ir al siguiente minijuego pendiente o al mapa
  function irAlSiguienteJuego() {
    const region = new URLSearchParams(window.location.search).get("region");
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
      // Si era el último, volver al mapa
      window.location.href = "/mapa-y-puzzle/mapa-test.html";
    }
  }

  // Helper para obtener el nombre del juego sin ruta ni extensión
  function juegoNombre(juegoRuta) {
    return juegoRuta.replace(/^.*[\\/]/, "").replace(".html", "");
  }

  // Botón volver al mapa o siguiente minijuego
  if (btnVolverInicio) {
    btnVolverInicio.style.display = "block";
    btnVolverInicio.onclick = () => {
      const region = new URLSearchParams(window.location.search).get("region");
      const juegos = juegosPorRegion[region] || [];
      const completados =
        JSON.parse(localStorage.getItem("juegosCompletados")) || {};
      const jugados = completados[region] || [];
      const juegosRestantes = juegos.filter(
        (j) => !jugados.includes(juegoNombre(j))
      );

      if (juegosRestantes.length > 0) {
        // Redirige al siguiente minijuego pendiente (aleatorio)
        const siguienteJuego =
          juegosRestantes[Math.floor(Math.random() * juegosRestantes.length)];
        window.location.href = `${siguienteJuego}.html?region=${encodeURIComponent(
          region
        )}`;
      } else {
        // Marca la región como completada, agrega monedas y reproduce audio
        const progreso =
          JSON.parse(localStorage.getItem("progresoRegiones")) || {};
        if (!progreso[region]) {
          progreso[region] = true;
          localStorage.setItem("progresoRegiones", JSON.stringify(progreso));
          let monedas = parseInt(localStorage.getItem("monedas")) || 0;
          monedas += 3;
          localStorage.setItem("monedas", monedas);
        }
        window.location.href = "/mapa-y-puzzle/mapa-test.html";
      }
    };
  }

  // Audio al presionar el botón del micrófono
  const btnAudio = document.getElementById("audioo");
  const audioPista = new Audio("\Santii.mp3"); // Asegúrate que la ruta es correcta y el archivo existe
  if (btnAudio) {
    btnAudio.addEventListener("click", () => {
      audioPista.currentTime = 0; // Reinicia el audio si ya se reprodujo
      audioPista.play();
    });
  }

  // Audio al iniciar el minijuego
  // const audioInicio = new Audio("/Santii.mp3");
  // audioInicio.play();
});
