// ProductDetail.jsx
import { createSignal, onMount } from "solid-js";
import AddToLocalStorage from "./buttons/AddToLocalStorage";

export default function ProductDetail(props) {
  const { product } = props;

  const initialSize = product.sizes.find((s) => s.stock > 0)?.size ?? product.sizes[0].size;
  const [selectedSize, setSelectedSize] = createSignal(initialSize);
  const [selectedQuantity, setSelectedQuantity] = createSignal(1);
  const [dynamicStock, setDynamicStock] = createSignal({});

  const calculateStockFromLocalStorage = () => {
    const storedProducts = JSON.parse(localStorage.getItem("favorites")) || [];
    const storedProduct = storedProducts.find((p) => p.slug === product.slug);

    const updatedStock = product.sizes.reduce((acc, size) => {
      const compra = storedProduct?.compra?.find((c) => c.talla === size.size);
      const remainingStock = size.stock - (compra?.cantidad || 0);
      acc[size.size] = Math.max(remainingStock, 0);
      return acc;
    }, {});

    setDynamicStock(updatedStock);
  };

  onMount(() => {
    calculateStockFromLocalStorage();

    // Actualizar el stock cuando el localStorage cambia
    const handleStorageChange = () => calculateStockFromLocalStorage();
    window.addEventListener("favorites-updated", handleStorageChange);

    return () => window.removeEventListener("favorites-updated", handleStorageChange);
  });

  const getSelectedStock = () => dynamicStock()[selectedSize()] || 0;

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setSelectedQuantity(1); // Resetear cantidad al cambiar talla
  };

  const updateQuantity = (delta) => {
    const newQuantity = Math.min(
      Math.max(selectedQuantity() + delta, 1),
      getSelectedStock()
    );
    setSelectedQuantity(newQuantity);
  };

  return (
    <div class="max-w-4xl mx-auto p-6">
      <h1 class="text-3xl font-bold mb-3">{product.name}</h1>
      <p class="text-2xl text-gray-800 mb-4">Precio: ${product.price.toLocaleString("es-ES")}</p>

      <details class="group border-t pt-4 mb-6">
        <summary class="flex justify-between items-center cursor-pointer list-none">
          <span class="text-lg font-semibold text-gray-700">Descripción</span>
          <svg
            class="w-5 h-5 transition-transform duration-200 group-open:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </summary>
        <p class="mt-3 text-gray-700">{product.description}</p>
      </details>

      <div class="mb-6">
        <dt class="text-sm font-medium text-gray-500">Stock Disponible</dt>
        <dd class="mt-1 text-sm text-gray-900">
          {getSelectedStock() > 0 ? `${getSelectedStock()} unidades` : "Agotado"}
        </dd>
      </div>

      <div class="mb-6">
        <dt class="text-sm font-medium text-gray-500">Tallas Disponibles</dt>
        <dd class="mt-1 text-sm">
          <div class="flex space-x-2">
            {product.sizes.map((sz) => (
              <button
                class={`px-4 py-2 rounded border transition-colors duration-200 ${
                  sz.size === selectedSize()
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-800 border-gray-300"
                } ${
                  dynamicStock()[sz.size] === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:border-blue-600"
                }`}
                onClick={() => dynamicStock()[sz.size] > 0 && handleSizeChange(sz.size)}
              >
                {sz.size}
              </button>
            ))}
          </div>
        </dd>
      </div>

      <div class="mb-6">
        <dt class="text-sm font-medium text-gray-500">Cantidad</dt>
        <dd class="mt-1 text-sm">
          <div class="flex items-center space-x-4">
            <button
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 active:bg-gray-400 transition-all duration-200"
              onClick={() => updateQuantity(-1)}
              disabled={selectedQuantity() <= 1}
            >
              -
            </button>
            <span class="px-4 py-2 border rounded text-center">{selectedQuantity()}</span>
            <button
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 active:bg-gray-400 transition-all duration-200"
              onClick={() => updateQuantity(1)}
              disabled={selectedQuantity() >= getSelectedStock()}
            >
              +
            </button>
          </div>
        </dd>
      </div>

      <div class="flex justify-center items-center space-x-4 mt-10">
        <AddToLocalStorage
          product={product}
          seleccion={() => ({ talla: selectedSize(), cantidad: selectedQuantity() })}
          onAddToCart={(talla, cantidad) => {
            setDynamicStock((prevStock) => ({
              ...prevStock,
              [talla]: Math.max((prevStock[talla] || 0) - cantidad, 0),
            }));
          }}
        />
      </div>
    </div>
  );
}