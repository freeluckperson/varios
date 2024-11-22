import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { Typewriter } from "react-simple-typewriter";
import {
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaFilePdf,
  FaRegFilePdf,
  FaGuitar,
  FaCat,
  FaCode,
  FaBook,
} from "react-icons/fa";
import { GiPickle } from "react-icons/gi";
import dot from "./assets/dot.png";
import heroImage from "./assets/hero.png";

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú de hamburguesa

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <div className="font-sans text-white bg-background min-h-screen">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-md shadow-md" : ""
        }`}
      >
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link
            to="home"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-secondary transition-colors"
          >
            <div className="text-2xl font-bold text-secondary">
              Dot
              <span className="text-orange-600"> dager</span>
            </div>
          </Link>

          {/* Botón de hamburguesa visible en pantallas pequeñas */}
          <div
            className="block lg:hidden cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <motion.div
              className="w-6 h-1 bg-white mb-1"
              animate={{ rotate: isMenuOpen ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-6 h-1 bg-white mb-1"
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-6 h-1 bg-white"
              animate={{ rotate: isMenuOpen ? -45 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Menú de navegación, solo visible en pantallas grandes o cuando se abre el menú en móvil */}
          <ul
            className={`lg:flex space-x-6 ${
              isMenuOpen ? "flex" : "hidden"
            } lg:flex`}
          >
            <li>
              <Link
                to="home"
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-secondary transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="about"
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-secondary transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="interests"
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-secondary transition-colors"
              >
                Interests
              </Link>
            </li>
            <li>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-secondary transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="bg-gradient-to-b from-gray-900 to-gray-700">
        <section
          id="home"
          className="min-h-screen flex flex-col justify-center items-center text-center p-6 relative"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl font-bold mb-6"
          >
            <span className="text-orange-600">Dot </span>
            <span className="text-black">dager</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <img
              src={dot}
              alt="Dot Dager"
              className="w-48 h-48 rounded-full object-cover mb-8 bg-secondary"
            />
          </motion.div>
          <div style={{ fontSize: "25px" }}>
            <Typewriter
              words={[
                "Content Creator",
                "Programmer",
                "Cat Lover",
                "Guitarist",
                "Philosopher",
                "Pickles Lover",
              ]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </div>
        </section>
      </div>

      <section
        id="about"
        className="min-h-screen flex flex-col justify-center items-center p-6 bg-primary/10"
      >
        <h2 className="text-4xl font-bold mb-8 text-secondary">About Me</h2>
        <p className="max-w-2xl text-center mb-8">
          I'm a content creator who loves programming, cats, guitars, pickles,
          and philosophy. My passion lies in exploring new challenges and
          sharing my journey with others.
        </p>
      </section>

      <section
        id="interests"
        className="min-h-screen flex flex-col justify-center items-center p-6"
      >
        <h2 className="text-4xl font-bold mb-8 text-secondary">My Interests</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {[
            { icon: FaCode, text: "Programming" },
            { icon: FaCat, text: "Cats" },
            { icon: FaGuitar, text: "Guitar" },
            { icon: GiPickle, text: "Pickles" },
            { icon: FaBook, text: "Philosophy" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <item.icon className="text-6xl text-secondary mb-2" />
              <p className="text-lg">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="min-h-screen flex flex-col justify-center items-center p-6 bg-primary/10"
      >
        <h2 className="text-4xl font-bold mb-8 text-secondary">Get in Touch</h2>
        <p className="max-w-2xl text-center mb-8">
          Feel free to reach out for collaborations or just to say hi!
        </p>

        <a
          href="mailto:contact@dotdager.com"
          className="bg-secondary text-white px-8 py-3 rounded-full hover:bg-secondary/80 transition-colors mb-4"
        >
          Contact Me
        </a>

        {/* Íconos de redes sociales */}
        <div className="flex space-x-6">
          <a
            href="https://www.linkedin.com/in/mariano-luis-villa/?locale=en_US"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-secondary hover:text-orange-500 transition-colors"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://github.com/MarianoVilla"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-secondary hover:text-orange-500 transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.youtube.com/@DotDager/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-secondary hover:text-orange-500 transition-colors"
          >
            <FaYoutube />
          </a>
          <a
            href="https://www.youtube.com/@DotDager/videos" // Reemplaza esta ruta con la ruta a tu archivo de CV
            target="_blank"
            download="Dot_Dager_CV" // Nombre del archivo que se descargará
            className="text-3xl text-secondary hover:text-orange-500 transition-colors"
          >
            <FaFilePdf />
          </a>
        </div>
      </section>

      <footer className="bg-primary text-center p-6">
        <p>&copy; 2023 Dot Dager. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
