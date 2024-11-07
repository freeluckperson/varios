import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Moon,
  Sun,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Menu,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { Typewriter } from "react-simple-typewriter";
import { FaReact, FaNodeJs, FaJs, FaDatabase, FaJava } from "react-icons/fa";
import { SiNextdotjs, SiAngular, SiSpringboot, SiJest } from "react-icons/si";

const elementosNavegacion = [
  { id: 1, name: "Sobre Mí", link: "about" },
  { id: 2, name: "Habilidades", link: "skills" },
  { id: 3, name: "Proyectos", link: "projects" },
  { id: 4, name: "Testimonios", link: "testimonials" },
  { id: 5, name: "Blog", link: "blog" },
  { id: 6, name: "Contacto", link: "contact" },
];

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
];

const habilidades = [
  { name: "React", icon: <FaReact className="text-blue-500 text-5xl" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-gray-900 text-5xl" /> },
  { name: "AngularJS", icon: <SiAngular className="text-red-500 text-5xl" /> },
  { name: "Javascript", icon: <FaJs className="text-blue-600 text-5xl" /> },
  { name: "Java", icon: <FaJava className="text-blue-600 text-5xl" /> },
  { name: "Express", icon: <FaNodeJs className="text-green-500 text-5xl" /> },
  {
    name: "Spring Boot",
    icon: <SiSpringboot className="text-green-500 text-5xl" />,
  },
  { name: "MongoDB", icon: <FaDatabase className="text-green-700 text-5xl" /> },
  {
    name: "PostgreSQL",
    icon: <FaDatabase className="text-blue-500 text-5xl" />,
  },
  { name: "Jest", icon: <SiJest className="text-red-500 text-5xl" /> },
];

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

const postsBlog = [
  {
    id: 1,
    title: "El Futuro del Desarrollo Web",
    excerpt:
      "Explorando las tendencias y tecnologías futuras en el desarrollo web...",
  },
  {
    id: 2,
    title: "Dominando los Hooks en React",
    excerpt:
      "Una guía completa para usar los Hooks de React de manera efectiva en tus proyectos...",
  },
  {
    id: 3,
    title: "Construyendo Sistemas Backend Escalables",
    excerpt:
      "Mejores prácticas para diseñar e implementar arquitecturas de servidor escalables...",
  },
];

function App() {
  const [modoOscuro, setModoOscuro] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [proyectoActual, setProyectoActual] = useState(0);
  const [testimonioActual, setTestimonioActual] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", modoOscuro);
  }, [modoOscuro]);

  const alternarModoOscuro = () => setModoOscuro(!modoOscuro);
  const alternarMenu = () => setMenuAbierto(!menuAbierto);

  const siguienteProyecto = () =>
    setProyectoActual((prev) => (prev + 1) % proyectos.length);
  const proyectoAnterior = () =>
    setProyectoActual(
      (prev) => (prev - 1 + proyectos.length) % proyectos.length
    );
  const siguienteTestimonio = () =>
    setTestimonioActual((prev) => (prev + 1) % testimonios.length);
  const testimonioAnterior = () =>
    setTestimonioActual(
      (prev) => (prev - 1 + testimonios.length) % testimonios.length
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 relative">
      <header className="fixed w-full z-10 bg-white dark:bg-gray-800 shadow-md">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <ScrollLink
              to="home"
              smooth
              duration={500}
              className="text-2xl font-bold cursor-pointer"
            >
              <span className="text-blue-600 dark:text-blue-400">D</span>ev
            </ScrollLink>
            <div className="hidden md:flex space-x-6">
              {elementosNavegacion.map((item) => (
                <ScrollLink
                  key={item.id}
                  to={item.link}
                  smooth
                  duration={500}
                  className="hover:text-blue-500 cursor-pointer"
                >
                  {item.name}
                </ScrollLink>
              ))}
            </div>
            <div className="flex items-center">
              <button
                onClick={alternarModoOscuro}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 mr-4"
              >
                {modoOscuro ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>
              <button onClick={alternarMenu} className="md:hidden">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
          {menuAbierto && (
            <div className="mt-4 md:hidden">
              {elementosNavegacion.map((item) => (
                <ScrollLink
                  key={item.id}
                  to={item.link}
                  smooth
                  duration={500}
                  className="block py-2 hover:text-blue-500"
                  onClick={alternarMenu}
                >
                  {item.name}
                </ScrollLink>
              ))}
            </div>
          )}
        </nav>
      </header>

      <main className="pt-16">
        {/* Sección de inicio */}
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
              <span className="text-blue-600 dark:text-blue-400">
                Erick Segura
              </span>
            </h1>
            <h2 className="text-2xl md:text-4xl mb-8">
              Soy{" "}
              <Typewriter
                words={[
                  "Full-Stack-Developer",
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
            <ScrollLink
              to="projects"
              smooth
              duration={500}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 text-lg"
            >
              PROYECTOS <ChevronRight className="ml-2 w-5 h-5" />
            </ScrollLink>
          </motion.div>
        </section>

        {/* Sección About Me */}
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
                  Hello! I'm a passionate full-stack developer with over 5 years
                  of experience...
                </p>
                <p className="text-lg mb-4">
                  I specialize in JavaScript ecosystems, particularly React for
                  front-end...
                </p>
                <p className="text-lg">
                  When I'm not coding, you can find me exploring new
                  technologies...
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sección Skills */}
        <section id="skills" className="py-20 bg-gray-100 dark:bg-gray-700">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-8 text-center">Habilidades</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
              {habilidades.map((habilidad, index) => (
                <motion.div
                  key={habilidad.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center"
                >
                  {habilidad.icon}
                  <h3 className="text-xl font-semibold mt-4">
                    {habilidad.name}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección Projects */}
        <section id="projects" className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-8 text-center">Proyectos</h2>
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={proyectoActual}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden"
                >
                  <img
                    src={`/placeholder.svg?text=Project ${proyectos[proyectoActual].id}`}
                    alt={proyectos[proyectoActual].title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-2">
                      {proyectos[proyectoActual].title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {proyectos[proyectoActual].description}
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      View Project <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
              <button
                onClick={proyectoAnterior}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={siguienteProyecto}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>

        {/* Sección Testimonials */}
        <section
          id="testimonials"
          className="py-20 bg-gray-100 dark:bg-gray-700"
        >
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

        {/* Sección Blog */}
        <section id="blog" className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-8 text-center">
              Publicaciones
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {postsBlog.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={`/placeholder.svg?text=Blog ${post.id}`}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {post.excerpt}
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Read More <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección Contact */}
        <section id="contact" className="py-20 bg-gray-100 dark:bg-gray-700">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-8 text-center">Contacto</h2>
            <div className="max-w-lg mx-auto">
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
            <div className="mt-12 flex justify-center space-x-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <Github className="w-8 h-8" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <Linkedin className="w-8 h-8" />
              </a>
              <a
                href="mailto:your.email@example.com"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <Mail className="w-8 h-8" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>
            &copy; {new Date().getFullYear()} Erick Segura. All rights reserved.
          </p>
          <p className="mt-2 text-gray-400">
            Designed and built with ❤️ using React and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
