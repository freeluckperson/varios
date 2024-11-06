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

const navItems = [
  { id: 1, name: "About", link: "about" },
  { id: 2, name: "Skills", link: "skills" },
  { id: 3, name: "Projects", link: "projects" },
  { id: 4, name: "Testimonials", link: "testimonials" },
  { id: 5, name: "Blog", link: "blog" },
  { id: 6, name: "Contact", link: "contact" },
];

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with React and Node.js",
  },
  {
    id: 2,
    title: "AI Chatbot",
    description:
      "An intelligent chatbot powered by machine learning algorithms",
  },
  {
    id: 3,
    title: "Mobile Fitness App",
    description: "A React Native app for tracking workouts and nutrition",
  },
];

const skills = [
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

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO, Tech Inc.",
    text: "An exceptional developer who consistently delivers high-quality work.",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Project Manager, Digital Solutions",
    text: "Highly skilled and a pleasure to work with. Always goes above and beyond.",
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "CTO, Innovate Co.",
    text: "Impressive problem-solving skills and attention to detail. A valuable asset to any team.",
  },
];

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development",
    excerpt: "Exploring upcoming trends and technologies in web development...",
  },
  {
    id: 2,
    title: "Mastering React Hooks",
    excerpt:
      "A comprehensive guide to using React Hooks effectively in your projects...",
  },
  {
    id: 3,
    title: "Building Scalable Backend Systems",
    excerpt:
      "Best practices for designing and implementing scalable server architectures...",
  },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const nextProject = () =>
    setCurrentProject((prev) => (prev + 1) % projects.length);
  const prevProject = () =>
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  const nextTestimonial = () =>
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () =>
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
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
              <span className="text-blue-600 dark:text-blue-400">Your</span>Name
            </ScrollLink>
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => (
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
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 mr-4"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>
              <button onClick={toggleMenu} className="md:hidden">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
          {menuOpen && (
            <div className="mt-4 md:hidden">
              {navItems.map((item) => (
                <ScrollLink
                  key={item.id}
                  to={item.link}
                  smooth
                  duration={500}
                  className="block py-2 hover:text-blue-500"
                  onClick={toggleMenu}
                >
                  {item.name}
                </ScrollLink>
              ))}
            </div>
          )}
        </nav>
      </header>

      <main className="pt-16">
        <section
  id="home"
  className="min-h-screen flex items-center justify-center bg-cover bg-center"
  style={{
    backgroundImage: `url('/code1.jpg')`, // Ruta de la imagen en la carpeta public
  }}
>
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-center bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 p-8 rounded-lg shadow-lg"
  >
    <h1 className="text-5xl md:text-7xl font-bold mb-4">
      Hi, I'm{" "}
      <span className="text-blue-600 dark:text-blue-400">Your Name</span>
    </h1>
    <h2 className="text-2xl md:text-4xl mb-8">
      I'm a{" "}
      <Typewriter
        words={[
          "Full-Stack Developer",
          "UI/UX Designer",
          "Problem Solver",
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
      to="about"
      smooth
      duration={500}
      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 text-lg"
    >
      Explore My Work <ChevronRight className="ml-2 w-5 h-5" />
    </ScrollLink>
  </motion.div>
</section>


        <section id="about" className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
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

        <section id="skills" className="py-20 bg-gray-100 dark:bg-gray-700">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-8 text-center">My Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center"
                >
                  {skill.icon}
                  <h3 className="text-xl font-semibold mt-4">{skill.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-8 text-center">
              Featured Projects
            </h2>
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden"
                >
                  <img
                    src={`/placeholder.svg?text=Project ${projects[currentProject].id}`}
                    alt={projects[currentProject].title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-2">
                      {projects[currentProject].title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {projects[currentProject].description}
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
                onClick={prevProject}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextProject}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="py-20 bg-gray-100 dark:bg-gray-700"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-8 text-center">
              What People Say
            </h2>
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-2xl mx-auto"
                >
                  <p className="text-xl italic mb-4">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={`/placeholder.svg?text=${testimonials[
                        currentTestimonial
                      ].name.charAt(0)}`}
                      alt={testimonials[currentTestimonial].name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {testimonials[currentTestimonial].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <button
                onClick={prevTestimonial}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>

        <section id="blog" className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-8 text-center">
              Latest Blog Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
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

        <section id="contact" className="py-20 bg-gray-100 dark:bg-gray-700">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-8 text-center">
              Get in Touch
            </h2>
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
            &copy; {new Date().getFullYear()} Your Name. All rights reserved.
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
