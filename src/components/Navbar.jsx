// Navbar.jsx
import { createSignal } from 'solid-js';
import FavoritesIcon from './buttons/FavoritesIcon.jsx';

function Navbar() {
  const [menuOpen, setMenuOpen] = createSignal(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen());
  };

  return (
    <nav class="bg-white shadow fixed w-full z-20 top-0 left-0">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 class="text-2xl md:text-3xl font-bold">
          <a href="/">Shark Import</a>
        </h1>

        {/* Botón de menú para móviles */}
        <button class="block md:hidden focus:outline-none" onClick={toggleMenu}>
          {menuOpen() ? (
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12"/>
            </svg>
          ) : (
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          )}
        </button>

        {/* Menú de navegación para pantallas medianas y grandes */}


        <div class="hidden md:flex md:flex-1 md:justify-center md:items-center md:space-x-10 ">
          <a href="/" class="text-gray-700 hover:text-blue-500 text-xl">Inicio</a>
          <a href="/reviews" class="text-gray-700 hover:text-blue-500 text-xl">Reseñas</a>
          <a href="/contacto" class="text-gray-700 hover:text-blue-500 text-xl">Contacto</a>
          <a href="/faqs" class="text-gray-700 hover:text-blue-500 text-xl">Preguntas Frecuentes</a>
          {/* Añade más enlaces según sea necesario */}
        </div>

        <div class="hidden md:flex md:items-center md:mr-10">
  <a href="#" class="text-gray-700 hover:text-blue-500 text-xl"><FavoritesIcon/></a>
</div>
      </div>

      {/* Menú móvil de pantalla completa */}
      {menuOpen() && (
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10" onClick={toggleMenu}>
          <div class="bg-white w-3/4 h-3/4 rounded-lg p-4 flex flex-col items-center justify-center space-y-6" onClick={(e) => e.stopPropagation()}>
            <a href="/" class="text-gray-700 hover:text-blue-500 text-3xl font-bold text-center" onClick={toggleMenu}>Inicio</a>
            <a href="/reviews" class="text-gray-700 hover:text-blue-500 text-3xl font-bold text-center" onClick={toggleMenu}>Reseñas</a>
            <a href="/contacto" class="text-gray-700 hover:text-blue-500 text-3xl font-bold text-center" onClick={toggleMenu}>Contacto</a>
            <a href="/faqs" class="text-gray-700 hover:text-blue-500 text-3xl font-bold text-center" onClick={toggleMenu}>¿Preguntas?</a>

            {/* Añade más enlaces según sea necesario */}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;