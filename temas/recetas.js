const infoPorRegion = {
  Noreste: {
    titulo: "Recetas del Noreste",
    texto: "Aquí hay recetas conocidas como la humita, el tamal, el chipá, etc.",
    srcs: [
      "./imgs/NORTE(LUCIANA)/RECETAS/Humita.jpg",
      "./imgs/NORTE(LUCIANA)/RECETAS/tamales.jpg",
      "./imgs/NORTE(LUCIANA)/RECETAS/chipa.jpg",
    ],
  },
  Patagonia: {
    titulo: "Recetas de la Patagonia",
    texto: "Aquí suelen preparar trucha al limón con papines andinos pisados, cordero al asador, curanto, etc.",
    srcs: [
      "./imgs/patagonia(SOFIA-y-CANDELA)/RECETAS/trucha.png",
      "./imgs/patagonia(SOFIA-y-CANDELA)/RECETAS/cordero.png",
      "./imgs/patagonia(SOFIA-y-CANDELA)/RECETAS/curanto.png",
    ],
    audio: "./audios/fyf/patagonia.mp3",
  },
  Cuyo: {
    titulo: "Recetas de Cuyo",
    texto: "Aquí se acostumbra a comer Tomaticán Cuyano, Tortitas mendocinas,sancocho de gallina, etc.",
    srcs: [
      "./imgs/cuyo(JULIANA)/RECETAS/tomatican.jpg",
      "./imgs/cuyo(JULIANA)/RECETAS/tortitas.jpg",
      "./imgs/cuyo(JULIANA)/RECETAS/sancocho.jpg",
    ],
  },
  Centro: {
    titulo: "Recetas del Centro",
    texto: "Las recetas características de esta región son el asado por la influencia ganadera, pastas, milanesas y empanadas debido a la inmigración italiana y española",
    srcs: [
      "./imgs/centro(AGUSTINA)/RECETAS/asado.jpg",
      "./imgs/centro(AGUSTINA)/RECETAS/pastas.jpg",
      "./imgs/centro(AGUSTINA)/RECETAS/milanesas-empanadas.jpg",
    ],
  },
  Noroeste: {
    titulo: "Recetas del Noroeste",
    texto: "Aquí se suele preparar empanadas cortadas a cuchillo con papa y verdeo, carbonada, pastel de Cambray",
    srcs: [
      "./imgs/NORTE(LUCIANA)/RECETAS/empanadas.jpg",
      "./imgs/NORTE(LUCIANA)/RECETAS/carbonada.jpg",
      "./imgs/NORTE(LUCIANA)/RECETAS/pastel.jpg"
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
    // if (!visitados.includes("RECETAS")) {
    //   visitados.push("RECETAS");
    //   localStorage.setItem(key, JSON.stringify(visitados));
    // }
    let exp = parseInt(localStorage.getItem("exp")) || 0;
    exp += 1;
    localStorage.setItem("exp", exp);
    window.location.href = "../mapa-y-puzzle/mapa-test.html";
  };
}
