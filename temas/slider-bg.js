// Extraer las imágenes de los slides y asignarlas como fondo usando CSS variables
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll("ul.slider li");
  // recorrer cada slide para extraer la imagen y asignarla como fondo
  slides.forEach((li) => {
    const img = li.querySelector("img");
    if (img && img.src) {
      // usar url("...") como valor de la variable CSS
      li.style.setProperty("--bg", `url("${img.src}")`);
    } else {
      // fallback: color neutro si no hay imagen
      li.style.setProperty("--bg", "none");
      li.style.backgroundColor = "#ddd";
    }
  });
  
});

// Control manual del slider con JavaScript para mejorar la experiencia
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector("ul.slider");
  if (!slider) return;
  const slides = Array.from(slider.querySelectorAll("li"));
  const links = Array.from(document.querySelectorAll(".menu a"));

  // Preload: crear promesas por cada imagen
  const imgLoadMap = new Map();
  slides.forEach((li) => {
    const img = li.querySelector("img");
    if (!img) {
      imgLoadMap.set(li.id, Promise.resolve());
      return;
    }
    if (img.complete && img.naturalWidth !== 0) {
      imgLoadMap.set(li.id, Promise.resolve());
    } else {
      imgLoadMap.set(
        li.id,
        new Promise((resolve) => {
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
          // iniciar carga si el src está en data-src (opcional)
          if (img.dataset.src && !img.src) img.src = img.dataset.src;
        })
      );
    }
  });

  function showSlide(id) {
    // modo manual: pausar animación globalmente
    slider.classList.add("manual");
    slides.forEach((li) => {
      if (li.id === id) {
        li.classList.add("active");
      } else {
        li.classList.remove("active");
      }
    });

    // esperar a que la imagen objetivo cargue antes de subir su opacidad
    const targetLi = slides.find((s) => s.id === id);
    if (!targetLi) return;
    const promise = imgLoadMap.get(id) || Promise.resolve();
    // bajar opacidad inmediatamente para evitar solapamientos visuales
    slides.forEach((li) => {
      if (li !== targetLi) {
        li.style.opacity = "0";
        li.style.zIndex = "0";
      }
    });
    targetLi.style.zIndex = "3";
    targetLi.style.opacity = "0.01"; // casi invisible hasta que cargue
    promise.then(() => {
      // pequeña espera para evitar parpadeos con clicks rapidísimos
      requestAnimationFrame(() => {
        targetLi.style.opacity = "1";
      });
      // actualizar URL hash sin causar salto adicional
      history.replaceState(null, "", `#${id}`);
    });
  }

  // manejar clicks del menú
  links.forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const hash = a.getAttribute("href") || "";
      const id = hash.replace("#", "");
      if (!id) return;
      showSlide(id);
    });
  });

  // permitir volver al modo automático si se borra el hash manualmente
  window.addEventListener("hashchange", () => {
    if (!location.hash) {
      slider.classList.remove("manual");
      slides.forEach((li) => {
        li.classList.remove("active");
        li.style.opacity = "";
        li.style.zIndex = "";
      });
    }
  });

  // Si ya hay hash al cargar, mostrar esa slide
  if (location.hash) {
    const id = location.hash.replace("#", "");
    showSlide(id);
  }
});