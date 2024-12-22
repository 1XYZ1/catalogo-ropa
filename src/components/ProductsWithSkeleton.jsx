// src/components/ProductsWithSkeleton.jsx
import { createSignal, onMount, Show } from 'solid-js';

// Esta es la función que define el skeleton
function ProductCardSkeleton() {
  return (
    <div class="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm">
      <div class="relative aspect-[1/1.2]">
        <div class="bg-gray-200 w-full h-full animate-pulse" />
      </div>

      <div class="p-4 flex flex-col h-[180px]">
        <div class="flex-1 space-y-3">
          <div class="h-[3.5rem] bg-gray-200 rounded animate-pulse" />
          <div class="h-7 bg-gray-200 w-24 rounded animate-pulse" />

          {/* Skeleton para tallas */}
          <div class="flex flex-wrap gap-1.5 mt-2">
            {[1,2,3,4].map(() => (
              <div class="h-6 w-8 bg-gray-200 rounded-md animate-pulse" />
            ))}
          </div>
        </div>

        <div class="mt-4 h-12 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}

// Esta es la función principal que controla la lógica de carga
export default function ProductsWithSkeleton(props) {
  const [isLoading, setIsLoading] = createSignal(true);

  onMount(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  });

  return (
    <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
      <Show when={isLoading()}>
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </Show>

      <Show when={!isLoading()}>
        <div class="animate-fadeIn col-span-full grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {props.children}
        </div>
      </Show>
    </div>
  );
}