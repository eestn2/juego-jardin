const infoPorRegion = {
  Noreste: {
    titulo: "Turismo del Noreste",
    texto:
      "Aquí hay un reconocido tren llamado 'Tren del cielo', que atraviesa paisajes impresionantes.",
    srcs: [
      "./imgs/NORTE(LUCIANA)/TURISMO/esta-uno.jpeg",
      "./imgs/NORTE(LUCIANA)/TURISMO/esta-dos.jpeg",
      "./imgs/NORTE(LUCIANA)/TURISMO/este-tres.jpeg",
    ],
  },
  Patagonia: {
    titulo: "Turismo de la Patagonia",
    texto:
      "Aquí está el parque nacional Huapi, bariloche y su Centro Cívico, etc.",
    srcs: [
      "./imgs/patagonia(SOFIA-y-CANDELA)/TURISMO/este.png",
      "./imgs/patagonia(SOFIA-y-CANDELA)/TURISMO/esti.png",
      "./imgs/patagonia(SOFIA-y-CANDELA)/TURISMO/esta.png",
    ],
    audio: "./audios/fyf/patagonia.mp3",
  },
  Cuyo: {
    titulo: "Turismo de Cuyo",
    texto:
      "Aquí se destaca principalmente el enoturismo (rutas del vino, visitas a bodegas) y el turismo de aventura como rafting, rappel y cabalgatas.",
    srcs: [
      "./imgs/cuyo(JULIANA)/TURISMO/enoturismo.jpg",
      "./imgs/cuyo(JULIANA)/TURISMO/rafting.jpg",
      "./imgs/cuyo(JULIANA)/TURISMO/cabalgatas.jpg",
    ],
  },
  Centro: {
    titulo: "Turismo del Centro",
    texto:
      "Aquí encontramos el Parque Nacional Iguazú, en Córdoba ofrecen paseos por las Sierras o conocer el pajaro cucú, en VCP",
    srcs: [
      "./imgs/centro(AGUSTINA)/TURISMO/PARQUENACIONAL/parque-Iguazu.jpg",
      "./imgs/centro(AGUSTINA)/TURISMO/treking.jpg",
      "./imgs/centro(AGUSTINA)/TURISMO/cucu.jpg",
    ],
  },
  Noroeste: {
    titulo: "Turismo del Noroeste",
    texto: "Aquí se ofrece un turismo con atractivos como la Quebrada de Humahuaca (Jujuy) y la ciudad de Salta",
    srcs: [
      "./imgs/NORTE(LUCIANA)/TURISMO/humahuaca.jpg",
      "./imgs/NORTE(LUCIANA)/TURISMO/humahuaca2.jpg",
      "./imgs/NORTE(LUCIANA)/TURISMO/salta.jpg"
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
    // if (!visitados.includes("TURISMO")) {
    //   visitados.push("TURISMO");
    //   localStorage.setItem(key, JSON.stringify(visitados));
    // }
    let exp = parseInt(localStorage.getItem("exp")) || 0;
    exp += 1;
    localStorage.setItem("exp", exp);
    window.location.href = "../mapa-y-puzzle/mapa-test.html";
  };
}
