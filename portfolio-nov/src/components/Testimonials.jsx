import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonios = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO, Tech Inc.",
    text: "Un desarrollador excepcional que siempre entrega trabajo de alta calidad.",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Gerente de Proyecto, Soluciones Digitales",
    text: "Muy hábil y un placer trabajar con él. Siempre va más allá.",
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "CTO, Innovate Co.",
    text: "Habilidades impresionantes para resolver problemas y atención al detalle. Un valioso activo para cualquier equipo.",
  },
];

function Testimonials() {
  const [testimonioActual, setTestimonioActual] = useState(0);

  const siguienteTestimonio = () =>
    setTestimonioActual((prev) => (prev + 1) % testimonios.length);
  const testimonioAnterior = () =>
    setTestimonioActual(
      (prev) => (prev - 1 + testimonios.length) % testimonios.length
    );

  return (
    <section id="testimonials" className="py-20 bg-gray-100 dark:bg-gray-700">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8 text-center">Testimonios</h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonioActual}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-2xl mx-auto"
            >
              <p className="text-xl italic mb-4">
                "{testimonios[testimonioActual].text}"
              </p>
              <div className="flex items-center">
                <img
                  src={`/placeholder.svg?text=${testimonios[
                    testimonioActual
                  ].name.charAt(0)}`}
                  alt={testimonios[testimonioActual].name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">
                    {testimonios[testimonioActual].name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {testimonios[testimonioActual].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={testimonioAnterior}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={siguienteTestimonio}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
