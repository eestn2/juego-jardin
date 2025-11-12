const infoPorRegion = {
  Noreste: {
    titulo: "Pueblos orignarios del Noreste",
    texto: "Aquí se pueden encontrar Guaraníes, Tobas (Qom), Wichís, entre muchos otros ",
    srcs: [
      "./imgs/NORTE(LUCIANA)/PUEBLOS-ORIGINARIOS/Guarani.jpg",
      "./imgs/NORTE(LUCIANA)/PUEBLOS-ORIGINARIOS/tobas.jpg",
      "./imgs/NORTE(LUCIANA)/PUEBLOS-ORIGINARIOS/wichis_1.jpg",
    ],
  },
  Patagonia: {
    titulo: "Pueblos orignarios de la Patagonia",
    texto: "Aquí están los originarios tehuelches",
    srcs: [
      "./imgs/patagonia(SOFIA-y-CANDELA)/PUEBLOS-ORIGINARIOS/tehuelches.png",
      "./imgs/patagonia(SOFIA-y-CANDELA)/PUEBLOS-ORIGINARIOS/tehuelche2.png",
      "./imgs/patagonia(SOFIA-y-CANDELA)/PUEBLOS-ORIGINARIOS/tehuelches3.png"
    ],
    audio: "./audios/fyf/patagonia.mp3",
  },
  Cuyo: {
    titulo: "Pueblos orignarios de Cuyo",
    texto: "Aquí hay diaguitas, capayanes, pehuenches etc.",
    srcs: [
      "./imgs/cuyo(JULIANA)/PUEBLO-ORIGINARIO/diaguitas.png",
      "./imgs/cuyo(JULIANA)/PUEBLO-ORIGINARIO/capayanes.png",
      "./imgs/cuyo(JULIANA)/PUEBLO-ORIGINARIO/pehuenches.png",
    ],
  },
  Centro: {
    titulo: "Pueblos orignarios del Centro",
    texto: "Aquí se pueden encontrar comechingones, sanavirones, ranqueles, entre otros ",
    srcs: [
      "./imgs/centro(AGUSTINA)/PUEBLOS-ORIGINARIOS/comechingones.jpg",
      "./imgs/centro(AGUSTINA)/PUEBLOS-ORIGINARIOS/sanavirones.jpg",
      "./imgs/centro(AGUSTINA)/PUEBLOS-ORIGINARIOS/ranqueles.jpg",
    ],
  },
  Noroeste: {
    titulo: "Pueblos orignarios del Noroeste",
    texto: "Aquí se pueden encontrar Kollas, Diaguitas y Diaguitas-Calchaquíes entre muchos otros ",
    srcs: [
      "./imgs/NORTE(LUCIANA)/PUEBLOS-ORIGINARIOS/kollas.jpg",
      "./imgs/NORTE(LUCIANA)/PUEBLOS-ORIGINARIOS/diaguitas.jpg",
      "./imgs/NORTE(LUCIANA)/PUEBLOS-ORIGINARIOS/diaguitas2.jpg"
    ],
  },
};

const params = new URLSearchParams(window.location.search);
const region = params.get("region");
const info = infoPorRegion[region] || infoPorRegion["Noreste"];

// Título / texto
const tituloDiv = document.getElementById("titulo");
if (tituloDiv) tituloDiv.innerHTML = `<h1>${info.titulo}</h1>`;
const infoP = document.getElementById("info");
if (infoP) infoP.textContent = info.texto;

// Slider: asignar imágenes (los ids en tu HTML: imagen-uno, imagen-dos, imagen-tres)
const slideImgs = [
  document.getElementById("imagen-uno"),
  document.getElementById("imagen-dos"),
  document.getElementById("imagen-tres"),
];

const srcs = info.srcs || [];
slideImgs.forEach((imgEl, idx) => {
  if (!imgEl) return;
  const li = imgEl.closest("li");
  if (srcs[idx]) {
    imgEl.src = srcs[idx];
    if (li) li.style.display = ""; // asegurar que se muestre
  } else {
    // no hay imagen: ocultar la diapositiva
    if (li) li.style.display = "none";
    
  }
});


// audio (si lo tuvieras)
if (info.audio) {
  // ejemplo: colocar atributo data-audio o crear un reproductor
  // document.getElementById("audio-btn").dataset.src = info.audio;
}

// volver al mapa: sumar 1 a "temas visitados" local (si querés)
const btnVolver = document.getElementById("btn-volver");
if (btnVolver) {
  btnVolver.onclick = () => {
    // opcional: marcar tema visitado en localStorage
    // const key = `temasVisitados_${region}`;
    // let visitados = JSON.parse(localStorage.getItem(key)) || [];
    // if (!visitados.includes("PUEBLOS-ORIGINARIOS")) {
    //   visitados.push("PUEBLOS-ORIGINARIOS");
    //   localStorage.setItem(key, JSON.stringify(visitados));
    // }
    let exp = parseInt(localStorage.getItem("exp")) || 0;
    exp += 1;
    localStorage.setItem("exp", exp);
    window.location.href = "../mapa-y-puzzle/mapa-test.html";
  };
}
