import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { ScrollLink } from "react-scroll";
import { ChevronRight, DownloadIcon } from "lucide-react";

function HomeSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('/background.jpg')` }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Hola, Soy{" "}
          <span className="text-blue-600 dark:text-blue-400">Erick Segura</span>
        </h1>
        <h2 className="text-2xl md:text-4xl mb-8">
          Soy{" "}
          <Typewriter
            words={[
              "Full-Stack Developer",
              "Explorador de Nuevas Tecnologías",
              "Cristiano Romanos 1:16",
              "Solucionador",
            ]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h2>
        <div className="flex items-center justify-center mt-4">
          <a
            href="https://www.mediafire.com/file/2l664n8i732pqpl/vitaeEsNov.pdf/file"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800 transition duration-200"
          >
            <DownloadIcon className="mr-2" />
            Descargar CV
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export default HomeSection;
