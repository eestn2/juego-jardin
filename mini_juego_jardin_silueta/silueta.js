// Espera a que el DOM (Document Object Model) esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const cuadroDeTexto = document.querySelector('.cuadrodetexto');
    const vacaImg = document.getElementById('vaca');
    const siluetaVacaImg = document.getElementById('siluetaVaca');
    const vicuniaImg = document.getElementById('vicuna');
    const yaguareteImg = document.getElementById('yaguarete');
    const vacaCorrectaImg = document.getElementById('vacaCorrecta');
    const vicuniaCorrectaImg = document.getElementById('vicuniaCorrecta');
    const yaguareteIncorrectoImg = document.getElementById('yaguareteIncorrecto');
    const parrafoCuadroDeTexto = cuadroDeTexto ? cuadroDeTexto.querySelector('p') : null;


    vacaCorrectaImg.style.pointerEvents = 'none';
    vicuniaCorrectaImg.style.pointerEvents = 'none';
    yaguareteIncorrectoImg.style.pointerEvents = 'none';

    // Lógica para marcar opción correcta y mostrar mensaje
    vacaImg.addEventListener('click', () => {
        vacaCorrectaImg.style.display = 'block';
        vicuniaImg.style.display = 'none';
        yaguareteImg.style.display = 'none';
        vacaImg.style.display = 'none';
        yaguareteIncorrectoImg.style.display = 'none';
        vicuniaCorrectaImg.style.display = 'none';
        if (cuadroDeTexto) {
            const h2 = cuadroDeTexto.querySelector('h2');
            if (h2) h2.textContent = '¡Correcto!';
        }
        // Mostrar el botón de volver al inicio
        if (btnVolverInicio) {
            btnVolverInicio.style.display = 'block';
        }
    });

    // Opciones incorrectas: vicuña y yaguarete

    // Mostrar la imagen incorrecta en el mismo lugar que la opción elegida
    vicuniaImg.addEventListener('click', () => {
        // Obtener posición y tamanio de la imagen original
        const rect = vicuniaImg.getBoundingClientRect();
        // Ajustar la imagen incorrecta para que coincida
        vicuniaCorrectaImg.style.position = 'absolute';
        vicuniaCorrectaImg.style.left = vicuniaImg.offsetLeft + 'px';
        vicuniaCorrectaImg.style.top = vicuniaImg.offsetTop + 'px';
        vicuniaCorrectaImg.style.width = vicuniaImg.offsetWidth + 'px';
        vicuniaCorrectaImg.style.height = vicuniaImg.offsetHeight + 'px';
        vicuniaImg.style.visibility = 'hidden';
        vicuniaCorrectaImg.style.display = 'block';
        if (cuadroDeTexto) {
            const h2 = cuadroDeTexto.querySelector('h2');
            if (h2) h2.textContent = 'Incorrecto, prueba de nuevo';
        }
    });

    yaguareteImg.addEventListener('click', () => {
        const rect = yaguareteImg.getBoundingClientRect();
        yaguareteIncorrectoImg.style.position = 'absolute';
        yaguareteIncorrectoImg.style.left = yaguareteImg.offsetLeft + 'px';
        yaguareteIncorrectoImg.style.top = yaguareteImg.offsetTop + 'px';
        yaguareteIncorrectoImg.style.width = yaguareteImg.offsetWidth + 'px';
        yaguareteIncorrectoImg.style.height = yaguareteImg.offsetHeight + 'px';
        yaguareteImg.style.visibility = 'hidden';
        yaguareteIncorrectoImg.style.display = 'block';
        if (cuadroDeTexto) {
            const h2 = cuadroDeTexto.querySelector('h2');
            if (h2) h2.textContent = 'Incorrecto, prueba de nuevo';
        }
    });


const btnVolverInicio = document.getElementById('btnVolverInicio');
if (btnVolverInicio) {
    // Ocultar el botón al inicio
    btnVolverInicio.style.display = 'none';
    btnVolverInicio.addEventListener('click', () => {
        window.location.href = "./mapa-y-puzzle/mapa-test.html";
    });
}
});