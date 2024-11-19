import { useState, useEffect } from "react";
import HomeSection from "./components/HomeSection";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Blogs from "./components/Blogs";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";

function App() {
  const [modoOscuro, setModoOscuro] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", modoOscuro);
  }, [modoOscuro]);

  const alternarModoOscuro = () => setModoOscuro(!modoOscuro);
  const alternarMenu = () => setMenuAbierto(!menuAbierto);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 relative">
      <Navbar />
      <main className="pt-16">
        <HomeSection />
        <AboutMe />
        <Skills />
        <Projects />
        {/* <Testimonials />
        <Blogs /> */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
