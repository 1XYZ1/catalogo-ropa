// components/EmblaCarousel.jsx
import { onMount, onCleanup } from 'solid-js';
import EmblaCarousel from 'embla-carousel';
import './EmblaCarousel.css';


function EmblaCarouselComponent(props) {
  let viewportRef;
  let prevButtonRef;
  let nextButtonRef;
  let emblaInstance;

  // Desestructurar props y establecer showArrows por defecto a true
  const { images, name, showArrows= true, slug  } = props;

  onMount(() => {
    emblaInstance = EmblaCarousel(viewportRef, { loop: false });

    if (showArrows) {
      const scrollPrev = () => emblaInstance.scrollPrev();
      const scrollNext = () => emblaInstance.scrollNext();

      prevButtonRef.addEventListener('click', scrollPrev);
      nextButtonRef.addEventListener('click', scrollNext);
    }
  });

  onCleanup(() => {
    if (emblaInstance) emblaInstance.destroy();
  });

  return (
    <div class="relative embla overflow-hidden p-0"> {/* Eliminamos el padding */}
      <div class="embla__viewport" ref={viewportRef}>

        <div class="embla__container flex p-0"> {/* Aseguramos que no haya padding */}
          {images.map((image, index) => (
            <div class="embla__slide flex-[0_0_100%]" key={index}>
              <img

                src={image}
                alt={`${name} - Imagen ${index + 1}`}
                class="w-full h-full object-cover rounded-lg shadow-md"
                loading="eager"
              />
            </div>

          ))}
        </div>
      </div>

      {showArrows && (
        <>
          {/* Flecha Anterior Minimalista */}
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
        </>
      )}
    </div>
  );
}

export default EmblaCarouselComponent;