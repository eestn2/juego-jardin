  // Espera a que el DOM (Document Object Model) esté completamente cargado
  document.addEventListener("DOMContentLoaded", () => {
    const botonEmpezar = document.getElementById("btnEmpezarJuego");
    const cuadroDeTexto = document.querySelector(".cuadrodetexto");
    const nenaImg = document.getElementById("nena");
    const neneImg = document.getElementById("nene");
    const tapaEmpanadaBtn = document.getElementById("tapaEmpanadaBtn"); // ¡Faltaba esta línea!
    const tapitadeempanadas = document.getElementById("tapitaEmpanadaImg"); // Referencia a la imagen del relleno
    const carnepicadaImg = document.getElementById("carnepicada");
    const rellenodeempanadasImg = document.getElementById("relleno");
    const empandacrudaImg = document.getElementById("empandacruda");
    const empanadaImg = document.getElementById("empanada");
    const confetiImg = document.getElementById("confeti");
    const parrafoCuadroDeTexto = cuadroDeTexto
      ? cuadroDeTexto.querySelector("p")
      : null;
    // Eliminamos la selección del título si no lo vamos a ocultar

    neneImg.style.display = "none";
    // Asegúrate de que el botón y el párrafo existan antes de añadir el event listener
    if (botonEmpezar && cuadroDeTexto && parrafoCuadroDeTexto) {
      botonEmpezar.addEventListener("click", () => {
        console.log("¡El juego ha comenzado!");

        neneImg.style.display = "none";
        cuadroDeTexto.style.alignSelf = "flex-end";
        cuadroDeTexto.style.marginLeft = "auto";
        cuadroDeTexto.style.marginRight = "0";

        // 1. Cambiar el texto del párrafo dentro de .cuadrodetexto
        parrafoCuadroDeTexto.innerHTML = `
                  TOCA LA TAPA DE EMPANADAS PARA SACAR UNA
              `;

        // 2. Ocultar el botón "EMPEZAR"
        botonEmpezar.style.visibility = "hidden";
        botonEmpezar.style.pointerEvents = "none";
        document.getElementById("cover").style.display = "none";
      });
      // NUEVA LÓGICA: Evento de clic en la imagen de la tapa
      tapaEmpanadaBtn.addEventListener("click", () => {
        nenaImg.style.display = "none";
        neneImg.style.display = "block";
        cuadroDeTexto.style.alignSelf = "flex-start";
        cuadroDeTexto.style.marginLeft = "0";
        cuadroDeTexto.style.marginRight = "auto";

        carnepicadaImg.style.display = "block";
        console.log("¡Clic en la tapa de empanada!");
        tapitaEmpanadaImg.style.display = "block"; // O 'block' si no quieres que sea flexible
        carnepicadaImg.style.display = "block"; // Esto podría ser para mostrar la carne picada al inicio
        neneImg.style.display = "block"; // Si querés que el nene aparezca también con este click

        parrafoCuadroDeTexto.innerHTML = `
                  ¡BIEN HECHO!
                  <br>
                  AHORA PUEDES AGREGAR EL RELLENO A LA TAPA. TOCA LA CARNE PICADA PARA AGREGAR EL RELLENO
              `;
      });

      carnepicadaImg.addEventListener("click", () => {
        console.log("¡Clic en el relleno de empanadas!");
        carnepicadaImg.style.display = "block";
        rellenodeempanadasImg.style.display = "block";

        parrafoCuadroDeTexto.innerHTML = `¡BIEN HECHO!
            AHORA TOCA LA EMPANADA PARA DOBLARLA`;
      });

      rellenodeempanadasImg.addEventListener("click", () => {
        neneImg.style.display = "none";
        nenaImg.style.display = "block";
        cuadroDeTexto.style.alignSelf = "flex-end";
        cuadroDeTexto.style.marginLeft = "auto";
        cuadroDeTexto.style.marginRight = "0";
        
        console.log("¡Clic en la tapa con carne!");
        empandacrudaImg.style.display = "block";
        tapitadeempanadas.style.display = "none";
        rellenodeempanadasImg.style.display = "none";
        carnepicadaImg.style.display = "none";

        parrafoCuadroDeTexto.innerHTML = `AHORA TOCA LA EMPANADA PARA COCINARLA`;
      });

      empandacrudaImg.addEventListener("click", () => {
        neneImg.style.display = "block";
        console.log("¡Clic en la empanada cruda!");
        empandacrudaImg.style.display = "none";
        empanadaImg.style.display = "block";

        // Animación de confeti: desde el centro, escala y opacidad
        confetiImg.style.display = "block";
        confetiImg.style.opacity = 0;
        confetiImg.style.transform = "scale(0)";
        confetiImg.style.transition = "opacity 0.5s, transform 0.5s";
        confetiImg.style.transformOrigin = "50% 50%";
        setTimeout(() => {
          confetiImg.style.opacity = 1;
          confetiImg.style.transform = "scale(1)";
        }, 10);

        parrafoCuadroDeTexto.innerHTML = `¡MUY BIEN HECHO!`;
        // Mostrar el botón de volver al inicio al finalizar el juego
        if (btnVolverInicio) {
          btnVolverInicio.style.display = "block";
        }
      });

      const btnVolverInicio = document.getElementById("btnVolverInicio");
      if (btnVolverInicio) {
        // Ocultar el botón al inicio
        btnVolverInicio.style.display = "none";
        btnVolverInicio.addEventListener("click", () => {
          window.location.href = "../mapa-y-puzzle/mapa-test.html";
        });
      }
    } else {
      console.error(
        "Error: No se encontraron todos los elementos necesarios (botón, cuadro de texto o párrafo)."
      );
    }
  });
