// src/data/products.ts

// Interfaz para las tallas
export interface Size {
  size: string;
  stock: number;
}

// Enum para tipos de productos
export enum ProductType {
  SUPERIOR = 'superior',
  INFERIOR = 'inferior',
  ACCESORIO = 'accesorio'
}

// Interfaz para los productos
export interface Product {
  description: string;
  discount?: boolean;
  gender?: 'hombre' | 'mujer' | 'unisex';
  images: string[];
  ogimage?: string;
  link?: string;
  measurements?: string;
  name: string;
  price: number;
  shortDescription?: string;
  sizes: Size[];
  slug: string;
  stock: number;
  type?: ProductType;
}

// Lista de productos
export const products: Product[] = [
  {
    description: 'Cómodamente constante y casualmente elegante, puedes usar Crest en cualquier lugar y combinarlo con todo. Logo bordado duradero que resistirá cada uso. Tela de algodón suave y cómoda. TALLA Y AJUSTE Ajuste regular. El modelo mide 1.85 m y usa talla M. MATERIALES Y CUIDADO 100% Algodón.',
    gender: 'hombre',
    images: ['long-sleeve/images/GRIS/1.webp', 'long-sleeve/images/GRIS/2.webp', 'long-sleeve/images/GRIS/3.webp', 'long-sleeve/images/GRIS/4.webp'],
    ogimage: 'long-sleeve/images/GRIS/jpg/1.jpg',
    link: 'https://www.gymshark.com/products/gymshark-crest-long-sleeve-t-shirt-light-grey-marl-aw23',
    measurements: 'Largo: 70cm, Ancho: 50cm',
    name: 'Crest Long Sleeve T-Shirt',
    price: 29990,
    shortDescription: 'Polera gris manga larga, cómoda y elegante para cualquier ocasión.',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 1 },
      { size: 'L', stock: 1 },
      { size: 'XL', stock: 0 },
    ],
    slug: 'polera-gris-manga-larga',
    stock: 2,
    type: ProductType.ACCESORIO,
  },
  {
    description: 'Cómodamente constante y casualmente elegante, puedes usar Crest en cualquier lugar y combinarlo con todo. Logo bordado duradero que resistirá cada uso. Tela de algodón suave y cómoda. TALLA Y AJUSTE Ajuste regular. El modelo mide 1.85 m y usa talla M. MATERIALES Y CUIDADO 100% Algodón.',
    gender: 'hombre',
    images: ['long-sleeve/images/NEGRO/1.webp', 'long-sleeve/images/NEGRO/2.webp', 'long-sleeve/images/NEGRO/3.webp', 'long-sleeve/images/NEGRO/4.webp', 'long-sleeve/images/NEGRO/5.webp', ],
    ogimage: 'long-sleeve/images/NEGRO/jpg/1.jpg',
    link: 'https://row.gymshark.com/products/gymshark-crest-long-sleeve-t-shirt-black-ss22',
    measurements: 'Largo: 70cm, Ancho: 50cm',
    name: 'Crest Long Sleeve T-Shirt',
    price: 29990,
    shortDescription: 'Polera negra manga larga, resistente y estilizada para un look casual duradero.',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 8 },
      { size: 'L', stock: 0 },
      { size: 'XL', stock: 0 },
    ],
    slug: 'polera-negra-manga-larga',
    stock: 8,
    type: ProductType.SUPERIOR,
  },
  {
    description: 'Cómodamente constante y casualmente elegante, puedes usar Crest en cualquier lugar y combinarlo con todo. Logo bordado duradero que resistirá cada uso. Tela de algodón suave y cómoda. TALLA Y AJUSTE Ajuste regular. El modelo mide 1.85 m y usa talla M. MATERIALES Y CUIDADO 100% Algodón.',
    gender: 'hombre',
    images: ['long-sleeve/images/BLANCO/1.webp', 'long-sleeve/images/BLANCO/2.webp', 'long-sleeve/images/BLANCO/3.webp', 'long-sleeve/images/BLANCO/4.webp', 'long-sleeve/images/BLANCO/5.webp',],
    ogimage: 'long-sleeve/images/BLANCO/jpg/1.jpg',
    link: 'https://www.gymshark.com/products/gymshark-crest-long-sleeve-t-shirt-light-grey-marl-aw23',
    measurements: 'Largo: 70cm, Ancho: 50cm',
    name: 'Crest Long Sleeve T-Shirt',
    price: 29990,
    shortDescription: 'Polera blanca manga larga, suave y cómoda para un estilo elegante y casual.',
    sizes: [
      { size: 'S', stock: 0 },
      { size: 'M', stock: 1 },
      { size: 'L', stock: 2 },
      { size: 'XL', stock: 2 },
    ],
    slug: 'polera-blanca-manga-larga',
    stock: 2,
    type: ProductType.SUPERIOR,
  },
  {
    description: 'Cómodamente constante y casualmente elegante, puedes usar Crest en cualquier lugar y combinarlo con todo. Logo bordado duradero que resistirá cada uso. Tela de algodón suave y cómoda. TALLA Y AJUSTE Ajuste regular. El modelo mide 1.85 m y usa talla M. MATERIALES Y CUIDADO 100% Algodón.',
    gender: 'hombre',
    images: ['long-sleeve/images/NAVY/1.webp', 'long-sleeve/images/NAVY/2.webp'],
    ogimage: 'long-sleeve/images/NAVY/jpg/1.jpg',
    link: 'https://row.gymshark.com/products/gymshark-crest-long-sleeve-t-shirt-navy-aw22',
    measurements: 'Largo: 70cm, Ancho: 50cm',
    name: 'Crest Long Sleeve T-Shirt',
    price: 29990,
    shortDescription: 'Polera navy manga larga, elegante y duradera para un look casual sofisticado.',
    sizes: [
      { size: 'S', stock: 2 },
      { size: 'M', stock: 0 },
      { size: 'L', stock: 0 },
      { size: 'XL', stock: 0 },
    ],
    slug: 'polera-navy-manga-larga',
    stock: 2,
    type: ProductType.SUPERIOR,
  },
  {
    description: 'Cómodamente constante y casualmente elegante, puedes usar Crest en cualquier lugar y combinarlo con todo. Logo bordado duradero que resistirá cada uso. Tela de algodón suave y cómoda. TALLA Y AJUSTE Ajuste regular. El modelo mide 1.85 m y usa talla M. MATERIALES Y CUIDADO 100% Algodón.',
    gender: 'hombre',
    images: ['long-sleeve/images/BLUE/1.webp', 'long-sleeve/images/BLUE/2.webp', 'long-sleeve/images/BLUE/3.webp', 'long-sleeve/images/BLUE/4.webp'],
    ogimage: 'long-sleeve/images/BLUE/jpg/1.jpg',
    link: 'https://www.gymshark.com/products/gymshark-crest-long-sleeve-t-shirt-light-grey-marl-aw23',
    measurements: 'Largo: 70cm, Ancho: 50cm',
    name: 'Crest Long Sleeve T-Shirt',
    price: 29990,
    shortDescription: 'Polera azul manga larga, fresca y cómoda para un estilo casual diario.',
    sizes: [
      { size: 'S', stock: 1 },
      { size: 'M', stock: 3 },
      { size: 'L', stock: 0 },
      { size: 'XL', stock: 0 },
    ],
    slug: 'polera-azul-manga-larga',
    stock: 2,
    type: ProductType.SUPERIOR,
  },

  // Impact Tank
  {
    description: 'Confiable. Práctico. Poderoso. Impact está listo para levantamientos exhaustivos una y otra vez. • El dobladillo sumergido y las costuras anguladas acentúan tu físico • Material ligero para cero distracciones • Corte clásico de sisa profunda para ese bombeo del día de brazos • Gráfico de Gymshark en contraste audaz TALLA Y AJUSTE • Ajuste ceñido • El modelo mide 185 cm y usa talla XL MATERIALES Y CUIDADO • 64% Algodón, 33% Poliéster, 3% Elastano',
    gender: 'hombre',
    images: ['impact-tank/images/BLACK/1.webp', 'impact-tank/images/BLACK/2.webp', 'impact-tank/images/BLACK/3.webp', 'impact-tank/images/BLACK/4.webp', 'impact-tank/images/BLACK/5.webp',  'impact-tank/images/BLACK/6.webp'],
    ogimage: 'impact-tank/images/BLACK/jpg/1.jpg',
    link: 'https://row.gymshark.com/products/gymshark-impact-drop-arm-tank-black-ss24',
    measurements: 'Largo: 70cm, Ancho: 50cm',
    name: 'Polera sin mangas Impact Drop Arm Tank',
    price: 24990,
    shortDescription: 'Impact: ligero, resistente y diseñado para resaltar tu físico con corte ceñido y gráfico Gymshark audaz. 64% algodón, 33% poliéster, 3% elastano.',
    sizes: [
      { size: 'S', stock: 1 },
      { size: 'M', stock: 4 },
      { size: 'L', stock: 4 },
      { size: 'XL', stock: 0 },
    ],
    slug: 'impact-tank-negra',
    stock: 2,
    type: ProductType.SUPERIOR,
  },





  // Estructura de producto
  // {
  //   description: '',
  //   discount: false,
  //   gender: 'hombre',
  //   images: [
  //     '/images/default1.jpg',
  //     '/images/default2.jpg',
  //   ],
  //   link: '',
  //   measurements: '',
  //   name: '',
  //   price: 0,
  //   shortDescription: '',
  //   sizes: [
  //     { size: 'S', stock: 0 },
  //     { size: 'M', stock: 0 },
  //     { size: 'L', stock: 0 },
  //     { size: 'XL', stock: 0 },
  //   ],
  //   slug: '',
  //   stock: 0,
  //   type: 'superior',
  // }

  // Agrega más productos según tus imágenes
];
