// AddToLocalStorage.jsx
import { createSignal, createMemo } from "solid-js";

export default function AddToLocalStorage(props) {
  const { product, seleccion, onAddToCart } = props; // Recibimos talla y cantidad desde el componente padre
  const [modalVisible, setModalVisible] = createSignal(false);
  const [fadeOut, setFadeOut] = createSignal(false);
  const [currentStock, setCurrentStock] = createSignal([...product.sizes]); // Copia del stock inicial

  // Verificar si hay stock disponible para la talla seleccionada
  const isStockAvailable = createMemo(() => {
    const { talla, cantidad } = seleccion();
    // Si no hay talla seleccionada, retornamos false
    if (!talla) return false;
    const selectedSize = currentStock().find((size) => size.size === talla);
    return selectedSize ? selectedSize.stock >= cantidad : false;
  });

  const getButtonText = createMemo(() => {
    const { talla } = seleccion();
    if (!talla) return "Selecciona una talla";
    return isStockAvailable() ? "Agregar Producto" : "Talla agotada:(";
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
      }, 4000);
    } catch (error) {
      console.error("Error al actualizar el localStorage:", error);
    }
  };

  return (
    <div class="relative">
      <button
        onClick={addToLocalStorage}
        disabled={!isStockAvailable()}
        class={`text-white group py-3 px-6 mt-6 rounded-lg w-64 text-center transition-all duration-300 focus:outline-none transform ${
          isStockAvailable()
            ? "bg-black hover:bg-gray-900 active:scale-95"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {getButtonText()}
      </button>

      {/* Overlay con blur */}
      {modalVisible() && (
        <div class="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => {
            setFadeOut(true);
            setTimeout(() => {
              setModalVisible(false);
              setFadeOut(false);
            }, 300);
          }}
        />
      )}

      {/* Modal Mejorado */}
      {modalVisible() && (
        <div
          class={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          bg-white shadow-2xl rounded-2xl w-11/12 max-w-md z-50
          transition-all duration-300 ${
            fadeOut()
              ? "opacity-0 scale-95"
              : "opacity-100 scale-100"
          }`}
        >
          {/* Header */}
          <div class="p-6 border-b border-gray-100">
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-3">
                <div class="bg-green-100 p-2 rounded-full">
                  <svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 class="text-xl font-bold text-gray-900">¡Agregado a favoritos!</h2>
              </div>
              <button
                class="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setFadeOut(true);
                  setTimeout(() => {
                    setModalVisible(false);
                    setFadeOut(false);
                  }, 300);
                }}
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Contenido */}
          <div class="p-4">
  <div class="flex gap-4">
    {/* Contenedor de imagen */}
    <div class="relative w-24 aspect-[3/4] overflow-hidden rounded-lg shadow-sm bg-gray-50">
      <img
        src={product.images[0]}
        alt={product.name}
        class="w-full h-full object-cover"
      />
    </div>

    {/* Información del producto */}
    <div class="flex-1 min-w-0"> {/* min-w-0 para evitar overflow */}
      <h3 class="font-medium text-gray-900 truncate">{product.name}</h3>

      <div class="mt-1 space-y-0.5">
        <p class="text-sm text-gray-500">
          Color: <span class="text-gray-900">{product.color}</span>
        </p>
        <p class="text-sm text-gray-500">
          Talla: <span class="text-gray-900">{seleccion().talla}</span>
        </p>
        <p class="text-sm text-gray-500">
          Cantidad: <span class="text-gray-900">{seleccion().cantidad}</span>
        </p>

        {/* Precios */}
        {product.discount > 0 ? (
          <div class="mt-2">
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-500 line-through">
                ${product.price.toLocaleString('es-ES')}
              </span>
              <span class="text-xs font-medium text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                {product.discount}% OFF
              </span>
            </div>
            <p class="text-base font-medium text-red-600 mt-0.5">
              ${(product.price * (1 - product.discount/100)).toLocaleString('es-ES')}
            </p>
          </div>
        ) : (
          <p class="mt-2 text-base font-medium text-gray-900">
            ${product.price.toLocaleString('es-ES')}
          </p>
        )}
      </div>
    </div>
  </div>

  {/* Botones */}

</div>

          {/* Acciones */}
          <div class="p-6 bg-gray-50 rounded-b-2xl border-t border-gray-100">
  <div class="flex gap-3 justify-end">
    <button
      class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
      onClick={() => {
        setFadeOut(true);
        setTimeout(() => {
          setModalVisible(false);
          setFadeOut(false);
        }, 500);
      }}
    >
      Seguir comprando
    </button>
    <button
      class="px-5 py-2.5 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-900 transition-colors duration-200"
      onClick={() => (window.location.href = "/favorites")}
    >
      Ver favoritos
    </button>
  </div>
</div>
        </div>
      )}
    </div>
  );
}
