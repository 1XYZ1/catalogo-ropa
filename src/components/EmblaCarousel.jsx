import { onMount, onCleanup } from 'solid-js';
import { createSignal } from 'solid-js';
import EmblaCarousel from 'embla-carousel';
import './EmblaCarousel.css';

const EmblaCarouselComponent = (props) => {
  let viewportRef;
  let prevButtonRef;
  let nextButtonRef;
  const [embla, setEmbla] = createSignal(null);

  onMount(() => {
    const emblaInstance = EmblaCarousel(viewportRef, { loop: true });
    setEmbla(emblaInstance);

    if (emblaInstance) {
      prevButtonRef.addEventListener('click', emblaInstance.scrollPrev);
      nextButtonRef.addEventListener('click', emblaInstance.scrollNext);
    }

    onCleanup(() => {
      if (emblaInstance) emblaInstance.destroy();
    });
  });

  return (
    <div class="relative embla overflow-hidden">
      <div class="embla__viewport" ref={viewportRef}>
        <div class="embla__container flex">
          {props.images.map((image) => (
            <div class="embla__slide flex-[0_0_100%]">
              <img src={image} alt={props.name} class="w-full h-full object-cover rounded-lg shadow-md" />
            </div>
          ))}
        </div>
      </div>
      <button ref={el => prevButtonRef = el} class="embla__button embla__button--prev">‹</button>
      <button ref={el => nextButtonRef = el} class="embla__button embla__button--next">›</button>
    </div>
  );
};

export default EmblaCarouselComponent;