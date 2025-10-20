const infoPorRegion = {
  Noreste: {
    titulo: "Danzas del Noreste",
    texto: "Aquí hay danzas como la chacarera, zamba, gato, etc.",
    srcs: [
      "./imgs/NORTE(LUCIANA)/DANZAS/uno.jpg",
      "./imgs/NORTE(LUCIANA)/DANZAS/zamba_dos.jpg",
      "./imgs/NORTE(LUCIANA)/DANZAS/gato_tres.jpg",
    ],
  },
  Patagonia: {
    titulo: "Danzas de la Patagonia",
    texto: "Aquí hay guanacos, ñandúes, etc.",
    srcs: [
      "./imgs/PATAGONIA/FAUNA/ejemplo1.jpg",
      "./imgs/PATAGONIA/FAUNA/ejemplo2.jpg",
    ],
    audio: "./audios/fyf/patagonia.mp3",
  },
  Cuyo: {
    titulo: "Danzas de Cuyo",
    texto: "Aquí hay cactus, cóndores, etc.",
    srcs: [
      "./imgs/CUYO/FAUNA/ejemplo1.jpg",
      "./imgs/CUYO/FAUNA/ejemplo2.jpg",
      "./imgs/CUYO/FAUNA/ejemplo3.jpg",
    ],
  },
  Centro: {
    titulo: "Danzas del Centro",
    texto: "Info del centro...",
    srcs: [],
  },
  Noroeste: {
    titulo: "Danzas del Noroeste",
    texto: "Aquí hay alpacas, vicuñas, etc.",
    srcs: [
      "./imgs/NORTE(LUCIANA)/DANZAS/esta-uno.jpeg",
      "./imgs/NORTE(LUCIANA)/DANZAS/esta-dos.jpeg",
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
    // if (!visitados.includes("DANZAS")) {
    //   visitados.push("DANZAS");
    //   localStorage.setItem(key, JSON.stringify(visitados));
    // }
    let exp = parseInt(localStorage.getItem("exp")) || 0;
    exp += 1;
    localStorage.setItem("exp", exp);
    window.location.href = "../mapa-y-puzzle/mapa-test.html";
  };
}
