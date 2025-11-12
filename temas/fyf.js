const infoPorRegion = {
  Noreste: {
    titulo: "Flora y Fauna del Noreste",
    texto: "Aquí hay una amplia variedad de animales, como el yaguarete, llamas, el osezno de anteojos, etc.",
    srcs: [
      "./imgs/NORTE(LUCIANA)/FAUNA-Y-FLORA/esta-uno.jpeg",
      "./imgs/NORTE(LUCIANA)/FAUNA-Y-FLORA/esta-dos.jpeg",
      "./imgs/NORTE(LUCIANA)/FAUNA-Y-FLORA/Osezno-de-anteojos.jfif",
    ],
  },
  Patagonia: {
    titulo: "Flora y Fauna de la Patagonia",
    texto: "Aquí hay liebres, plantas caracteristicas como la amancay, pumas, etc.",
    srcs: [
      "./imgs/patagonia(SOFIA-y-CANDELA)/FAUNA-Y-FLORA/liebre.png",
      "./imgs/patagonia(SOFIA-y-CANDELA)/FAUNA-Y-FLORA/planta-amancay.png",
      "./imgs/patagonia(SOFIA-y-CANDELA)/FAUNA-Y-FLORA/puma.png",

    ],
    audio: "./audios/fyf/patagonia.mp3",
  },
  Cuyo: {
    titulo: "Flora y Fauna de Cuyo",
    texto: "Aquí hay cactus, especies como guanacos, tuco-tuco, etc.",
    srcs: [
      "./imgs/cuyo(JULIANA)/FAUNA-Y-FLORA/flora.png",
      "./imgs/cuyo(JULIANA)/FAUNA-Y-FLORA/guanaco.jpg",
      "./imgs/cuyo(JULIANA)/FAUNA-Y-FLORA/tuco-tuco.jpg",
    ],
  },
  Centro: {
    titulo: "Flora y Fauna del Centro",
    texto: "Aquí encontraremos a animales como el coatí, el aguará guazú, el tuyuyu coral, etc.",
    srcs: [
      "./imgs/centro(AGUSTINA)/FAUNA-Y-FLORA/FAUNA/COATIS.jpg",
      "./imgs/centro(AGUSTINA)/FAUNA-Y-FLORA/FAUNA/aguara-guazu.jpg",
      "./imgs/centro(AGUSTINA)/FAUNA-Y-FLORA/FAUNA/Tuyuyu-coral.jpg",
    ],
  },
  Noroeste: {
    titulo: "Flora y Fauna del Noroeste",
    texto: "Aquí hay llamas, vicuñas, el cóndor andino etc.",
    srcs: [
      "./imgs/NORTE(LUCIANA)/FAUNA-Y-FLORA/llama1.jpeg",
      "./imgs/NORTE(LUCIANA)/FAUNA-Y-FLORA/vicunia.jpg",
      "./imgs/NORTE(LUCIANA)/FAUNA-Y-FLORA/descarga.jpg"
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
    // if (!visitados.includes("fauna-y-flora")) {
    //   visitados.push("fauna-y-flora");
    //   localStorage.setItem(key, JSON.stringify(visitados));
    // }
    let exp = parseInt(localStorage.getItem("exp")) || 0;
    exp += 1;
    localStorage.setItem("exp", exp);
    window.location.href = "../mapa-y-puzzle/mapa-test.html";
  };
}
