// ProductCardSkeleton.jsx
export default function ProductCardSkeleton() {
  return (
    <div class="flex flex-col border rounded-xl overflow-hidden shadow-md animate-pulse">
      {/* Contenedor de imagen con aspect-ratio */}
      <div class="relative w-full aspect-square">
        <div class="bg-gray-200 w-full h-full" />
      </div>

      <div class="p-4 flex flex-col flex-1">
        <div class="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
        <div class="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-4" />
        <div class="mt-auto flex justify-center">
          <div class="h-12 bg-gray-200 rounded w-64" />
        </div>
      </div>
    </div>
  );
}