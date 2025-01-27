// src/types/review.ts

// Enum para el feedback de talla
export enum Fit {
  SMALL = 'Queda pequeño',
  TRUE = 'Talla exacta',
  LARGE = 'Queda grande'
}

// Review específica del producto
export interface ProductReview {
  productId: string;
  productSlug: string;
  productName: string;     // Nombre formateado del producto
  date: string;           // Fecha específica de la review del producto
  rating: number;
  comment: string;
  fitFeedback: Fit;
  wearingSize: string;
  photos?: string[];
  color?: string;         // Color del producto comprado
  price?: number;         // Precio al momento de la compra
}

// Review principal
export interface Review {
  id: string;
  name: string;
  date: string;           // Fecha general de la review

  customerInfo?: {
    height: string;
    weight: string;
    usualSize: string;
  };

  generalRating: number;
  generalComment: string;
  productReviews: ProductReview[];
}

// Ejemplo de uso:
export const reviews: Review[] = [
  {
    id: '1',
    name: 'Sigal',
    date: '2024-01-05',
    customerInfo: {
      height: '1.75m',
      weight: '70kg',
      usualSize: 'M'
    },
    generalRating: 5,
    generalComment: 'Excelente calidad en todos los productos y el servicio de entrega fue muy rápido.',
    productReviews: [
      {
        productId: 'crest-oversized-black',
        productSlug: 'crest-oversized-black',
        productName: 'Crest Oversized Fit',
        date: '2024-01-03',
        rating: 5,
        comment: 'El material es increíble y el fit oversized es perfecto.',
        fitFeedback: Fit.TRUE,
        wearingSize: 'M',
        photos: ['/reviews/sigal/sigal1.jpeg', '/reviews/sigal/sigal1.jpeg'],
        color: 'Negro',
        price: 40000
      },
      {
        productId: 'crest-oversized-navy',
        productSlug: 'crest-oversized-navy',
        productName: 'Crest Oversized Fit',
        date: '2024-01-04',
        rating: 5,
        comment: 'La calidad es consistente en todos los colores, excelente compra.',
        fitFeedback: Fit.TRUE,
        wearingSize: 'M',
        photos: ['/reviews/sigal/sigal1.jpeg', '/reviews/sigal/sigal1.jpeg'],
        color: 'Navy',
        price: 40000
      },
      {
        productId: 'crest-long-sleeve-black',
        productSlug: 'crest-long-sleeve-black',
        productName: 'Crest Long Sleeve T-Shirt',
        date: '2024-01-05',
        rating: 5,
        comment: 'Perfecta para el día a día, muy versátil.',
        fitFeedback: Fit.TRUE,
        wearingSize: 'M',
        photos: ['/reviews/sigal/sigal1.jpeg', '/reviews/sigal/sigal2.jpeg'],
        color: 'Negro',
        price: 30000
      }
    ]
  }
];