// Navbar.jsx
import { createSignal, Show } from "solid-js";
import FavoritesIcon from "./buttons/FavoritesIcon.jsx";

const MENU_ITEMS = [
 { path: '/', label: 'Inicio' },
//  { path: '/reviews', label: 'Reseñas' },
 { path: '/contacto', label: 'Contacto' },
 { path: '/faqs', label: 'Preguntas Frecuentes' }
];

function Navbar() {
 const [isMenuOpen, setIsMenuOpen] = createSignal(false);

 const toggleMenu = () => {
   setIsMenuOpen(!isMenuOpen());
   document.documentElement.classList.toggle('menu-open');
 };

 return (
   <nav class="fixed top-0 left-0 right-0 z-[100]">
     {/* Fondo del navbar con blur */}
     <div class="absolute inset-0 bg-white/80 backdrop-blur-md shadow-sm z-[-1]"></div>

     {/* Contenido del navbar */}
     <div class="relative container mx-auto px-4 h-16 flex items-center justify-between">
       {/* Logo */}
       <a
         href="/"
         class="text-2xl font-bold hover:text-gray-700 transition-all duration-200"
       >
         Shark Import
       </a>

       {/* Navegación Desktop con Favoritos integrado */}
       <div class="hidden md:flex items-center justify-center flex-1 gap-8 ml-8">
         {MENU_ITEMS.map(item => (

           <a  href={item.path}
             class="relative text-gray-600 hover:text-black transition-all duration-200 py-2 group"
           >
             {item.label}
             <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
           </a>
         ))}
       </div>

       {/* Favoritos Desktop */}
       <div class="hidden md:block">
         <a
           href="/favorites"
           class="p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
           aria-label="Ver favoritos"
         >
           <FavoritesIcon />
         </a>
       </div>

       {/* Controles Mobile */}
       <div class="flex items-center gap-4 md:hidden">
         <a
           href="/favorites"
           class="p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
           aria-label="Ver favoritos"
         >
           <FavoritesIcon />
         </a>

         <button
           onClick={toggleMenu}
           class="p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
           aria-label={isMenuOpen() ? 'Cerrar menú' : 'Abrir menú'}
         >
           <div class="w-6 h-5 flex flex-col justify-between">
             <span
               class={`w-full h-0.5 bg-current transform transition-all duration-300 ${
                 isMenuOpen() ? 'rotate-45 translate-y-2' : ''
               }`}
             />
             <span
               class={`w-full h-0.5 bg-current transition-opacity duration-300 ${
                 isMenuOpen() ? 'opacity-0' : ''
               }`}
             />
             <span
               class={`w-full h-0.5 bg-current transform transition-all duration-300 ${
                 isMenuOpen() ? '-rotate-45 -translate-y-2' : ''
               }`}
             />
           </div>
         </button>
       </div>
     </div>

     {/* Menú Mobile */}
     <Show when={isMenuOpen()}>
       {/* Overlay con blur */}
       <div
         class="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden transition-all duration-300 z-[90]
           animate-fadeIn"
         onClick={toggleMenu}
       />

       {/* Panel del menú */}
       <div
         class={`fixed right-0 top-0 bottom-0 w-64 bg-white shadow-xl z-[110] transition-transform duration-300
           ${isMenuOpen() ? 'translate-x-0' : 'translate-x-full'}`}
         onClick={(e) => e.stopPropagation()}
       >
         {/* Contenido del menú */}
         <div class="flex-1 overflow-y-auto px-6 pt-20 pb-6">
           <div class="flex flex-col space-y-6">
             {MENU_ITEMS.map((item, index) => (

                <a href={item.path}
                 class="text-lg font-medium text-gray-800 hover:text-black transition-all duration-200
                   transform hover:translate-x-2 hover:scale-105 opacity-0 animate-fadeInSlide"
                 style={{ "animation-delay": `${index * 100}ms` }}
                 onClick={toggleMenu}
               >
                 {item.label}
               </a>
             ))}
           </div>
         </div>
       </div>
     </Show>
   </nav>
 );
}

export default Navbar;