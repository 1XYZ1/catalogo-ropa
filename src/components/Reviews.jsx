// src/components/Reviews.jsx
import { createSignal, onMount } from 'solid-js';
import ReviewSkeleton from './ReviewSkeleton';

export default function Reviews({ reviews }) {
  const [isLoading, setIsLoading] = createSignal(true);
  const [contentVisible, setContentVisible] = createSignal(false);
  const [isMobile, setIsMobile] = createSignal(false);

  // Detectar si es móvil al montar el componente
  onMount(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px es el breakpoint md de Tailwind
    };

    // Verificar inicialmente
    checkMobile();

    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', checkMobile);

    // Mostrar skeleton por 3 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setContentVisible(true), 100);
    }, 600);

    // Limpieza de event listeners
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  });

  // Renderizar skeletons según el tamaño de pantalla
  const renderSkeletons = () => {
    if (isMobile()) {
      return <ReviewSkeleton />;
    } else {
      return (
        <>
          <ReviewSkeleton />
          <ReviewSkeleton />
        </>
      );
    }
  };

  return (
    <div class="relative">
      {/* Skeleton loader */}
      <div
        class={`transition-opacity duration-300 ${
          isLoading() ? 'opacity-100' : 'opacity-0 hidden'
        }`}
      >
        {renderSkeletons()}
      </div>

      {/* Contenido real */}
      <div
        class={`transition-opacity duration-300 ${
          contentVisible() ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {reviews.map((review) => (
          <div class="mb-8 border-b pb-6 flex flex-col md:flex-row items-center md:items-start">
            <div class="md:w-1/3 mb-4 md:mb-0">
              <img
                src={review.productImage}
                alt={`Producto comprado por ${review.name}`}
                class="w-full h-auto object-cover rounded shadow-md"
              />
            </div>
            <div class="md:w-2/3 md:pl-6">
              <div class="flex items-center mb-2">
                <h3 class="text-xl font-semibold">{review.name}</h3>
                <span class="ml-auto text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div class="bg-gray-100 p-4 rounded">
                <p class="text-gray-800 text-lg italic font-medium">
                  "{review.comment}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}