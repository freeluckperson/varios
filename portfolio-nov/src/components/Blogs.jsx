import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

function Blogs() {
  return (
    <section id="blog" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8 text-center">Publicaciones</h2>
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
  );
}

export default Blogs;
