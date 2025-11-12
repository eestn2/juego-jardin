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


  //Habilitar region centro


  Object.entries(provincias).forEach(([id]) => {
    const el = svgDoc.getElementById(id);
    if (el) {
      el.style.cursor = "pointer";
      const region = provinciaARegion[id];

      // Solo deshabilitar regiones no desbloqueadas
      if (!estadoRegiones[region] ) {
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
        }
      });
      
      el.addEventListener("mouseover", () => {
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
        // Restaurar color original si la región no está completa
        if (region && !progreso[region]) {
          regiones[region].forEach((provId) => {
            const p = svgDoc.getElementById(provId);
            if (p) p.setAttribute("fill", p.dataset.originalColor || "#6f9c76", opacity = "1" );
          });
        }
        regionBox.style.display = "none";
      });

      el.addEventListener("click", () => {
        
        if (region) {
          const datosBox = document.querySelector(".region-datos");
          if (datosBox) {
            datosBox.querySelector(
              "p"
            ).textContent = `¡Estás explorando la región ${region}! Elige qué quieres descubrir:`;
            datosBox.style.display = "block";
            setTimeout(() => {
              datosBox.scrollIntoView({ behavior: "smooth" });
            }, 300);

            // Configurar botones de temas
            const temas = [
              "fauna-y-flora",
              "paisajes",
              "danzas",
              "recetas",
              "turismo",
              "pueblos-originarios",
            ];

            temas.forEach((tema) => {
              const btn = datosBox.querySelector(`.btn-${tema}`);

              if (btn) {
                btn.onclick = () => {
                  marcarTemaVisitado(tema, region);
                  btn.disabled = true;
                  chequeartemasVisitados(region);
                  window.location.href = `../temas/${tema}.html?region=${region}`,
                    "_blank";
                };
                // Verificar si el tema ya fue visitado
                const visitados = obtenerTemasVisitados(region);
                if (visitados.includes(tema)) {
                  btn.disabled = true;
                  btn.setAttribute("style", "background-color: green");
                } else {
                  btn.disabled = false;
                  btn.setAttribute("style", "");
                }
              }
            });

            // Verificar temas visitados para habilitar botón de jugar
            chequeartemasVisitados(region);

            // Configurar botón de jugar
            const btnJugar = datosBox.querySelector(".btn-jugar");
            if (btnJugar) {
              btnJugar.disabled = true; // Deshabilitado por defecto
              btnJugar.setAttribute("style", "background-color: red");

              if (obtenerTemasVisitados(region).length >= 6) {
                btnJugar.disabled = false;
                btnJugar.setAttribute("style", "");
              }
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

  function chequeartemasVisitados(region) {
    const visitados = obtenerTemasVisitados(region);
    const btnJugar = document.querySelector(".btn-jugar");
    if (btnJugar) {
      btnJugar.disabled = visitados.length < 6; // Habilitar si se visitaron todos los temas
    }
  }

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

//CAMBIAR ESTO A EXP
function agregarExp(cantidadexp) {
  let experiencia = parseInt(localStorage.getItem("exp")) || 0;
  experiencia += cantidadexp; // Sumar la cantidad recibida
  localStorage.setItem("exp", experiencia);
  actualizarContadorExp();
}
//AGREGAR ESTO Y MODIFICAR SI ES NECESARIO

function actualizarContadorExp() {
  const contadorExp = document.getElementById("contador-exp");
  if (contadorExp) {
    const exp = parseInt(localStorage.getItem("exp")) || 0;
    contadorExp.textContent = `${exp}`;
  }
}

function actualizarContadorMonedas() {
  const contador = document.getElementById("contador-monedas");
  if (contador) {
    const monedas = parseInt(localStorage.getItem("monedas")) || 15;
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
document.addEventListener("DOMContentLoaded", actualizarContadorExp);

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
// Guardar y obtener temas visitados
function marcarTemaVisitado(tema, region) {
  const key = `temasVisitados_${region}`;
  let temasVisitados = JSON.parse(localStorage.getItem(key)) || [];
  if (!temasVisitados.includes(tema)) {
    temasVisitados.push(tema);
    localStorage.setItem(key, JSON.stringify(temasVisitados));
  }
  return temasVisitados;
}
function obtenerTemasVisitados(region) {
  const key = `temasVisitados_${region}`;
  return JSON.parse(localStorage.getItem(key)) || [];
}


// Marcar región como completa y pintarla de verde
function marcarRegionComoCompleta(region, svgDoc, regiones) {
  regiones[region].forEach((provId) => {
    const p = svgDoc.getElementById(provId);
    if (p) p.setAttribute("fill", "green");
  });
}

// Mostrar mensaje de felicitación si todas las regiones están completas
function verificarMapaCompleto(regiones, _svgDoc) {
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
        localStorage.removeItem("exp");
        localStorage.removeItem("estadoRegiones");
        localStorage.removeItem("temasVisitados_Noreste");
        localStorage.removeItem("temasVisitados_Cuyo");
        localStorage.removeItem("temasVisitados_Noroeste");
        localStorage.removeItem("temasVisitados_Patagonia");
        localStorage.removeItem("temasVisitados_Centro");
        localStorage.removeItem("exp");
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

  // abrir/cerrar contenedor-info-botones al click en moneda o exp
  const iconMoneda = document.getElementById("Icono-moneda");
  const iconExp = document.getElementById("Icono-exp");
  const contenedorInfo = document.querySelector(".contenedor-info-botones");
  contenedorInfo.style.display = "none";
  function mostrarContenedor(visible) {
    if (!contenedorInfo) return;
    contenedorInfo.style.display = visible ? "flex" : "none";
  }

  function toggleContenedor() {
    if (!contenedorInfo) return;
    const isOpen = getComputedStyle(contenedorInfo).display !== "none";
    mostrarContenedor(!isOpen);
  }

  if (iconMoneda) iconMoneda.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleContenedor();
    
    contenedorInfo.querySelector("strong").textContent = `Monedas`;
    contenedorInfo.querySelector("span").textContent = `Se utilizan para viajar a otras regiones`;
  });
  if (iconExp) iconExp.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleContenedor();
    contenedorInfo.querySelector("strong").textContent = `Experiencia`;
    contenedorInfo.querySelector("span").textContent = `Se recibe experiencia cuando aprendes algo nuevo sobre una región`;
  });

  // Cerrar al click fuera del contenedor
  document.addEventListener("click", (e) => {
    if (!contenedorInfo) return;
    const target = e.target;
    if (
      getComputedStyle(contenedorInfo).display !== "none" &&
      !contenedorInfo.contains(target) &&
      target !== iconMoneda &&
      target !== iconExp
    ) {
      mostrarContenedor(false);
    }
  });

  // Cerrar con Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") mostrarContenedor(false);
  });
});
