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


    // Inicializar Embla
    emblaInstance = EmblaCarousel(viewportRef, {
      loop: true,
      dragFree: false,
      skipSnaps: false,
      speed: 8,
      align: 'center'
    });



    // Precargar imágenes adyacentes
    const preloadImages = () => {
      if (typeof window === 'undefined') return;
      const currentIndex = emblaInstance.selectedScrollSnap();
      const nextIndex = (currentIndex + 1) % images.length;

      requestAnimationFrame(() => {
        const img = new Image();
        img.src = images[nextIndex];
      });
    };

    emblaInstance.on('select', preloadImages);
    preloadImages();

      // Configurar botones
      const scrollPrev = () => emblaInstance.scrollPrev();
      const scrollNext = () => emblaInstance.scrollNext();
      prevButtonRef?.addEventListener('click', scrollPrev);
      nextButtonRef?.addEventListener('click', scrollNext);

  });


  return (
    <div class="relative w-full h-full overflow-hidden rounded-lg" >
      <div class="embla w-full h-full" ref={viewportRef}>
        <div class="embla__container">
          {images.map((image, index) => (
            <div class="embla__slide min-w-full relative" key={index}>
              <img
                loading="lazy"
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