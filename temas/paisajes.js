const infoPorRegion = {
  Noreste: {
    titulo: "Paisajes del Noreste",
    texto: "Aquí hay paisajes desérticos de gran altura, valles y quebradas y muchas más cosas.",
    srcs: [
      "./imgs/NORTE(LUCIANA)/PAISAJES/esta-uno.jpeg",
      "./imgs/NORTE(LUCIANA)/PAISAJES/esta-dos.jpeg",
      "./imgs/NORTE(LUCIANA)/PAISAJES/esta-3.jpeg",
    ],
  },
  Patagonia: {
    titulo: "Paisajes de la Patagonia",
    texto: "Aquí hay guanacos, ñandúes, etc.",
    srcs: [
      "./imgs/PATAGONIA/FAUNA/ejemplo1.jpg",
      "./imgs/PATAGONIA/FAUNA/ejemplo2.jpg",
    ],
    audio: "./audios/fyf/patagonia.mp3",
  },
  Cuyo: {
    titulo: "Paisajes de Cuyo",
    texto: "Aquí hay cactus, cóndores, etc.",
    srcs: [
      "./imgs/CUYO/FAUNA/ejemplo1.jpg",
      "./imgs/CUYO/FAUNA/ejemplo2.jpg",
      "./imgs/CUYO/FAUNA/ejemplo3.jpg",
    ],
  },
  Centro: {
    titulo: "Paisajes del Centro",
    texto: "Info del centro...",
    srcs: [],
  },
  Noroeste: {
    titulo: "Paisajes del Noroeste",
    texto: "Aquí hay alpacas, vicuñas, etc.",
    srcs: [
      "./imgs/NORTE(LUCIANA)/PAISAJES/ESTA-CUATRO.jpeg",
      "./imgs/NORTE(LUCIANA)/PAISAJES/esta-cinco.jpeg",
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
    let exp = parseInt(localStorage.getItem("exp")) || 0;
    exp += 1;
    localStorage.setItem("exp", exp);
    window.location.href = "../mapa-y-puzzle/mapa-test.html";
  };
}
