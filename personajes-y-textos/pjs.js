const dialogues = [
  { text: "Hola, ¡Me alegra verte!", sprite: "nenaMUÑECO.png" },
  { text: "¡Estamos en el mapa argentino!", sprite: "nenaMUÑECO.png" },
  { text: "Vamos a empezar nuestra aventura.", sprite: "nenaMUÑECO.png" },
  { text: "Elijamos que región queremos conocer", sprite: "nenaMUÑECO.png"},
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
