// AddToLocalStorage.jsx
import { createSignal, createMemo } from "solid-js";

export default function AddToLocalStorage(props) {
  const { product, seleccion, onAddToCart } = props; // Recibimos talla y cantidad desde el componente padre
  const [modalVisible, setModalVisible] = createSignal(false);
  const [fadeOut, setFadeOut] = createSignal(false);
  const [currentStock, setCurrentStock] = createSignal([...product.sizes]); // Copia del stock inicial

  // Verificar si hay stock disponible para la talla seleccionada
  const isStockAvailable = createMemo(() => {
    const { talla, cantidad } = seleccion(); // Obtener talla seleccionada
    const selectedSize = currentStock().find((size) => size.size === talla);
    return selectedSize ? selectedSize.stock >= cantidad : false;
  });

  const addToLocalStorage = () => {
    const { talla, cantidad } = seleccion();
    const selectedSize = currentStock().find((size) => size.size === talla);

    // Validar que haya suficiente stock antes de agregar
    if (!selectedSize || selectedSize.stock < cantidad) {
      alert("No hay suficiente stock disponible para esta talla.");
      return;
    }

    try {
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

      // Actualizar el stock dinámico local
      setCurrentStock((prevStock) =>
        prevStock.map((size) =>
          size.size === talla
            ? { ...size, stock: size.stock - cantidad }
            : size
        )
      );

      // Emitir un evento para notificar cambios en favoritos
      const event = new Event("favorites-updated");
      window.dispatchEvent(event);

      // Mostrar modal de confirmación
      setModalVisible(true);
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setModalVisible(false);
          setFadeOut(false);
        }, 300);
      }, 2000);
    } catch (error) {
      console.error("Error al actualizar el localStorage:", error);
    }
  };

  return (
    <div class="relative">
      <button
        onClick={addToLocalStorage}
        disabled={!isStockAvailable()} // Desactivar si no hay stock
        class={`text-white group py-3 px-6 mt-6 rounded-lg w-64 text-center transition duration-300 focus:outline-none transform bg-gradient-to-t from-gray-800 via-gray-900 to-black ${
          isStockAvailable()
            ? "hover:from-green-700 hover:via-green-800 hover:to-green-900"
            : "opacity-50 cursor-not-allowed"
        }`}
      >
        {isStockAvailable() ? "Agregar Producto" : "Talla agotada:("}
      </button>
      {modalVisible() && (
        <div
          class={`fixed top-5 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 w-11/12 max-w-sm z-50 transition-all duration-300 ${
            fadeOut() ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-bold text-gray-800">Producto Agregado 🎉</h2>
            <button
              class="text-gray-500 hover:text-gray-800 focus:outline-none"
              onClick={() => {
                setFadeOut(true);
                setTimeout(() => {
                  setModalVisible(false);
                  setFadeOut(false);
                }, 300);
              }}
            >
              ✕
            </button>
          </div>
          <div class="mt-4">
            <p class="text-gray-700 font-semibold">{product.name}</p>
            <p class="text-gray-500">Talla: {seleccion().talla}</p>
            <p class="text-gray-500">Cantidad: {seleccion().cantidad}</p>
          </div>
          <div class="mt-4 flex justify-end gap-4">
            <button
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              onClick={() => (window.location.href = "/favorites")}
            >
              Ir a Favoritos
            </button>
            <button
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              onClick={() => {
                setFadeOut(true);
                setTimeout(() => {
                  setModalVisible(false);
                  setFadeOut(false);
                }, 300);
              }}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
