import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaJs, FaDatabase, FaJava } from "react-icons/fa";
import {
  SiNextdotjs,
  SiAngular,
  SiSpringboot,
  SiJest,
  SiTypescript,
} from "react-icons/si";

const habilidades = [
  { name: "AngularJS", icon: <SiAngular className="text-red-500 text-5xl" /> },
  {
    name: "Spring Boot",
    icon: <SiSpringboot className="text-green-500 text-5xl" />,
  },
  { name: "React", icon: <FaReact className="text-blue-500 text-5xl" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-gray-900 text-5xl" /> },
  { name: "Javascript", icon: <FaJs className="text-yellow-400 text-5xl" /> },
  {
    name: "Typescript",
    icon: <SiTypescript className="text-blue-600 text-5xl" />,
  },

  { name: "Java", icon: <FaJava className="text-blue-600 text-5xl" /> },
  { name: "Express", icon: <FaNodeJs className="text-green-500 text-5xl" /> },

  { name: "MongoDB", icon: <FaDatabase className="text-green-700 text-5xl" /> },
  {
    name: "PostgreSQL",
    icon: <FaDatabase className="text-blue-500 text-5xl" />,
  },
  { name: "Jest", icon: <SiJest className="text-red-500 text-5xl" /> },
];

function Skills() {
  return (
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
              <h3 className="text-xl font-semibold mt-4">{habilidad.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
