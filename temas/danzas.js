const infoPorRegion = {
  Noreste: {
    titulo: "Danzas del Noreste",
    texto: "Aquí hay danzas como la chacarera, zamba, gato, etc.",
    srcs: [
      "./imgs/NORTE(LUCIANA)/DANZAS/uno.jpg",
      "./videos/danzas/noreste.mp4",
      "./imgs/NORTE(LUCIANA)/DANZAS/gato_tres.jpg",
    ],
  },

  Patagonia: {
    titulo: "Danzas de la Patagonia",
    texto: "Aquí hay danzas como la pericona, el chamamé patagónico, el chorrillero, etc.",
    srcs: [
      "./imgs/patagonia(SOFIA-y-CANDELA)/DANZAS/pericona.jpg",
      "./videos/danzas/patagonia.mp4",
      "./imgs/patagonia(SOFIA-y-CANDELA)/DANZAS/chorrillero.jpg",
    ],
    audio: "./audios/fyf/patagonia.mp3",
  },
  Cuyo: {
    titulo: "Danzas de Cuyo",
    texto: "Aquí hay danzas como la zamba cuyana, la cueca cuyana, escondido, etc.",
    srcs: [
      "./imgs/cuyo(JULIANA)/DANZAS/zamba.jpg",
      "./videos/danzas/cueca-Cuyana.mp4",
      "./imgs/cuyo(JULIANA)/DANZAS/Escondido.jpg",
    ],
  },
  Centro: {
    titulo: "Danzas del Centro",
    texto: "Aquí hay danzas como el gato, chamamé, la ranchera, etc.",
    srcs: [
      "./imgs/centro(AGUSTINA)/DANZAS/gato.jpg",
      "./videos/danzas/centro.mp4",
      "./imgs/centro(AGUSTINA)/DANZAS/ranchera.jpeg",
    ],
  },
  Noroeste: {
    titulo: "Danzas del Noroeste",
    texto: "Aquí hay danzas como la cueca, carnavalito, etc.",
    srcs: [
      "./imgs/NORTE(LUCIANA)/DANZAS/cueca.jpg",
      "./videos/danzas/Carnavalito.mp4",
      "./imgs/NORTE(LUCIANA)/DANZAS/gato_tres.jpg",
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

// Slider: asignar imágenes (los ids en tu HTML: imagen-uno, video, imagen-tres)
const slideImgs = [
  document.getElementById("imagen-uno"),
  document.getElementById("slide2").querySelector("video"),
  document.getElementById("imagen-tres"),
];

const srcs = info.srcs || [];
slideImgs.forEach((imgEl, idx) => {
  if (!imgEl) return;
  const li = imgEl.closest("li");
  if (srcs[idx]) {
    if (imgEl.tagName === "VIDEO") {
      imgEl.src = srcs[idx];
    } else {
      imgEl.src = srcs[idx];
    }
    if (li) li.style.display = ""; // asegurar que se muestre
  } else {
    // no hay imagen: ocultar la diapositiva
    if (li) li.style.display = "none";
  }
});

// audio (por hacer)
if (info.audio) {
  // ejemplo: colocar atributo data-audio o crear un reproductor
  // document.getElementById("audio-btn").dataset.src = info.audio;
}

// volver al mapa: sumar 1 a "temas visitados" localStorage
const btnVolver = document.getElementById("btn-volver");
if (btnVolver) {
  btnVolver.onclick = () => {
    let exp = parseInt(localStorage.getItem("exp")) || 0;
    exp += 1;
    localStorage.setItem("exp", exp);
    window.location.href = "../mapa-y-puzzle/mapa-test.html";
  };
}
