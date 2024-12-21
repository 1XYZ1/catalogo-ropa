// src/components/ReviewSkeleton.jsx
export default function ReviewSkeleton() {
  return (
    <div class="mb-8 border-b pb-6 flex flex-col md:flex-row items-center">
      {/* Contenedor de imagen */}
      <div class="w-full md:w-1/3 mb-4 md:mb-0">
        <div class="bg-gray-200 w-full h-80 md:h-80 rounded shadow-md animate-pulse" />
      </div>

      {/* Contenedor de información */}
      <div class="w-full md:w-2/3 md:pl-6">
        {/* Nombre y fecha */}
        <div class="flex flex-col md:flex-row items-start md:items-center mb-4 md:mb-2">
          {/* Nombre */}
          <div class="h-6 bg-gray-200 rounded w-2/3 md:w-1/3 animate-pulse mb-2 md:mb-0" />
          {/* Fecha */}
          <div class="h-4 bg-gray-200 rounded w-1/3 md:w-24 animate-pulse md:ml-auto" />
        </div>

        {/* Contenedor del comentario */}
        <div class="bg-gray-100 p-4 rounded w-full">
          {/* Líneas de texto simuladas */}
          <div class="space-y-2">
            <div class="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div class="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
            <div class="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
 }