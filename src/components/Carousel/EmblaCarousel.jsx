// components/EmblaCarousel.jsx
import { onMount, onCleanup } from 'solid-js';
import EmblaCarousel from 'embla-carousel';
import './EmblaCarousel.css';


function EmblaCarouselComponent(props) {
  const { images, name, slug } = props;
  let viewportRef;
  let emblaInstance;
  let prevButtonRef;
  let nextButtonRef;

  onMount(() => {
    emblaInstance = EmblaCarousel(viewportRef, {
      loop: false,
      dragFree: false,
      skipSnaps: false
    });

      const scrollPrev = () => emblaInstance.scrollPrev();
      const scrollNext = () => emblaInstance.scrollNext();

      prevButtonRef.addEventListener('click', scrollPrev);
      nextButtonRef.addEventListener('click', scrollNext);

    // Precarga de imágenes
    images.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  });

  return (
    <div class="relative embla overflow-hidden rounded-lg" transition:name={`carousel-${slug}`}>
      <div class="embla__viewport" ref={viewportRef}>
        <div class="embla__container">
          {images.map((image, index) => (
            <div class="embla__slide" key={index}>
              <img
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                width="400"
                height="400"
                src={image}
                alt={`${name} - Imagen ${index + 1}`}
                class="w-full h-full object-contain"
                transition:name={index === 0 ? `image-${slug}` : `carousel-image-${slug}-${index}`}
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