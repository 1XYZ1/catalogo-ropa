// src/components/Reviews.jsx
import { createSignal, onMount, Show, For } from 'solid-js';
import ReviewSkeleton from './ReviewSkeleton';
import EmblaCarousel from './Carousel/EmblaCarousel';

export default function Reviews({ reviews }) {
  const [isLoading, setIsLoading] = createSignal(true);
  const [contentVisible, setContentVisible] = createSignal(false);
  const [isMobile, setIsMobile] = createSignal(false);
  const [expandedReviews, setExpandedReviews] = createSignal(new Set());
  const [currentPhotoIndex, setCurrentPhotoIndex] = createSignal({});

  onMount(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setContentVisible(true), 100);
    }, 600);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  });

  const toggleReview = (reviewId) => {
    const expanded = new Set(expandedReviews());
    if (expanded.has(reviewId)) {
      expanded.delete(reviewId);
    } else {
      expanded.add(reviewId);
    }
    setExpandedReviews(expanded);
  };

  const renderSkeletons = () => (
    <Show when={!isMobile()} fallback={<ReviewSkeleton />}>
      <div class="grid grid-cols-2 gap-4">
        <ReviewSkeleton />
        <ReviewSkeleton />
      </div>
    </Show>
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const nextPhoto = (productId, photos) => {
    const currentIndex = currentPhotoIndex()[productId] || 0;
    setCurrentPhotoIndex({
      ...currentPhotoIndex(),
      [productId]: (currentIndex + 1) % photos.length
    });
  };

  const prevPhoto = (productId, photos) => {
    const currentIndex = currentPhotoIndex()[productId] || 0;
    setCurrentPhotoIndex({
      ...currentPhotoIndex(),
      [productId]: (currentIndex - 1 + photos.length) % photos.length
    });
  };

  return (
    <div class="relative">
      <Show when={isLoading()}>
        <div class="transition-opacity duration-300 opacity-100">
          {renderSkeletons()}
        </div>
      </Show>

      <div class={`transition-opacity duration-300 ${contentVisible() ? 'opacity-100' : 'opacity-0'}`}>
        <div class="grid gap-8">
          <For each={reviews}>
            {(review) => (
              <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
               {/* Cabecera de la review */}
                <button
                  onClick={() => toggleReview(review.id)}
                  class="w-full text-left"
                >
                  <div class="p-8 hover:bg-gray-50 transition-all duration-300">
                    <div class="flex justify-between items-center">
                      <div class="space-y-4 flex-1">
                        <div class="flex items-center gap-3">
                          <h3 class="text-2xl font-bold text-gray-900">{review.name}</h3>
                          <span class="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                            {review.productReviews.length} {review.productReviews.length === 1 ? 'Producto' : 'Productos'}
                          </span>
                        </div>

                        {review.customerInfo && (
                          <div class="flex gap-6 text-sm text-gray-600">
                            <span class="flex items-center gap-2">
                              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                              </svg>
                              {review.customerInfo.height}
                            </span>
                            <span class="flex items-center gap-2">
                              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 3v18M3 12h18"></path>
                              </svg>
                              {review.customerInfo.weight}
                            </span>
                            <span class="flex items-center gap-2">
                              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                                <line x1="7" y1="7" x2="7.01" y2="7"></line>
                              </svg>
                              Talla {review.customerInfo.usualSize}
                            </span>
                          </div>
                        )}

                        <p class="text-gray-700">{review.generalComment}</p>
                      </div>

                      <div class="ml-4">
                        <div class={`transform transition-transform duration-300 ${
                          expandedReviews().has(review.id) ? 'rotate-180' : ''
                        }`}>
                          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>

                <div
                  class={`transition-all duration-500 ease-in-out ${
                    expandedReviews().has(review.id)
                      ? 'max-h-[5000px] opacity-100'
                      : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div class="p-6 bg-gray-50 border-t border-gray-100">
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <For each={review.productReviews}>
    {(productReview) => (
      <div class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Carousel Container */}
        <div class="relative w-full" style="max-height: min(500px, 100vw)">
          <EmblaCarousel
            images={productReview.photos}
            name={productReview.productName}
            client:load
          />
          <span class="absolute top-2 right-2 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium shadow-sm z-10">
            {formatDate(productReview.date)}
          </span>
        </div>

        {/* Información del producto */}
        <div class="p-4 space-y-3">
          <a
            href={`/products/${productReview.productSlug}`}
            class="text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors block"
          >
            {productReview.productName}
            {productReview.color && (
              <span class="text-gray-500 ml-1">- {productReview.color}</span>
            )}
          </a>

          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 bg-gray-100 rounded-full text-xs">
              Talla {productReview.wearingSize}
            </span>
            <span class="px-2 py-1 bg-gray-100 rounded-full text-xs">
              {productReview.fitFeedback}
            </span>
          </div>

          <p class="text-gray-700 text-sm">
            {productReview.comment}
          </p>
        </div>
      </div>
    )}
  </For>
</div>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}