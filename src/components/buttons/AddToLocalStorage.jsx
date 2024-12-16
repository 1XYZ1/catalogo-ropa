// AddToLocalStorage.jsx
import { createSignal } from "solid-js";

export default function AddToLocalStorage(props) {
  const { product, seleccion, onAddToCart } = props; // Recibimos talla y cantidad desde el componente padre
  const [modalVisible, setModalVisible] = createSignal(false);

  const addToLocalStorage = () => {
    try {
      const { talla, cantidad } = seleccion(); // Evaluar la función seleccion
      const storedProducts = JSON.parse(localStorage.getItem("favorites")) || [];
      const storedProduct = storedProducts.find((p) => p.slug === product.slug);

      if (storedProduct) {
        const existingPurchase = storedProduct.compra.find((c) => c.talla === talla);

        if (existingPurchase) {
          // Sumar cantidad seleccionada a la talla existente
          existingPurchase.cantidad += cantidad;
        } else {
          // Agregar nueva talla y cantidad
          storedProduct.compra.push({ talla, cantidad });
        }
      } else {
        // Producto nuevo con la talla y cantidad seleccionada
        storedProducts.push({ ...product, compra: [{ talla, cantidad }] });
      }

      // Actualizar el localStorage
      localStorage.setItem("favorites", JSON.stringify(storedProducts));

      // Llamar al callback para actualizar el stock dinámico
      onAddToCart(talla, cantidad);

      // Emitir un evento para notificar cambios en favoritos
      const event = new Event("favorites-updated");
      window.dispatchEvent(event);

      // Mostrar modal de confirmación
      setModalVisible(true);
      setTimeout(() => setModalVisible(false), 1500);
    } catch (error) {
      console.error("Error al actualizar el localStorage:", error);
    }
  };

  return (
    <div class="relative">
      <button
        onClick={addToLocalStorage}
        class={`group py-3 px-6 mt-6 rounded-lg w-64 text-center transition duration-300 focus:outline-none transform bg-gradient-to-t from-gray-800 via-gray-900 to-black hover:from-green-700 hover:via-green-800 hover:to-green-900`}
      >
        Agregar Producto
      </button>
      {modalVisible() && (
        <div
          class={`fixed top-0 left-0 w-full bg-green-300 shadow-md rounded-b-md p-5 transform transition-transform duration-300 translate-y-0 opacity-100`}
          style="z-index: 1000;"
        >
          <p class="text-gray-800 font-medium text-center">
            Producto agregado correctamente 🎉
          </p>
        </div>
      )}
    </div>
  );
}