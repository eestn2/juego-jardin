document.addEventListener("DOMContentLoaded", () => {
  // helper: muestra un overlay de carga
  function createLoader(text = "Cargando imágenes...") {
    const el = document.createElement("div");
    el.id = "loader-overlay";
    Object.assign(el.style, {
      position: "fixed",
      inset: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0,0,0,0.6)",
      color: "#fff",
      zIndex: "9999",
      fontFamily: "sans-serif",
      fontSize: "18px",
    });
    el.innerHTML = `<div>${text}</div>`;
    document.body.appendChild(el);
    return el;
  }

  // helper: precargar imágenes con timeout de fallback
  function preloadAllImages(extraSrcs = [], timeoutMs = 8000) {
    const pageImgs = Array.from(document.images)
      .map((i) => i.src)
      .filter(Boolean);
    const srcs = Array.from(new Set([...pageImgs, ...extraSrcs]));
    const loaders = srcs.map(
      (s) =>
        new Promise((res) => {
          const img = new Image();
          img.onload = img.onerror = () => res(s);
          img.src = s;
        })
    );
    return Promise.race([
      Promise.all(loaders),
      new Promise((res) => setTimeout(res, timeoutMs)),
    ]);
  }

  // animales definido en este archivo (ya existe más abajo)
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

  const loader = createLoader();
  preloadAllImages(
    animales.map((a) => a.src),
    8000
  ).finally(() => {
    // quitar overlay y ejecutar inicialización del juego
    loader.remove();

    let juegoActivo = true; // bandera para controlar si se puede seguir jugando

    function reiniciarJuego() {
      juegoActivo = true;

      // Mezclar animales y asignar a los arbustos
      // usar slice() para no mutar el array original
      const animalesMezclados = animales.slice().sort(() => Math.random() - 0.5);

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
        if (!juegoActivo) return; //Evitar clics extras si ya terminó o elegiste

        // Reemplazar imagen del arbusto por el animal correspondiente
        arbustoImg.src = arbustoImg.dataset.animalSrc;

        // Mostrar mensaje ganador
        const mensajeGanador = document.getElementById("mensajeGanador");
        mensajeGanador.style.display = "block";
        // establecer texto correctamente y luego hacer scroll
        mensajeGanador.querySelector("h2").textContent =
          arbustoImg.dataset.correcto === "true" ? "¡Felicitaciones!" : "¡Ups!";
        mensajeGanador.scrollIntoView({ behavior: "smooth" });
        mensajeGanador.querySelector("p").textContent =
          arbustoImg.dataset.mensaje;

        const btnContinuar = document.getElementById("btnContinuar");

        if (arbustoImg.dataset.correcto === "true") {
          // Ganó → mostrar botón continuar y bloquear el juego
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
        Noroeste: ["../mapa-y-puzzle/puzzzlee", "../encontrar/encontrar"],
        Noreste: ["../mapa-y-puzzle/puzzzlee", "../encontrar/encontrar"],
        Cuyo: ["../mapa-y-puzzle/puzzzlee", "../encontrar/encontrar"],
        Centro: ["../mapa-y-puzzle/puzzzlee", "../encontrar/encontrar"],
        Patagonia: ["../mapa-y-puzzle/puzzzlee", "../encontrar/encontrar"],
      };

      const normalize = (s) =>
        String(s || "")
          .replace(/\\/g, "/")
          .replace(/.*\//, "")
          .replace(/\.html?$/, "");

      const actual = normalize(window.location.pathname.split("/").pop());
      const completados =
        JSON.parse(localStorage.getItem("juegosCompletados")) || {};
      const jugados = completados[region] || [];

      if (!jugados.includes(actual)) {
        jugados.push(actual);
        completados[region] = jugados;
        localStorage.setItem("juegosCompletados", JSON.stringify(completados));
      }

      const juegosPaths = juegosPorRegion[region] || [];
      const juegosNorm = juegosPaths.map(normalize);
      const juegosRestantesNorm = juegosNorm.filter(
        (j) => !jugados.includes(j)
      );

      if (juegosRestantesNorm.length > 0) {
        const nextNorm = juegosRestantesNorm[0];
        const idx = juegosNorm.indexOf(nextNorm);
        const siguientePath = juegosPaths[idx];

        // resolver ruta relativa correctamente y añadir region
        const target = new URL(
          siguientePath.endsWith(".html")
            ? siguientePath
            : `${siguientePath}.html`,
          window.location.href
        );
        target.searchParams.set("region", region);
        window.location.href = target.href;
      } else {
        let progreso =
          JSON.parse(localStorage.getItem("progresoRegiones")) || {};
        if (!progreso[region]) {
          progreso[region] = true;
          localStorage.setItem("progresoRegiones", JSON.stringify(progreso));

          let monedas = parseInt(localStorage.getItem("monedas")) || 15;
          monedas = Math.max(0, monedas - 3);
          localStorage.setItem("monedas", monedas);

          // ============================
          // Desbloquear regiones relacionadas (actualiza localStorage directamente
          // para no depender de una función externa que exista sólo en mapa.js)
          // ============================
          const desbloqueoPorRegion = {
            Noreste: ["Cuyo"],
            Cuyo: ["Patagonia", "Noroeste"],
            Noroeste: [],
            Patagonia: ["Centro"],
            Centro: [],
          };

          const estadoRegiones =
            JSON.parse(localStorage.getItem("estadoRegiones")) || {};
          const nuevos = desbloqueoPorRegion[region] || [];
          nuevos.forEach((r) => {
            estadoRegiones[r] = true;
          });
          localStorage.setItem("estadoRegiones", JSON.stringify(estadoRegiones));
          // ============================
        }
        if (typeof desbloquearRegiones === "function")
          desbloquearRegiones(region);
        window.location.href = "../mapa-y-puzzle/mapa-test.html";
      }
    }

    // Conectar botón continuar a la función
    const btnContinuar = document.getElementById("btnContinuar");
    if (btnContinuar)
      btnContinuar.addEventListener(
        "click",
        pasarAlSiguienteMinijuegoOCompletar
      );
  });
});
