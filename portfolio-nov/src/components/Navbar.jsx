// Navbar.js
import { useState, useEffect } from "react";
import { Moon, Sun, Menu } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";

const elementosNavegacion = [
  { id: 1, name: "Sobre Mí", link: "about" },
  { id: 2, name: "Habilidades", link: "skills" },
  { id: 3, name: "Proyectos", link: "projects" },
  { id: 4, name: "Testimonios", link: "testimonials" },
  { id: 5, name: "Blog", link: "blog" },
  { id: 6, name: "Contacto", link: "contact" },
];

const Navbar = () => {
  const [modoOscuro, setModoOscuro] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", modoOscuro);
  }, [modoOscuro]);

  const alternarModoOscuro = () => setModoOscuro(!modoOscuro);
  const alternarMenu = () => setMenuAbierto(!menuAbierto);

  return (
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
  );
};

export default Navbar;
