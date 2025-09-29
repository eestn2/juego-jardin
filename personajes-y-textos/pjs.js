const dialogues = [
  { text: "Hola, ¡Me alegra verte!", sprite: "nenaMUÑECO.png" },
  { text: "Argentina es un país lleno de colores, sonidos y sabores", sprite: "nenaMUÑECO.png" },
  { text: "En su enorme territorio encontramos paisajes muy distintos: ", sprite: "nenaMUÑECO.png" },
  {text:  "montañas nevadas, selvas verdes y húmedas y llanuras infinitas", sprite: "nenaMUÑECO.png"},
  { text: "En cada rincón viven animales únicos:", sprite: "nenaMUÑECO.png"},
  {text:" desde el yaguareté en el norte hasta los pumas en el sur.", sprite: "nenaMUÑECO.png"},
  { text: "También crecen plantas que se adaptan a cada lugar", sprite: "nenaMUÑECO.png"},
  {text:"como los cactus en el norte o los bosques en la Patagonia.", sprite: "nenaMUÑECO.png"},
  { text: "La diversidad no está solo en la naturaleza: ", sprite: "nenaMUÑECO.png" },
  {text:"también está en las personas y en sus costumbres.", sprite: "nenaMUÑECO.png"},
  {text: "Cada región tiene sus comidas, su música, sus bailes", sprite: "nenaMUÑECO.png"},
  {text:"Los invitamos a abrir los ojos, mirar con curiosidad" , sprite: "nenaMUÑECO.png" },
  { text: " y dejarte sorprender por todo lo que nuestra tierra tiene", sprite: "nenaMUÑECO.png" },
];

let index = 0;

const dialogueText = document.getElementById("dialogue-text");
const spriteImage = document.getElementById("sprite");
const nextBtn = document.getElementById("next-btn");

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
