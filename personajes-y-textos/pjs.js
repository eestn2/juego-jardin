const dialogues = [
  { text: "Hola, ¡Me alegra verte!", sprite: "nenaMUÑECO.png", Audio: "./audios/hola-me.m4a" },
  { text: "Argentina es un país lleno de colores, sonidos y sabores", sprite: "nenaMUÑECO.png",  Audio: "./audios/Argentina-es.m4a" },
  { text: "En su enorme territorio encontramos paisajes muy distintos: ", sprite: "nenaMUÑECO.png", Audio: "./audios/en-su-enorme.m4a"  },
  {text:  "montañas nevadas, selvas verdes y húmedas y llanuras infinitas", sprite: "nenaMUÑECO.png", Audio: "./audios/montanias-nevadas.m4a" },
  { text: "En cada rincón viven animales únicos:", sprite: "nenaMUÑECO.png", Audio: "./audios/en-cada-rincon.m4a" },
  {text:" desde el yaguareté en el norte hasta los pumas en el sur.", sprite: "nenaMUÑECO.png", Audio: "./audios/desde-los.m4a" },
  { text: "También crecen plantas que se adaptan a cada lugar", sprite: "nenaMUÑECO.png", Audio: "./audios/tambien-crecen.m4a" },
  {text:"como los cactus en el norte o los bosques en la Patagonia.", sprite: "nenaMUÑECO.png", Audio: "./audios/como-los-cactus.m4a" },
  { text: "La diversidad no está solo en la naturaleza: ", sprite: "nenaMUÑECO.png", Audio: "./audios/la-diversidad.m4a" },
  {text:"también está en las personas y en sus costumbres.", sprite: "nenaMUÑECO.png", Audio: "./audios/tambien-esta.m4a" },
  {text: "Cada región tiene sus comidas, su música y sus bailes", sprite: "nenaMUÑECO.png", Audio: "./audios/cada-region.m4a" },
  {text:"Los invitamos a abrir los ojos, mirar con curiosidad" , sprite: "nenaMUÑECO.png", Audio: "./audios/los-invitamos.m4a" },
  { text: " y dejarse sorprender por todo lo que nuestra tierra tiene", sprite: "nenaMUÑECO.png", Audio: "./audios/y-dejarte-sorprender.m4a" },
];

let index = 0;

const dialogueText = document.getElementById("dialogue-text");
const spriteImage = document.getElementById("sprite");
const nextBtn = document.getElementById("next-btn");
const audioBtn = document.getElementById("audio");



nextBtn.addEventListener("click", () => {
  index++;
  if (index < dialogues.length) {
    dialogueText.textContent = dialogues[index].text;
    spriteImage.src = dialogues[index].sprite;
  } else {
    nextBtn.disabled = true;
    document.getElementById("personaje").style.display = "none";
    document.getElementById("cover").style.display = "none";
  }
});

audioBtn.addEventListener("click", () => {
  if (index < dialogues.length) {
    const audio = new Audio(dialogues[index].Audio);
    audio.play();
    audioBtn.disabled = true;
    audio.addEventListener("ended", () => {
      audioBtn.disabled = false;
    });
  }
  
});

