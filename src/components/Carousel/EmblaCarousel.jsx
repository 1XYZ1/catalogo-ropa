// components/EmblaCarousel.jsx
import { onMount } from 'solid-js';
import EmblaCarousel from 'embla-carousel';
import './EmblaCarousel.css';


function EmblaCarouselComponent(props) {
  const { images, name } = props;
  let viewportRef;
  let emblaInstance;
  let prevButtonRef;
  let nextButtonRef;

  onMount(() => {
    // Inicializar carrusel con animación de entrada
    const container = viewportRef.querySelector('.embla__container');
    container.classList.add('opacity-0', 'scale-[0.98]');

    // Precargar primera imagen
    const firstImage = new Image();
    firstImage.src = images[0];
    firstImage.onload = () => {
      // Mostrar contenedor con animación
      container.classList.remove('opacity-0', 'scale-[0.98]');
      container.classList.add('opacity-100', 'scale-100');

      // Inicializar Embla
      emblaInstance = EmblaCarousel(viewportRef, {
        loop: true,
        dragFree: false,
        containScroll: 'keepSnaps',
        skipSnaps: false,
        inViewThreshold: 0.7,
        speed: 8,
        align: 'center'
      });

      // Precargar resto de imágenes
      images.slice(1).forEach(src => {
        const img = new Image();
        img.src = src;
      });

      // Configurar botones
      const scrollPrev = () => emblaInstance.scrollPrev();
      const scrollNext = () => emblaInstance.scrollNext();
      prevButtonRef?.addEventListener('click', scrollPrev);
      nextButtonRef?.addEventListener('click', scrollNext);
    };
  });


  return (
    <div class="relative w-full h-full overflow-hidden rounded-lg" >
      <div class="embla w-full h-full" ref={viewportRef}>
        <div class="embla__container transition-all duration-500 ease-out">
          {images.map((image, index) => (
            <div class="embla__slide min-w-full relative" key={index}>
              <img

                decoding="async"
                width="400"
                height="400"
                src={image}
                alt={`${name} - Imagen ${index + 1}`}
                class="w-full h-full object-cover md:object-contain"

              />
            </div>
          ))}
        </div>
      </div>


          <button
            ref={prevButtonRef}
            class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-1 rounded-full focus:outline-none active:bg-gray-600 transition"
            aria-label="Anterior"
          >
            {/* Ícono SVG de flecha izquierda */}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Flecha Siguiente Minimalista */}
          <button
            ref={nextButtonRef}
            class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-1 rounded-full focus:outline-none active:bg-gray-600 transition"
            aria-label="Siguiente"
          >
            {/* Ícono SVG de flecha derecha */}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>


    </div>
  );
}



export default EmblaCarouselComponent;