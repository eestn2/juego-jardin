const contenedor = document.getElementById("contenedor");
const nivelTexto = document.getElementById("nivel");
const titulo = document.getElementById("titulo-region");
const total = 3;
let seleccionada = null;
let nivelActual = 1;
const nivelMax = 3;

// Obtener región desde la URL
const params = new URLSearchParams(window.location.search);
const region = params.get("region");

// Mostrar título
titulo.textContent = `Rompecabezas de la Región ${region}`;

// Imágenes específicas por región
const imagenesPorRegion = {
  Noroeste: [
    "imgs/norte/Capybara.jfif",
    "imgs/norte/Osezno-de-anteojos.jfif",
    "imgs/norte/Puma.jfif",
  ],
  Noreste: [
    "imgs/norte/Capybara.jfif",
    "imgs/norte/Osezno-de-anteojos.jfif",
    "imgs/norte/Puma.jfif",
  ],
  Centro: [
    "imgs/pampeana/carpincho.jfif",
    "imgs/pampeana/peludo.jfif",
    "imgs/pampeana/Zorro-gris.jfif",
  ],
  Cuyo: [
    "imgs/cuyo/ciervo.jfif",
    "imgs/cuyo/guanaco.jfif",
    "imgs/cuyo/pudu.jfif",
  ],
  Patagonia: [
    "imgs/patagonica/condor.jfif",
    "imgs/patagonica/huemul.jpg",
    "imgs/patagonica/pinguino.jfif",
  ],
};

// Obtener imagen aleatoria para la región actual
function obtenerImagenParaRegion(region) {
  const imagenesDisponibles = imagenesPorRegion[region] || [];
  if (!imagenesDisponibles.length) return null;

  // Inicializar usadas si no existe
  if (!imagenesUsadasPorRegion[region]) {
    imagenesUsadasPorRegion[region] = [];
  }

  // Filtrar imágenes no usadas aún
  const noUsadas = imagenesDisponibles.filter(
    (img) => !imagenesUsadasPorRegion[region].includes(img)
  );

  // Si ya se usaron todas, reiniciar
  if (noUsadas.length === 0) {
    imagenesUsadasPorRegion[region] = [];
    return obtenerImagenParaRegion(region);
  }

  // Elegir una imagen aleatoria de las no usadas
  const seleccionada = noUsadas[Math.floor(Math.random() * noUsadas.length)];

  // Marcar como usada
  imagenesUsadasPorRegion[region].push(seleccionada);
  return seleccionada;
}
// Almacenar imágenes usadas por región
const imagenesUsadasPorRegion = {};

// Iniciar nivel
function iniciarNivel(nivel) {
  contenedor.innerHTML = "";
  seleccionada = null;
  nivelTexto.textContent = `Nivel: ${nivel}`;

  const imagenSeleccionada = obtenerImagenParaRegion(region);
  if (!imagenSeleccionada) {
    alert("No hay imágenes disponibles para esta región.");
    return;
  }

  // Crear posiciones correctas
  const posiciones = [];
  for (let y = 0; y < total; y++) {
    for (let x = 0; x < total; x++) {
      posiciones.push({ x, y });
    }
  }

  // Mezclar posiciones
  let mezcladas;
  do {
    mezcladas = [...posiciones].sort(() => Math.random() - 0.5);
  } while (
    mezcladas.some(
      (mez, i) => mez.x === posiciones[i].x && mez.y === posiciones[i].y
    )
  );

  // Crear piezas
  posiciones.forEach((pos, i) => {
    const pieza = document.createElement("div");
    pieza.className = "pieza";

    const mez = mezcladas[i];

    pieza.style.backgroundImage = `url('${imagenSeleccionada}')`;
    pieza.style.backgroundSize = `${total * 100}% ${total * 100}%`;
    pieza.style.backgroundPosition = `-${pos.x * 100}% -${pos.y * 100}%`;

    pieza.dataset.correct = `${pos.x}-${pos.y}`;
    pieza.dataset.current = `${mez.x}-${mez.y}`;
    pieza.style.gridColumnStart = mez.x + 1;
    pieza.style.gridRowStart = mez.y + 1;

    pieza.addEventListener("click", () => seleccionar(pieza));
    contenedor.appendChild(pieza);
  });
}

// Seleccionar piezas
function seleccionar(pieza) {
  if (pieza.classList.contains("fija")) return;

  if (!seleccionada) {
    pieza.classList.add("seleccionada");
    seleccionada = pieza;
  } else if (seleccionada === pieza) {
    pieza.classList.remove("seleccionada");
    seleccionada = null;
  } else {
    intercambiar(seleccionada, pieza);
    seleccionada.classList.remove("seleccionada");
    seleccionada = null;
    verificarTodo();
  }
}

