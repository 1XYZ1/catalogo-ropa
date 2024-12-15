import { createSignal, onMount } from "solid-js";

export default function FavoritesPage() {
  const [favorites, setFavorites] = createSignal([]);

  // Cargar los productos favoritos del localStorage
  onMount(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  });

  // Eliminar un producto de favoritos
  const removeFavorite = (slug) => {
    const updatedFavorites = favorites().filter((product) => product.slug !== slug);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);

    // Emitir un evento personalizado para actualizar otros componentes si es necesario
    const eventFavoritesUpdated = new Event("favorites-updated");
    window.dispatchEvent(eventFavoritesUpdated);
  };

  return (
    <div class="max-w-4xl mx-auto p-6">

      {favorites().length === 0 ? (
        <p class="text-gray-500 text-center">No tienes productos en favoritos.</p>
      ) : (
        <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {favorites().map((product) => (
            <div
              key={product.slug}
              class="flex flex-col border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full relative"
              id={product.slug}
            >
              <div class="flex flex-row relative">
                <a
                  href={`/producto/${product.slug}`}
                  class="flex-1"
                >
                  {/* Imagen del producto */}
                  <img
                    loading="lazy"
                    width="400"
                    height="400"
                    src={product.images[0]}
                    alt={product.name}
                    class="w-full h-full object-cover opacity-0 hover:scale-105 transition-all duration-300"
                    onLoad={(e) => e.target.classList.add("opacity-100")}
                  />
                </a>


              </div>

              {/* Información del producto */}
              <div class="p-4 flex flex-col flex-1">
                <h3 class="text-xl font-bold text-center mb-2">{product.name}</h3>

                <p
                  class={`text-sm text-center mb-4 ${
                    product.discount ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  ${product.price.toLocaleString("es-ES")}
                </p>

                {/* Botón */}
                <div class="mt-auto flex justify-center">
                  <a
                    href={`/producto/${product.slug}`}
                    class="group relative inline-block"
                  >
                    <button class="relative w-64 bg-gradient-to-t from-black from-10% via-gray-900 via-80% to-gray-800 to-90% text-white py-3 px-6 rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-105">
                      <span class="absolute inset-0 w-full h-full bg-gradient-to-b from-green-900 from-20% via-gray-800 via-40% to-black to-90% opacity-0 group-hover:opacity-30 transition-opacity duration-500"></span>
                      <span class="relative z-10 text-sm font-medium tracking-widest">
                        Ver Detalles
                      </span>
                      <span class="absolute -inset-0.5 border-2 border-transparent rounded-lg group-hover:border-gray-600 transition-all duration-300"></span>
                    </button>
                  </a>
                </div>
              </div>

              {/* Botón de eliminar */}
              <button
  class="absolute top-2 right-2 bg-transparent text-black text-lg font-bold rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-300"
  onClick={(e) => {
    e.stopPropagation(); // Prevenir el redireccionamiento al tocar el botón
    removeFavorite(product.slug);
  }}
>
  ✕
</button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
