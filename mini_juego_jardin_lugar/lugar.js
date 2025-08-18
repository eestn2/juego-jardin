// Espera a que el DOM (Document Object Model) esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const cuadroDeTexto = document.querySelector('.cuadrodetexto');
    const laPampa = document.getElementById('laPampa');
    const selvaMisionera = document.getElementById('selvaMisionera');
    const selvaParanaense = document.getElementById('selvaParanaense');
    const parrafoCuadroDeTexto = cuadroDeTexto ? cuadroDeTexto.querySelector('p') : null;
    // Lógica para marcar opción correcta y mostrar mensaje

    selvaParanaense.addEventListener('click', () => {
        // Oculta las demás opciones incorrectas
        if (laPampa) laPampa.style.display = 'none';
        if (selvaMisionera) selvaMisionera.style.display = 'none';
        // Selva Paranaense queda visible y verde
        if (cuadroDeTexto) {
            const h2 = cuadroDeTexto.querySelector('h2');
            if (h2) h2.textContent = '¡Correcto!';
        }
        // Mostrar el botón de volver al inicio SOLO aquí
        if (btnVolverInicio) {
            btnVolverInicio.style.display = 'block';
        }
    });

    selvaMisionera.addEventListener('click', () => {
        // Cambia solo el fondo del recuadro de Selva Misionera a rojo
        selvaMisionera.classList.add('lugar');
        selvaMisionera.style.backgroundColor = '#e53935'; // Rojo
        selvaMisionera.style.borderColor = '#b71c1c'; // Borde rojo oscuro
        if (cuadroDeTexto) {
            const h2 = cuadroDeTexto.querySelector('h2');
            if (h2) h2.textContent = 'Incorrecto, prueba de nuevo';
        }
        // Oculta el botón de volver al inicio
        if (btnVolverInicio) {
            btnVolverInicio.style.display = 'none';
        }
    });


    laPampa.addEventListener('click', () => {
        // Cambia solo el fondo del recuadro de La Pampa a rojo
        laPampa.classList.add('lugar'); // Por si no tiene la clase
        laPampa.style.backgroundColor = '#e53935'; // Rojo
        laPampa.style.borderColor = '#b71c1c'; // Borde rojo oscuro
        if (vicuniaImg) vicuniaImg.style.visibility = 'hidden';
        if (vicuniaCorrectaImg) vicuniaCorrectaImg.style.display = 'block';
        if (cuadroDeTexto) {
            const h2 = cuadroDeTexto.querySelector('h2');
            if (h2) h2.textContent = 'Incorrecto, prueba de nuevo';
        }
        // Oculta el botón de volver al inicio
        if (btnVolverInicio) {
            btnVolverInicio.style.display = 'none';
        }
    });


    const btnVolverInicio = document.getElementById('btnVolverInicio');
    if (btnVolverInicio) {
        // Ocultar el botón al inicio SIEMPRE al cargar
        btnVolverInicio.style.display = 'none';
        btnVolverInicio.addEventListener('click', () => {
            window.location.href = "../mapa-y-puzzle/mapa-test.html";
        });
    }
});