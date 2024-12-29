// src/utils/formatters.ts
export const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const calculateDiscountedPrice = (price: number, discount: number): number => {
  return discount > 0 ? price - (price * (discount / 100)) : price;
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};