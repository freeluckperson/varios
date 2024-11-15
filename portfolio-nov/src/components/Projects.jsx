import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const proyectos = [
  {
    id: 1,
    title: "Plataforma E-commerce",
    description:
      "Una solución completa de comercio electrónico con React y Node.js",
  },
  {
    id: 2,
    title: "Chatbot de IA",
    description:
      "Un chatbot inteligente impulsado por algoritmos de aprendizaje automático",
  },
  {
    id: 3,
    title: "App de Fitness Móvil",
    description:
      "Una app de React Native para rastrear entrenamientos y nutrición",
  },
  {
    id: 4,
    title: "Gestor de Tareas",
    description: "Aplicación para la gestión de tareas con React y Firebase",
  },
  {
    id: 5,
    title: "Sistema de Inventario",
    description: "Sistema de control de inventarios para pequeñas empresas",
  },
  {
    id: 6,
    title: "Blog Personal",
    description: "Un blog creado con Next.js y Markdown",
  },
];

function Projects() {
  const [paginaActual, setPaginaActual] = useState(0);
  const proyectosPorPagina = 3;

  const numeroPaginas = Math.ceil(proyectos.length / proyectosPorPagina);
  const indiceInicial = paginaActual * proyectosPorPagina;
  const proyectosPagina = proyectos.slice(
    indiceInicial,
    indiceInicial + proyectosPorPagina
  );

  const paginaSiguiente = () =>
    setPaginaActual((prev) => (prev + 1) % numeroPaginas);
  const paginaAnterior = () =>
    setPaginaActual((prev) => (prev - 1 + numeroPaginas) % numeroPaginas);

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8 text-center">Proyectos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {proyectosPagina.map((proyecto, index) => (
            <motion.div
              key={proyecto.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={`/placeholder.svg?text=Project ${proyecto.id}`}
                alt={proyecto.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{proyecto.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {proyecto.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Ver Proyecto <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={paginaAnterior}
            className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-md mx-2"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={paginaSiguiente}
            className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-md mx-2"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Projects;