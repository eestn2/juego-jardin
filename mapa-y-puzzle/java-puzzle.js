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
    {
      src: "./imgs/norte/Capybara.jfif",
      nombre: "Carpincho",
      info: "El carpincho es el roedor más grande del mundo y vive en zonas húmedas.",
    },
    {
      src: "./imgs/norte/Osezno-de-anteojos.jfif",
      nombre: "Osezno de anteojos",
      info: "El oso de anteojos es el único oso nativo de Sudamérica.",
    },
    {
      src: "./imgs/norte/Puma.jfif",
      nombre: "Puma",
      info: "El puma es un felino nativo de América y está protegido en muchas regiones.",
    },
  ],
  Noreste: [
    {
      src: "./imgs/norte/Capybara.jfif",
      nombre: "Carpincho",
      info: "El carpincho es el roedor más grande del mundo y vive en zonas húmedas.",
    },
    {
      src: "./imgs/norte/Osezno-de-anteojos.jfif",
      nombre: "Osezno de anteojos",
      info: "El oso de anteojos es el único oso nativo de Sudamérica.",
    },
    {
      src: "./imgs/norte/Puma.jfif",
      nombre: "Puma",
      info: "El puma es un felino nativo de América y está protegido en muchas regiones.",
    },
  ],
  Centro: [
    {
      src: "./imgs/pampeana/carpincho.jfif",
      nombre: "Carpincho",
      info: "El carpincho es el roedor más grande del mundo y vive en zonas húmedas.",
    },
    {
      src: "./imgs/pampeana/peludo.jfif",
      nombre: "Peludo",
      info: "El peludo es un armadillo típico de la región pampeana.",
    },
    {
      src: "./imgs/pampeana/Zorro-gris.jfif",
      nombre: "Zorro gris",
      info: "El zorro gris es un mamífero carnívoro que habita en la región pampeana.",
    },
  ],
  Cuyo: [
    {
      src: "./imgs/cuyo/ciervo.jfif",
      nombre: "Ciervo",
      info: "El ciervo es un mamífero herbívoro que vive en bosques y montañas.",
    },
    {
      src: "./imgs/cuyo/guanaco.jfif",
      nombre: "Guanaco",
      info: "El guanaco es un camélido sudamericano que habita zonas áridas y frías.",
    },
    {
      src: "./imgs/cuyo/pudu.jfif",
      nombre: "Pudú",
      info: "El pudú es el ciervo más pequeño del mundo y vive en bosques densos.",
    },
  ],
  Patagonia: [
    {
      src: "./imgs/patagonica/condor.jfif",
      nombre: "Cóndor",
      info: "El cóndor andino es el ave voladora más grande de Sudamérica.",
    },
    {
      src: "./imgs/patagonica/huemul.jpg",
      nombre: "Huemul",
      info: "El huemul es un ciervo en peligro de extinción, símbolo nacional de Argentina.",
    },
    {
      src: "./imgs/patagonica/pinguino.jfif",
      nombre: "Pingüino",
      info: "El pingüino de Magallanes es típico de las costas patagónicas.",
    },
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
let imagenSeleccionada = null; // <-- Variable global

function iniciarNivel(nivel) {
  contenedor.innerHTML = "";
  seleccionada = null;
  nivelTexto.textContent = `Nivel: ${nivel}`;

  imagenSeleccionada = obtenerImagenParaRegion(region); // <-- Guardar imagen global
  if (!imagenSeleccionada) {
    alert("No hay imágenes disponibles para esta región.");
    return;
  }

  // Ocultar mensaje y botones al iniciar nivel
  document.getElementById("mensaje").style.display = "none";
  document.getElementById("btnNivel").style.display = "none";
  document.getElementById("btnContinuar").style.display = "none";
  document.getElementById("personaje").style.display = "flex";

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

    pieza.style.backgroundImage = `url('${imagenSeleccionada.src}')`;
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

  const mensaje = document.getElementById("mensaje");
  const btnNivel = document.getElementById("btnNivel");
  const btnContinuar = document.getElementById("btnContinuar");
  const infoAnimal = document.getElementById("infoAnimal");
  const BtnVolver = document.getElementById("boton-volver");

  if (completo) {
    document.getElementById("personaje").style.display = "none";

    mensaje.style.display = "flex";
    mensaje.querySelector("h2").textContent = "¡Nivel completado!";
    infoAnimal.textContent = `${imagenSeleccionada.nombre} : ${imagenSeleccionada.info}`;

    if (nivelActual < nivelMax) {
      mensaje.scrollIntoView({ behavior: "smooth" });
      btnNivel.style.display = "inline-block";
      btnContinuar.style.display = "none";
      btnNivel.textContent = "Siguiente nivel";
      btnNivel.onclick = function () {
        mensaje.style.display = "none";
        nivelActual++;
        iniciarNivel(nivelActual);
      };
    } else {
      btnNivel.style.display = "none";
      btnContinuar.style.display = "inline-block";
      btnContinuar.textContent = "Finalizar";
      BtnVolver.style.display = "none";
      btnContinuar.scrollIntoView({ behavior: "smooth" });
      btnContinuar.onclick = function () {
        mensaje.style.display = "none";
        irAlSiguienteJuego();
      };
    }
  }
}

// Cambiar de nivel solo cuando el usuario haga click en el botón
btnNivel.onclick = function () {
  mensaje.style.display = "none";
  if (nivelActual < nivelMax) {
    nivelActual++;
    iniciarNivel(nivelActual);
  } else {
    // Aquí va la lógica de fin de juego o pasar al siguiente minijuego
    irAlSiguienteJuego();
  }
};

function irAlSiguienteJuego() {
  const params = new URLSearchParams(window.location.search);
  const region = params.get("region");

  // Lista de minijuegos por región
  const juegosPorRegion = {
    Noroeste: ["./puzzzlee", "../encontrar/encontrar"],
    Noreste: ["./puzzzlee", "../encontrar/encontrar"],
    Cuyo: ["./puzzzlee", "../encontrar/encontrar"],
    Centro: ["./puzzzlee", "../encontrar/encontrar"],
    Patagonia: ["./puzzzlee", "../encontrar/encontrar"],
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
  const juegosRestantesNorm = juegosNorm.filter((j) => !jugados.includes(j));

  if (juegosRestantesNorm.length > 0) {
    // Ir al siguiente minijuego pendiente
    const nextNorm = juegosRestantesNorm[0];
    const idx = juegosNorm.indexOf(nextNorm);
    const siguientePath = juegosPaths[idx];

    // Remove the duplicate redirect code below - use only this one
    const target = new URL(
      siguientePath.endsWith(".html") ? siguientePath : `${siguientePath}.html`,
      window.location.href
    );
    target.searchParams.set("region", region);
    window.location.href =target.href;
  } else {
    // Si era el último, marcar región completada, sacar 3 monedas y dar 1 exp
    let progreso = JSON.parse(localStorage.getItem("progresoRegiones")) || {};
    if (!progreso[region]) {
      progreso[region] = true;
      localStorage.setItem("progresoRegiones", JSON.stringify(progreso));

      let monedas = parseInt(localStorage.getItem("monedas")) || 15;
      monedas = Math.max(0, monedas - 3);
      localStorage.setItem("monedas", monedas);
    }
    if (typeof desbloquearRegiones === "function") {
      desbloquearRegiones(region);
    }
    window.location.href = "./mapa-test.html";
  }
}

// Iniciar primer nivel al cargar
iniciarNivel(nivelActual);

document.getElementById("boton-volver").onclick = function () {
  window.location.href = "./mapa-test.html";
};
const btnContinuar = document.getElementById("btnContinuar");
document.getElementById("btnContinuar").onclick = function () {
  irAlSiguienteJuego();
};
if (btnContinuar) {
  btnContinuar.addEventListener("click", irAlSiguienteJuego);
}

function desbloquearRegiones(regionCompletada) {
  const estadoRegiones =
    JSON.parse(localStorage.getItem("estadoRegiones")) || {};

  const desbloqueoPorRegion = {
    Noreste: ["Cuyo"],
    Cuyo: ["Patagonia", "Noroeste"],
    Noroeste: [],
    Patagonia: ["Centro"],
    Centro: [],
  };

  const nuevas = desbloqueoPorRegion[regionCompletada] || [];
  nuevas.forEach((region) => {
    estadoRegiones[region] = true;
  });

  localStorage.setItem("estadoRegiones", JSON.stringify(estadoRegiones));
}
