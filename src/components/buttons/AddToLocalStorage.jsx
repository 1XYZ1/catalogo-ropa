import { createSignal } from "solid-js";

export default function AddToLocalStorage(props) {
  const { product, seleccion, onAddToCart } = props;
  const [modalVisible, setModalVisible] = createSignal(false);

  const addToLocalStorage = () => {
    try {
      const storedProducts = JSON.parse(localStorage.getItem("favorites")) || [];
      const storedProduct = storedProducts.find((p) => p.slug === product.slug);

      if (storedProduct) {
        const existingPurchase = storedProduct.compra.find((c) => c.talla === seleccion.talla);

        if (existingPurchase) {
          // Sumar cantidad seleccionada
          existingPurchase.cantidad += seleccion.cantidad;
        } else {
          // Agregar nueva talla
          storedProduct.compra.push(seleccion);
        }
      } else {
        storedProducts.push({ ...product, compra: [seleccion] });
      }

      localStorage.setItem("favorites", JSON.stringify(storedProducts));
      onAddToCart(seleccion.talla, seleccion.cantidad);

      setModalVisible(true);
      setTimeout(() => setModalVisible(false), 1500);
    } catch (error) {
      console.error("Error al actualizar localStorage:", error);
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
