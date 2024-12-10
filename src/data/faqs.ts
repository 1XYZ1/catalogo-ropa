// src/data/faqs.ts

export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQCategory {
  title: string;
  faqs: FAQ[];
}

export const faqCategories: FAQCategory[] = [
  {
    title: "Pedidos",
    faqs: [
      {
        question: "¿Cómo realizo un pedido?",
        answer: "Agrega los productos a tu carrito y procede al pago."
      },
      {
        question: "¿Puedo modificar mi pedido después de realizarlo?",
        answer: "Sí, contáctanos lo antes posible para modificarlo si aún no ha sido enviado."
      }
    ]
  },
  {
    title: "Pagos",
    faqs: [
      {
        question: "¿Cuáles son los métodos de pago disponibles?",
        answer: "Aceptamos tarjetas, transferencias y pagos en línea seguros."
      },
      {
        question: "¿Es seguro pagar en su sitio web?",
        answer: "Sí, utilizamos plataformas de pago seguras y protección de datos."
      }
    ]
  },
  {
    title: "Envíos",
    faqs: [
      {
        question: "¿Cuál es el tiempo de entrega?",
        answer: "Generalmente entre 3-7 días hábiles según tu ubicación."
      },
      {
        question: "¿Realizan envíos internacionales?",
        answer: "Sí, realizamos envíos a varios países. Consulta disponibilidad al final del proceso de compra."
      }
    ]
  },
  {
    title: "Devoluciones",
    faqs: [
      {
        question: "¿Puedo devolver o cambiar un producto?",
        answer: "Sí, tienes 14 días desde la recepción para solicitar cambios o devoluciones."
      }
    ]
  }
];
