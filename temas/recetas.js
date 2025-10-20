const infoPorRegion = {
  Noreste: {
    titulo: "Recetas del Noreste",
    texto: "Aquí hay recetas conocidas como la humita, el tamal, el chipá, etc..",
    srcs: [
      "./imgs/NORTE(LUCIANA)/RECETAS/Humita.jpg",
      "./imgs/NORTE(LUCIANA)/RECETAS/tamales.jpg",
      "./imgs/NORTE(LUCIANA)/RECETAS/chipa.jpg",
    ],
  },
  Patagonia: {
    titulo: "Recetas de la Patagonia",
    texto: "Aquí hay guanacos, ñandúes, etc.",
    srcs: [
      "./imgs/PATAGONIA/RECETAS/ejemplo1.jpg",
      "./imgs/PATAGONIA/RECETAS/ejemplo2.jpg",
    ],
    audio: "./audios/fyf/patagonia.mp3",
  },
  Cuyo: {
    titulo: "Recetas de Cuyo",
    texto: "Aquí hay cactus, cóndores, etc.",
    srcs: [
      "./imgs/CUYO/RECETAS/ejemplo1.jpg",
      "./imgs/CUYO/RECETAS/ejemplo2.jpg",
      "./imgs/CUYO/RECETAS/ejemplo3.jpg",
    ],
  },
  Centro: {
    titulo: "Recetas del Centro",
    texto: "Info del centro...",
    srcs: [],
  },
  Noroeste: {
    titulo: "Recetas del Noroeste",
    texto: "Aquí hay alpacas, vicuñas, etc.",
    srcs: [
      "./imgs/NORTE(LUCIANA)/RECETAS/esta-uno.jpeg",
      "./imgs/NORTE(LUCIANA)/RECETAS/esta-dos.jpeg",
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
