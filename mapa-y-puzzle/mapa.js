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
    Centro: false,
    Noreste: true,
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
    Noroeste: ["./puzzzlee.html", "../encontrar/encontrar.html"],
    Noreste: ["./puzzzlee.html", "../encontrar/encontrar.html"],
    Cuyo: ["./puzzzlee.html", "../encontrar/encontrar.html"],
    Centro: ["../encontrar/encontrar.html", "./puzzzlee.html"],
    Patagonia: ["./puzzzlee.html", "../encontrar/encontrar.html"],
  };

  const provinciaARegion = {};
  Object.entries(regiones).forEach(([region, provs]) => {
    provs.forEach((id) => (provinciaARegion[id] = region));
  });

  Object.entries(provincias).forEach(([id]) => {
    const el = svgDoc.getElementById(id);
    if (el) {
      el.style.cursor = "pointer";
      const region = provinciaARegion[id];

      // Solo deshabilitar regiones no desbloqueadas, excepto Centro
      if (!estadoRegiones[region] && region !== "Centro") {
        el.style.opacity = "0.5";
        el.style.pointerEvents = "none";
      }

      const color = coloresRegion[region] || "#6f9c76";
      el.setAttribute("fill", color);
      el.dataset.originalColor = color;

      el.addEventListener("click", () => {
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

          if (region === "Centro") {
            regionProvincias.textContent =
              "En esta región vivimos, ¡viajemos a conocer otras!";
          }
        }
      });

      el.addEventListener("mouseleave", () => {
        // Restaurar color original si la región no está completa
        if (region && !progreso[region]) {
          regiones[region].forEach((provId) => {
            const p = svgDoc.getElementById(provId);
            if (p) p.setAttribute("fill", p.dataset.originalColor || "#6f9c76");
          });
        }
        regionBox.style.display = "none";
      });

      el.addEventListener("click", () => {
        // Solo permitir abrir el menú si NO es Centro
        if (region && region !== "Centro") {
          const datosBox = document.querySelector(".region-datos");
          if (datosBox) {
            datosBox.querySelector(
              "p"
            ).textContent = `¡Estás explorando la región ${region}! Elige qué quieres descubrir:`;
            datosBox.style.display = "block";
            setTimeout(() => {
              datosBox.scrollIntoView({ behavior: "smooth" });
            }, 300);
            // Configurar botón de jugar
            const btnJugar = datosBox.querySelector(".btn-jugar");
            if (btnJugar) {
              btnJugar.onclick = () => {
                const juegos = juegosPorRegion[region];
                if (juegos && juegos.length > 0) {
                  const juegosCompletados = obtenerJuegosCompletados();
                  const juegosNoCompletados = juegos.filter(
                    (j) => !juegosCompletados[j]
                  );
                  if (juegosNoCompletados.length === 0) {
                    alert("¡Ya completaste todos los juegos de esta región!");
                    return;
                  }
                  const juegoAleatorio =
                    juegosNoCompletados[
                      Math.floor(Math.random() * juegosNoCompletados.length)
                    ];
                  window.location.href = `${juegoAleatorio}?region=${region}`;
                } else {
                  alert("No hay juegos disponibles para esta región.");
                }
              };
            }
          }
        }
      });
    }
  });
  // Verificar qué regiones ya están completas al cargar el mapa
  const progresoActual = obtenerProgreso();

  Object.keys(progresoActual).forEach((region) => {
    if (progresoActual[region] === true) {
      marcarRegionComoCompleta(region, svgDoc, regiones);
    }
  });

  // Verificar si todo el mapa ya fue completado
  verificarMapaCompleto(regiones, svgDoc, progresoActual);
});

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
  localStorage.setItem("monedas", monedas);
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
// Marcar región como completa y pintarla de verde
function marcarRegionComoCompleta(region, svgDoc, regiones) {
  regiones[region].forEach((provId) => {
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
  const btnCancelar = document.querySelector(".cerrar");
  const datosBox = document.querySelector(".region-datos");
  if (btnCancelar && datosBox) {
    btnCancelar.addEventListener("click", () => {
      datosBox.style.display = "none";
    });
  }
});
