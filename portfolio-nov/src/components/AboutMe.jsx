import { motion } from "framer-motion";

function AboutMe() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8 text-center">Sobre mí</h2>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mb-8 md:mb-0"
          >
            <img
              src="/placeholder.svg?height=400&width=400"
              alt="Profile"
              className="rounded-full w-64 h-64 mx-auto md:mx-0 shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            <p className="text-lg mb-4">
              ¡Hola! Soy un desarrollador full-stack apasionado con más de 3
              años de experiencia.
            </p>
            <p className="text-lg mb-4">
              Me especializo en ecosistemas de JavaScript, particularmente en
              React para el front-end...
            </p>
            <p className="text-lg">
              Cuando no estoy programando, puedes encontrarme explorando nuevas
              tecnologías...
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
