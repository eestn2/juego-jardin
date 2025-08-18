function obtenerProgreso() {
  return JSON.parse(localStorage.getItem("progresoRegiones")) || {};
}

function guardarProgreso(progreso) {
  localStorage.setItem("progresoRegiones", JSON.stringify(progreso));
}

function obtenerJuegosCompletados() {
  return JSON.parse(localStorage.getItem("juegosCompletados")) || {};
}

function guardarJuegosCompletados(data) {
  localStorage.setItem("juegosCompletados", JSON.stringify(data));
}

function agregarMonedas(cantidad) {
  let monedas = parseInt(localStorage.getItem("monedas")) || 0;
  monedas += cantidad;
  localStorage.setItem("monedas", monedas);
}

function descontarMoneda() {
  let monedas = parseInt(localStorage.getItem("monedas")) || 0;
  if (monedas > 0) {
    monedas -= 1;
    localStorage.setItem("monedas", monedas);
  }
}

function desbloquearRegiones(regionCompletada) {
  const estadoRegiones =
    JSON.parse(localStorage.getItem("estadoRegiones")) || {};

  const desbloqueoPorRegion = {
    Centro: ["Noreste", "Cuyo"],
    Noreste: ["Noroeste"],
    Cuyo: ["Patagonia"],
    Noroeste: [],
    Patagonia: [],
  };

  const nuevas = desbloqueoPorRegion[regionCompletada] || [];
  nuevas.forEach((region) => {
    estadoRegiones[region] = true;
  });

  localStorage.setItem("estadoRegiones", JSON.stringify(estadoRegiones));
}
const region = obtenerRegionDesdeURL(); // o usá la variable que ya tengas

// Marcar como completado
const completados = obtenerJuegosCompletados();
if (!completados[region]) completados[region] = [];

const juegoActual = location.pathname.replace(".html", "");

if (!completados[region].includes(juegoActual)) {
  completados[region].push(juegoActual);
  guardarJuegosCompletados(completados);

  // ¿Ya están todos?
  const todos = juegosEsperadosPorRegion[region];
  if (completados[region].length >= todos.length) {
    const progreso = obtenerProgreso();
    progreso[region] = true;
    guardarProgreso(progreso);
    agregarMonedas(3);
    desbloquearRegiones(region);
    alert("¡Completaste la región y ganaste 3 monedas!");
  }
}
