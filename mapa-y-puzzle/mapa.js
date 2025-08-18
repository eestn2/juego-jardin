document.getElementById("mapa").addEventListener("load", function () {
  const progreso = JSON.parse(localStorage.getItem("progresoRegiones")) || {};

  const svgDoc = this.contentDocument;

  const regionBox = document.getElementById("region-info");
  const regionTitle = document.getElementById("region-title");
  const regionProvincias = document.getElementById("region-provincias");

  const provincias = {
    ARA: "Salta",
    ARB: "Buenos Aires",
    ARC: "Ciudad de Bs As",
    ARD: "San Luis",
    ARE: "Entre Rios",
    ARF: "La Rioja",
    ARG: "Santiago del Estero",
    ARH: "Chaco",
    ARJ: "San Juan",
    ARK: "Catamarca",
    ARL: "La Pampa",
    ARM: "Mendoza",
    ARN: "Misiones",
    ARP: "Formosa",
    ARQ: "Neuquén",
    ARR: "Río Negro",
    ARS: "Santa Fe",
    ART: "Tucumán",
    ARU: "Chubut",
    ARV: "Tierra del Fuego",
    ARW: "Corrientes",
    ARX: "Córdoba",
    ARY: "Jujuy",
    ARZ: "Santa Cruz",
  };

  const regiones = {
    Noroeste: ["ARA", "ARY", "ART", "ARK", "ARF", "ARG"],
    Noreste: ["ARH", "ARW", "ARP", "ARN"],
    Cuyo: ["ARJ", "ARM", "ARD"],
    Centro: ["ARB", "ARC", "ARX", "ARS", "ARL", "ARE"],
    Patagonia: ["ARQ", "ARR", "ARU", "ARZ", "ARV"],
  };
  // Estado de regiones desbloqueadas
  let estadoRegiones = JSON.parse(localStorage.getItem("estadoRegiones")) || {
    Centro: true,
    Noreste: false,
    Cuyo: false,
    Noroeste: false,
    Patagonia: false,
  };
  // Colores para cada región
  const coloresRegion = {
    Noroeste: "#e74c3c",
    Noreste: "#27ae60",
    Cuyo: "#8e44ad",
    Centro: "#0099ffff", // Azul claro
    Patagonia: "#DB35A9",
  };

  // Juegos por región
  const juegosPorRegion = {
    Noroeste: ["./puzzzlee", "../mini_juego_jardin_lugar/lugar"],
    Noreste: ["./puzzzlee", "../mini_juego_jardin_lugar/lugar"],
    Cuyo: ["./puzzzlee", "../mini_juego_jardin_encontrar_al_animal/encontrar"],
    Centro: [
      "./puzzzlee",
      "../mini_juego_jardin_encontrar_al_animal/encontrar",
    ],
    Patagonia: ["./puzzzlee", "../mini_juego_jardin_lugar/lugar"],
  };

  // 🔓 Desbloquear automáticamente la región Centro si no hay progreso
  if (!localStorage.getItem("regionesDesbloqueadas")) {
    localStorage.setItem("regionesDesbloqueadas", JSON.stringify(["Centro"]));
  } else {
    const desbloqueadas = JSON.parse(
      localStorage.getItem("regionesDesbloqueadas")
    );
    if (desbloqueadas.length === 0) {
      localStorage.setItem("regionesDesbloqueadas", JSON.stringify(["Centro"]));
    }
  }

  const provinciaARegion = {};
  Object.entries(regiones).forEach(([region, provs]) => {
    provs.forEach((id) => (provinciaARegion[id] = region));
  });

  Object.entries(provincias).forEach(([id, nombre]) => {
    const el = svgDoc.getElementById(id);
    if (el) {
      el.style.cursor = "pointer";
      const region = provinciaARegion[id];
      if (!estadoRegiones[region]) {
        el.style.opacity = "0.5";
        el.style.pointerEvents = "none";
      }
      const color = coloresRegion[region] || "#6f9c76";

      el.setAttribute("fill", color);
      el.dataset.originalColor = color;

      el.addEventListener("mouseenter", () => {
        if (region && !progreso[region]) {
          regiones[region].forEach((provId) => {
            const p = svgDoc.getElementById(provId);
            if (p) p.setAttribute("fill", "#f1c40f");
          });

          const provNombres = regiones[region]
            .map((pid) => provincias[pid])
            .join(", ");
          regionTitle.textContent = region;
          regionProvincias.textContent = provNombres;
          regionBox.style.display = "block";
        }
      });

      el.addEventListener("mouseleave", () => {
        if (region && !progreso[region]) {
          regiones[region].forEach((provId) => {
            const p = svgDoc.getElementById(provId);
            if (p) p.setAttribute("fill", p.dataset.originalColor || "#6f9c76");
          });
        }

        regionBox.style.display = "none";
      });

      el.addEventListener("click", () => {
        if (region) {
          if (progreso[region] === true) {
            alert(`Ya completaste la región "${region}".`);
            return;
          }

          const confirmacionBox = document.getElementById("confirmacion");
          const mensaje = document.getElementById("mensaje-confirmacion");
          const nmrCorrecto = document.getElementById("nmr-correcto");
          const nmrIncorrecto = document.getElementById("nmr-incorrecto");

          if (region === "Centro") {
            // Saltar la verificación de monedas
            const juegos = juegosPorRegion[region];
            const jugados = obtenerJuegosCompletados()[region] || [];
            const juegosRestantes = juegos.filter((j) => !jugados.includes(j));

            if (juegosRestantes.length > 0) {
              localStorage.setItem("regionActual", region);
              const juegoAleatorio =
                juegosRestantes[
                  Math.floor(Math.random() * juegosRestantes.length)
                ];

              // NO marcar como jugado aquí

              window.location.href = `${juegoAleatorio}.html?region=${encodeURIComponent(
                region
              )}`;
            } else {
              alert("Ya completaste todos los minijuegos de esta región.");
            }
          } else {
            // Procedimiento normal con resta de monedas
            const precioRegion = Math.floor(Math.random() * 3) + 3;
            const monedasActuales =
              parseInt(localStorage.getItem("monedas")) || 0;
            const resultadoCorrecto = monedasActuales - precioRegion;

            mensaje.textContent = `La región "${region}" cuesta ${precioRegion} monedas y tienes ${monedasActuales} monedas. ¿Cuántas monedas te quedarían?`;

            nmrCorrecto.textContent = resultadoCorrecto;
            nmrIncorrecto.textContent =
              resultadoCorrecto + (Math.random() < 0.5 ? 1 : -1);
            confirmacionBox.style.display = "block";

            nmrCorrecto.onclick = () => {
              restarMonedas(precioRegion);
              actualizarContadorMonedas();
              // ... resto del flujo original ...
            };

            nmrIncorrecto.onclick = () => {
              mensaje.textContent = "Número incorrecto, prueba de nuevo.";
            };
          }

          // Asignar valores a botones
          nmrCorrecto.textContent = resultadoCorrecto;
          nmrIncorrecto.textContent =
            resultadoCorrecto + (Math.random() < 0.5 ? 1 : -1);

          confirmacionBox.style.display = "block";

          nmrCorrecto.onclick = () => {
            // Restar el costo real
            restarMonedas(precioRegion);
            actualizarContadorMonedas();

            const juegos = juegosPorRegion[region];
            const jugados = obtenerJuegosCompletados()[region] || [];
            const juegosRestantes = juegos.filter((j) => !jugados.includes(j));

            if (juegosRestantes.length > 0) {
              localStorage.setItem("regionActual", region);
              const juegoAleatorio =
                juegosRestantes[
                  Math.floor(Math.random() * juegosRestantes.length)
                ];

              // Guardar como jugado
              const completados = obtenerJuegosCompletados();
              completados[region] = [...jugados, juegoAleatorio];
              guardarJuegosCompletados(completados);

              // Verificar si se completaron todos
              if (completados[region].length >= juegos.length) {
                const progreso = obtenerProgreso();
                progreso[region] = true;
                guardarProgreso(progreso);
                agregarMonedas(3);
                desbloquearRegiones(region);
              }

              window.location.href = `${juegoAleatorio}.html?region=${encodeURIComponent(
                region
              )}`;
            } else {
              alert("Ya completaste todos los minijuegos de esta región.");
            }
          };

          nmrIncorrecto.onclick = () => {
            mensaje.textContent = "Número incorrecto, prueba de nuevo.";
          };

          confirmacionBox.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  });
  // Verificar qué regiones ya están completas al cargar el mapa
  const progresoActual = obtenerProgreso();

  Object.keys(progresoActual).forEach((regionNombre) => {
    if (progresoActual[regionNombre] === true) {
      marcarRegionComoCompleta(regionNombre, svgDoc, regiones);
    }
  });

  // Verificar si todo el mapa ya fue completado
  verificarMapaCompleto(regiones, svgDoc);
});

// --- NUEVO CÓDIGO PARA GESTIÓN DE PROGRESO ---

// Cada región tiene 3 niveles. El progreso se guarda por región.
function obtenerProgreso() {
  const progreso = JSON.parse(localStorage.getItem("progresoRegiones")) || {};
  return progreso;
}

function guardarProgreso(progreso) {
  localStorage.setItem("progresoRegiones", JSON.stringify(progreso));
}

function agregarMonedas(cantidad) {
  let monedas = parseInt(localStorage.getItem("monedas")) || 0;
  monedas += cantidad;
  localStorage.setItem(monedas);
  actualizarContadorMonedas();
}

function actualizarContadorMonedas() {
  const contador = document.getElementById("contador-monedas");
  if (contador) {
    const monedas = parseInt(localStorage.getItem("monedas")) || 0;
    contador.textContent = `${monedas}`;
  }
}

function restarMonedas(cantidad) {
  let monedas = parseInt(localStorage.getItem("monedas")) || 0;
  monedas = Math.max(0, monedas - cantidad); // evitar negativos
  localStorage.setItem("monedas", monedas);
  actualizarContadorMonedas();
}

// Al cargar el mapa, actualiza el contador de monedas
document.addEventListener("DOMContentLoaded", actualizarContadorMonedas);

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
// Marcar región como completa y pintarla de verde
function marcarRegionComoCompleta(regionNombre, svgDoc, regiones) {
  regiones[regionNombre].forEach((provId) => {
    const p = svgDoc.getElementById(provId);
    if (p) p.setAttribute("fill", "green");
  });
}

// Mostrar mensaje de felicitación si todas las regiones están completas
function verificarMapaCompleto(regiones, svgDoc) {
  const progreso = obtenerProgreso();
  const regionesCompletas = Object.keys(regiones).every(
    (r) => progreso[r] === true
  );

  if (regionesCompletas) {
    alert("¡Felicitaciones! Completaste todas las regiones del mapa.");
  }
}

function obtenerJuegosCompletados() {
  return JSON.parse(localStorage.getItem("juegosCompletados")) || {};
}

function guardarJuegosCompletados(data) {
  localStorage.setItem("juegosCompletados", JSON.stringify(data));
}

document.addEventListener("DOMContentLoaded", () => {
  const btnReiniciar = document.getElementById("btn-reiniciar");
  if (btnReiniciar) {
    btnReiniciar.addEventListener("click", () => {
      const confirmar = confirm(
        "¿Estás seguro de que querés reiniciar el progreso?"
      );
      if (confirmar) {
        localStorage.removeItem("progresoRegiones");
        localStorage.removeItem("juegosCompletados");
        localStorage.removeItem("monedas");
        localStorage.removeItem("estadoRegiones");
        localStorage.setItem("monedas", "0");
        localStorage.setItem(
          "regionesDesbloqueadas",
          JSON.stringify(["Centro"])
        );
        window.location.reload();
      }
    });
  }
});
btnConfirmar.onclick = () => {
  const juegos = juegosPorRegion[region];
  const jugados = obtenerJuegosCompletados()[region] || [];

  const juegosRestantes = juegos.filter((j) => !jugados.includes(j));

  if (juegosRestantes.length > 0) {
    localStorage.setItem("regionActual", region);

    const juegoAleatorio =
      juegosRestantes[Math.floor(Math.random() * juegosRestantes.length)];

    // Guardar como "jugado"
    const completados = obtenerJuegosCompletados();
    completados[region] = [...jugados, juegoAleatorio];
    guardarJuegosCompletados(completados);

    // Verificar si se completaron todos
    if (completados[region].length >= juegos.length) {
      const progreso = obtenerProgreso();
      progreso[region] = true;
      guardarProgreso(progreso);
      agregarMonedas(3); // <--- Agrega monedas al completar la región
    }

    descontarMoneda(); // <--- Descuenta moneda al entrar a un minijuego

    window.location.href = `${juegoAleatorio}.html?region=${encodeURIComponent(
      region
    )}`;
  } else {
    alert("Ya completaste todos los minijuegos de esta región.");
  }
};
