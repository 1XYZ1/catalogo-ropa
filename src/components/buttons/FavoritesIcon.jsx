import { createSignal, onMount } from "solid-js";

export default function FavoritesIcon() {
  const [favoritesCount, setFavoritesCount] = createSignal(0);

  // Cargar los favoritos del localStorage al montar el componente
  onMount(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoritesCount(storedFavorites.length);
  });

  return (
    <div
      class="relative inline-block cursor-pointer transform transition-transform duration-300 hover:scale-110"
      title={`Favoritos: ${favoritesCount()}`}
    >
      {/* Corazón SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class={`w-8 h-8 transition-colors ${
          favoritesCount() > 0 ? "fill-red-500" : "fill-gray-400"
        } hover:fill-red-600`}
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>

      {/* Número de favoritos */}
      {favoritesCount() > 0 && (
        <span class="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {favoritesCount()}
        </span>
      )}
    </div>
  );
}
