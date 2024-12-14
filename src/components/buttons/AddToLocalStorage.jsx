import { createSignal, onMount } from "solid-js";

export default function AddToLocalStorage(props) {
  // Estado para verificar si el producto ya está en favoritos
  const [isAdded, setIsAdded] = createSignal(false);

  // Al cargar el componente, verificar si el producto ya está en favoritos
  onMount(() => {
    const storedProducts = JSON.parse(localStorage.getItem("favorites")) || [];
    // Actualizar el estado `isAdded` según si el producto ya está en favoritos
    setIsAdded(storedProducts.some((product) => product.id === props.product.id));
  });

  // Manejar clics en el botón para agregar o eliminar del localStorage
  const toggleLocalStorage = (event) => {
    try {
      // Obtener los productos guardados en `favorites` del localStorage
      const storedProducts = JSON.parse(localStorage.getItem("favorites")) || [];

      if (isAdded()) {
        // Si el producto está agregado, eliminarlo de `favorites`
        const updatedProducts = storedProducts.filter(
          (product) => product.id !== props.product.id
        );
        localStorage.setItem("favorites", JSON.stringify(updatedProducts));
        setIsAdded(false); // Cambiar estado a "no agregado"
      } else {
        // Si el producto no está agregado, agregarlo a `favorites`
        storedProducts.push(props.product);
        localStorage.setItem("favorites", JSON.stringify(storedProducts));
        setIsAdded(true); // Cambiar estado a "agregado"
      }

      // Quitar el estado de foco después del clic
      event.target.blur();

      // Eliminar cualquier clase de `hover` que pueda quedar activa en el botón
      event.target.classList.remove("hover:bg-green-600", "hover:bg-red-700");
    } catch (error) {
      console.error("Error al actualizar localStorage:", error); // Capturar errores en caso de que algo falle
    }
  };

  return (
    <button
      // Lógica para alternar entre agregar y eliminar al hacer clic
      onClick={toggleLocalStorage}
      // Clases dinámicas para manejar estilos según el estado
      class={`group px-4 py-2 rounded min-w-[150px] text-center transition duration-300 focus:outline-none ${
        isAdded()
          ? "bg-red-600 text-white hover:bg-red-700" // Estado "agregado": fondo rojo
          : "bg-gradient-to-t from-gray-800 from-10% via-gray-900 via-20% to-black to-80% text-white hover:bg-green-600" // Estado "no agregado": fondo negro
      }`}
    >
      {/* Texto dinámico según el estado */}
      {isAdded() ? "Eliminar Producto" : "Agregar Producto"}
    </button>
  );
}
