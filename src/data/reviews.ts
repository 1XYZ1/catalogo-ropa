// src/data/reviews.ts

export interface Review {
  name: string;
  date: string;
  rating: number;
  comment: string;
  productImage?: string; // Nueva propiedad
}


export const reviews: Review[] = [
  {
    name: 'Juan Pérez',
    date: '2023-10-01',
    rating: 5,
    comment: '¡Excelente servicio y productos de alta calidad!',
    productImage: '/images/GRIS/crest-grey-1.webp'
  },

  {
    name: 'María Gómez',
    date: '2023-09-28',
    rating: 4,
    comment: 'Me encantó la variedad de prendas. Volveré a comprar.',
    productImage: '/images/GRIS/crest-grey-1.webp'
  },
  {
    name: 'Carlos Sánchez',
    date: '2023-09-15',
    rating: 5,
    comment: 'Entrega rápida y atención al cliente excepcional.',
    productImage: '/images/GRIS/crest-grey-1.webp'
  },
  // Agrega más reseñas según lo desees
];