// Intercambiar piezas
function intercambiar(p1, p2) {
  const col1 = p1.style.gridColumnStart;
  const row1 = p1.style.gridRowStart;
  const col2 = p2.style.gridColumnStart;
  const row2 = p2.style.gridRowStart;

  p1.style.gridColumnStart = col2;
  p1.style.gridRowStart = row2;
  p2.style.gridColumnStart = col1;
  p2.style.gridRowStart = row1;

  p1.dataset.current = `${parseInt(col2) - 1}-${parseInt(row2) - 1}`;
  p2.dataset.current = `${parseInt(col1) - 1}-${parseInt(row1) - 1}`;

  verificarFija(p1);
  verificarFija(p2);
}

// Verificar pieza fija
function verificarFija(pieza) {
  if (pieza.dataset.current === pieza.dataset.correct) {
    pieza.classList.add("fija");
  } else {
    pieza.classList.remove("fija");
  }
}

// Verificar si el rompecabezas está completo
function verificarTodo() {
  const piezas = document.querySelectorAll(".pieza");
  const completo = Array.from(piezas).every(
    (p) => p.dataset.current === p.dataset.correct
  );

  if (completo) {
    document.getElementById("personaje").style.display = "none";

    setTimeout(() => {
      if (nivelActual < nivelMax) {
        nivelActual++;
        iniciarNivel(nivelActual);
      } else {
        // Guardar que este minijuego fue completado
        let juegosCompletados =
          JSON.parse(localStorage.getItem("juegosCompletados")) || {};
        if (!juegosCompletados[region]) juegosCompletados[region] = [];

        if (!juegosCompletados[region].includes("puzzzlee")) {
          juegosCompletados[region].push("puzzzlee");
          localStorage.setItem(
            "juegosCompletados",
            JSON.stringify(juegosCompletados)
          );
        }

        // Verificar si ya se completaron todos los minijuegos de esta región
        const juegosEsperados = {
          Noroeste: ["./puzzzlee", "../mini_juego_jardin_lugar/lugar"],
          Noreste: ["./puzzzlee", "../mini_juego_jardin_lugar/lugar"],
          Cuyo: [
            "./puzzzlee",
            "../mini_juego_jardin_encontrar_al_animal/encontrar",
          ],
          Centro: [
            "./puzzzlee",
            "../mini_juego_jardin_encontrar_al_animal/encontrar",
          ],
          Patagonia: ["./puzzzlee", "../mini_juego_jardin_lugar/lugar"],
        };

        const todos = juegosEsperados[region] || [];
        const completados = juegosCompletados[region];

        const juegosRestantes = todos.filter((j) => !completados.includes(j));
        if (completo) {
          // Mostrar mensaje y redirigir
          const mensaje = document.getElementById("mensaje");
          mensaje.style.display = "flex";
          mensaje.scrollIntoView({ behavior: "smooth" });
        }

        document.getElementById("boton-volver").style.display = "none";

        setTimeout(() => {
          if (juegosRestantes.length > 0) {
            // Elegir siguiente minijuego aleatorio
            const siguienteJuego =
              juegosRestantes[
                Math.floor(Math.random() * juegosRestantes.length)
              ];
            window.location.href = `${siguienteJuego}.html?region=${encodeURIComponent(
              region
            )}`;
          } else {
            // Si era el último, volver al mapa
            window.location.href = "../mapa-test.html";
          }
        }, 2000);
      }
    }, 1000);
  }
}
function irAlSiguienteJuego() {
  const params = new URLSearchParams(window.location.search);
  const region = params.get("region");

  // Obtener lista de minijuegos de la región
  const juegosPorRegion = {
    Noroeste: ["/puzzzlee", "../mini_juego_jardin_lugar/lugar"],
    Noreste: ["/puzzzlee", "/mini_juego_jardin_lugar/lugar"],
    Cuyo: ["/puzzzlee", "../mini_juego_jardin_encontrar_al_animal/encontrar"],
    Centro: ["./puzzzlee", "../mini_juego_jardin_encontrar_al_animal/encontrar"],
    Patagonia: ["/puzzzlee", "../mini_juego_jardin_lugar/lugar"],
  };

  const juegos = juegosPorRegion[region];
  const actual = window.location.pathname.split("/").pop();
  const indiceActual = juegos.indexOf(actual);

  if (indiceActual >= 0 && indiceActual < juegos.length - 1) {
    // Ir al siguiente minijuego
    window.location.href = `${juegos[indiceActual + 1]}?region=${region}`;
  } else {
    // Si era el último, volver al mapa
    window.location.href = "../mapa-test.html";
  }
}

// Iniciar primer nivel al cargar
iniciarNivel(nivelActual);

document.getElementById("boton-volver").onclick = function () {
  window.location.href = "./mapa-test.html";
};

document.getElementById("boton-siguiente").onclick = function () {
  irAlSiguienteJuego();
};
if (boton - siguiente) {
  boton - siguiente.addEventListener("click", irAlSiguienteJuego);
}
if (!juegosPorRegion[region]) {
  alert("Región no válida.");
  window.location.href = "./mapa-test.html";
}
