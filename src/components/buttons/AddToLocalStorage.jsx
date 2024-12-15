import { createSignal, onMount } from "solid-js";

export default function AddToLocalStorage(props) {
  const [isAdded, setIsAdded] = createSignal(false);
  const [modalVisible, setModalVisible] = createSignal(false); // Controla las clases de animación

  // Verificar si el producto actual está en favoritos usando el slug
  onMount(() => {
    const storedProducts = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsAdded(
      storedProducts.some((product) => product.slug === props.product.slug)
    );
  });

  // Alternar producto en localStorage (agregar/eliminar) y mostrar modal
  const toggleLocalStorage = (event) => {
    try {
      const storedProducts = JSON.parse(localStorage.getItem("favorites")) || [];

      if (isAdded()) {
        // Eliminar producto del localStorage
        const updatedProducts = storedProducts.filter(
          (product) => product.slug !== props.product.slug // Filtrar por slug
        );
        localStorage.setItem("favorites", JSON.stringify(updatedProducts));
        setIsAdded(false);
      } else {
        // Obtener atributos seleccionados de talla y cantidad
        const { talla, cantidad } = props.seleccion;

        // Validar que los datos estén presentes
        if (!talla || !cantidad) {
          alert("Por favor selecciona talla y cantidad antes de agregar.");
          return;
        }

        // Agregar producto al localStorage con los datos seleccionados
        const productoConCompra = {
          ...props.product,
          compra: { talla, cantidad }, // Añadir atributos seleccionados
        };
        storedProducts.push(productoConCompra);
        localStorage.setItem("favorites", JSON.stringify(storedProducts));
        setIsAdded(true);
      }

      // Emitir un evento personalizado para notificar el cambio
      const eventFavoritesUpdated = new Event("favorites-updated");
      window.dispatchEvent(eventFavoritesUpdated);

      // Mostrar el modal con animación de entrada
      setModalVisible(true);
      setTimeout(() => setModalVisible(false), 1500); // Ocultar modal después de 1.5 segundos

      // Quitar el estado de foco después del clic
      event.target.blur();
    } catch (error) {
      console.error("Error al actualizar localStorage:", error);
    }
  };

  return (
    <div class="relative">
      {/* Botón */}
      <button
        onClick={toggleLocalStorage}
        class={`group py-3 px-6 mt-6 rounded-lg w-64 text-center transition duration-300 focus:outline-none transform ${
          isAdded()
            ? "text-white bg-gradient-to-t from-red-500 via-red-600 to-red-700 md:hover:from-red-700 md:hover:via-red-800 md:hover:to-red-900 md:active:scale-95"
            : "text-white bg-gradient-to-t from-gray-800 via-gray-900 to-black md:hover:from-green-700 md:hover:via-green-800 md:hover:to-green-900 md:active:scale-95"
        }`}
      >
        {isAdded() ? "Eliminar Producto" : "Agregar Producto"}
      </button>

      {/* Modal Push Notification */}
      <div
        class={`fixed top-0 left-0 w-full ${
          isAdded() ? "bg-green-300" : "bg-red-300"
        } shadow-md rounded-b-md p-5 transform transition-transform duration-300 ${
          modalVisible() ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
        style="z-index: 1000;"
      >
        <p class="text-gray-800 font-medium text-center">
          {isAdded()
            ? "Producto agregado a favoritos 🎉"
            : "Producto eliminado de favoritos ❌"}
        </p>
      </div>
    </div>
  );
}
