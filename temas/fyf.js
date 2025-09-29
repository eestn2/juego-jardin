const infoPorRegion = {
  Noreste: {
    titulo: "Flora y Fauna del Noreste",
    texto: "Aquí hay selvas, yacarés, etc.",
    imagen: "noreste.jpg",
  },
  Patagonia: {
    titulo: "Flora y Fauna de la Patagonia",
    texto: "Aquí hay guanacos, ñandúes, etc.",
    imagen: "patagonia.jpg",
    audio: "/temas/audios/fyf/patagonia.mp3",
  },
  Cuyo: {},
  Centro: {},
  Noroeste: {},
};

const params = new URLSearchParams(window.location.search);
const region = params.get("region");
const info = infoPorRegion[region] || infoPorRegion["Noreste"];

document.getElementById("titulo").textContent = info.titulo;
document.getElementById("texto").textContent = info.texto;
document.getElementById("imagen").src = info.imagen;
