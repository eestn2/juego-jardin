const infoPorRegion = {
  Noreste: {
    titulo: "Turismo del Noreste",
    texto: "Aquí hay selvas, yacarés, etc.",
    imagen: "noreste.jpg",
  },
  Patagonia: {
    titulo: "Turismo de la Patagonia",
    texto: "Aquí hay guanacos, ñandúes, etc.",
    imagen: "patagonia.jpg",
    audio: "/temas/audios/fyf/patagonia.mp3",
  },
  Cuyo: {
    titulo: "Turismo de Cuyo",
    texto: "Aquí hay cactus, cóndores, etc.",
    imagen: "cuyo.jpg",
  },
  Centro: {},
  Noroeste: {
    titulo: "Turismo del Noroeste",
    texto: "Aquí hay yungas, vicuñas, etc.",
    imagen: "noroeste.jpg",
  },
};

const params = new URLSearchParams(window.location.search);
const region = params.get("region");
const info = infoPorRegion[region] || infoPorRegion["Noreste"];

document.getElementById("titulo").textContent = info.titulo;
document.getElementById("info").textContent = info.texto;
document.getElementById("imagen").src = info.imagen;
const btnVolver = document.getElementById("btn-volver")

//hacer que al hacer click en btn volver se sume 1 exp y vuelva al mapa

btnVolver.onclick = () => {
let exp = parseInt(localStorage.getItem("exp")) || 0;
exp += 1;
localStorage.setItem("exp", exp);
  window.location.href = "../mapa-y-puzzle/mapa-test.html";
}

