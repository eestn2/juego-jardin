document.addEventListener("DOMContentLoaded", () => {
  // Animales y sus datos
  const animales = [
    {
      nombre: "Puma",
      src: "./multimedia/pumaAnimado.png",
      correcto: true,
      mensaje: "¡Es el puma, el animal que buscamos! ¡Bien hecho!",
    },
    {
      nombre: "Ñandú",
      src: "./multimedia/niandu.png",
      correcto: false,
      mensaje: "Es un ñandú. No es el animal que buscamos.",
    },
    {
      nombre: "Gato montés",
      src: "./multimedia/gato-montes.png",
      correcto: false,
      mensaje: "Es un gato montés. No es el animal que buscamos.",
    },
  ];

  let juegoActivo = true; // 🔹 bandera para controlar si se puede seguir jugando

  function reiniciarJuego() {
    juegoActivo = true;

    // Mezclar animales y asignar a los arbustos
    const animalesMezclados = animales.sort(() => Math.random() - 0.5);

    for (let i = 1; i <= 3; i++) {
      const arbustoImg = document.getElementById(`esconditeImg${i}`);
      arbustoImg.src = "./multimedia/arbsusto_niandu.png"; // vuelve a ser arbusto
      arbustoImg.dataset.correcto = animalesMezclados[i - 1].correcto;
      arbustoImg.dataset.mensaje = animalesMezclados[i - 1].mensaje;
      arbustoImg.dataset.animalSrc = animalesMezclados[i - 1].src; // guardo la imagen real
    }

    // Ocultar mensaje ganador
    document.getElementById("mensajeGanador").style.display = "none";
    document.getElementById("btnContinuar").style.display = "none";
  }

  // Inicializar juego
  reiniciarJuego();

  // Asignar eventos a los arbustos
  document.querySelectorAll(".escondite img").forEach((arbustoImg) => {
    arbustoImg.style.cursor = "pointer";
    arbustoImg.onclick = () => {
      if (!juegoActivo) return; // 🔹 evitar clics extras si ya terminó o elegiste

      // Reemplazar imagen del arbusto por el animal correspondiente
      arbustoImg.src = arbustoImg.dataset.animalSrc;

      // Mostrar mensaje ganador
      const mensajeGanador = document.getElementById("mensajeGanador");
      mensajeGanador.style.display = "block";
      mensajeGanador.querySelector("h2").textContent =
        mensajeGanador.scrollIntoView({ behavior: "smooth" });
      arbustoImg.dataset.correcto === "true" ? "¡Felicitaciones!" : "¡Ups!";
      mensajeGanador.querySelector("p").textContent =
        arbustoImg.dataset.mensaje;

      const btnContinuar = document.getElementById("btnContinuar");

      if (arbustoImg.dataset.correcto === "true") {
        // 🔹 Ganó → mostrar botón continuar y bloquear el juego
        btnContinuar.style.display = "inline-block";
        juegoActivo = false; // ya no se pueden clickear más
      } else {
        btnContinuar.style.display = "none";
        juegoActivo = false; // bloquear mientras se reinicia
        setTimeout(reiniciarJuego, 5000);
      }
    };
  });

  // Botón volver al mapa
  document.getElementById("Volver").onclick = () => {
    window.location.href = "../mapa-y-puzzle/mapa-test.html";
  };

  // Función para pasar al siguiente minijuego o completar
  function pasarAlSiguienteMinijuegoOCompletar() {
    const params = new URLSearchParams(window.location.search);
    const region = params.get("region");

    // Lista de minijuegos por región
    const juegosPorRegion = {
      Noroeste: ["../mapa-y-puzzle/puzzzlee", "/encontrar"],
      Noreste: ["../mapa-y-puzzle/puzzzlee", "/encontrar"],
      Cuyo: ["../mapa-y-puzzle/puzzzlee", "/encontrar"],
      Centro: ["../mapa-y-puzzle/puzzzlee", "/encontrar"],
      Patagonia: ["../mapa-y-puzzle/puzzzlee", "/encontrar"],
    };

    // Guardar progreso de minijuegos jugados
    const actual = window.location.pathname
      .split("/")
      .pop()
      .replace(/\.html?$/, "");
    const completados =
      JSON.parse(localStorage.getItem("juegosCompletados")) || {};
    const jugados = completados[region] || [];
    if (!jugados.includes(actual)) {
      jugados.push(actual);
      completados[region] = jugados;
      localStorage.setItem("juegosCompletados", JSON.stringify(completados));
    }

    const juegos = juegosPorRegion[region] || [];
    const juegosRestantes = juegos.filter(
      (j) => !jugados.includes(j.replace(/.*\//, ""))
    );

    if (juegosRestantes.length > 0) {
      // Ir al siguiente minijuego pendiente
      const siguienteJuego = juegosRestantes[0];
      window.location.href = `${siguienteJuego}.html?region=${encodeURIComponent(
        region
      )}`;
    } else {
      // Si era el último, marcar región completada y dar monedas
      const progreso =
        JSON.parse(localStorage.getItem("progresoRegiones")) || {};
      if (!progreso[region]) {
        progreso[region] = true;
        localStorage.setItem("progresoRegiones", JSON.stringify(progreso));
        let monedas = parseInt(localStorage.getItem("monedas"));
        if (isNaN(monedas)) monedas = 15;
        monedas = Math.max(0, monedas - 3);
        localStorage.setItem("monedas", monedas);

       
      }

      window.location.href = "../mapa-y-puzzle/mapa-test.html";
    }
  }
  // Función para desbloquear nuevas regiones
  function desbloquearRegiones(regionCompletada) {
    const estadoRegiones =
      JSON.parse(localStorage.getItem("estadoRegiones")) || {};

    const desbloqueoPorRegion = {
      Noreste: ["Cuyo"],
      Cuyo: ["Patagonia", "Noroeste"],
      Noroeste: [],
      Patagonia: [],
      Centro: [],
    };

    const nuevas = desbloqueoPorRegion[regionCompletada] || [];
    nuevas.forEach((region) => {
      estadoRegiones[region] = true;
    });

    localStorage.setItem("estadoRegiones", JSON.stringify(estadoRegiones));
  }


  // Reemplaza el onclick del botón continuar:
  document.getElementById("btnContinuar").onclick =
    pasarAlSiguienteMinijuegoOCompletar;
});
