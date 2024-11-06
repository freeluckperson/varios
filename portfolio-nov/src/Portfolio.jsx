// src/Portfolio.jsx
'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Moon, Sun, ArrowRight, Github, Linkedin, Mail, Menu, ChevronRight } from 'lucide-react'
import { Link as ScrollLink } from 'react-scroll'
import { Typewriter } from 'react-simple-typewriter'

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)
  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <header className="fixed w-full z-10 bg-white dark:bg-gray-800 shadow-md">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <ScrollLink to="home" smooth={true} duration={500} className="text-2xl font-bold text-gray-800 dark:text-white cursor-pointer">
              My Portfolio
            </ScrollLink>
            <div className="hidden md:flex space-x-4">
              <ScrollLink to="about" smooth={true} duration={500} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer">About</ScrollLink>
              <ScrollLink to="projects" smooth={true} duration={500} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer">Projects</ScrollLink>
              <ScrollLink to="contact" smooth={true} duration={500} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer">Contact</ScrollLink>
            </div>
            <div className="flex items-center">
              <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
                {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-700" />}
              </button>
              <button onClick={toggleMenu} className="ml-4 md:hidden">
                <Menu className="w-6 h-6 text-gray-700 dark:text-white" />
              </button>
            </div>
          </div>
          {menuOpen && (
            <div className="mt-4 md:hidden">
              <ScrollLink to="about" smooth={true} duration={500} className="block py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" onClick={toggleMenu}>About</ScrollLink>
              <ScrollLink to="projects" smooth={true} duration={500} className="block py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" onClick={toggleMenu}>Projects</ScrollLink>
              <ScrollLink to="contact" smooth={true} duration={500} className="block py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" onClick={toggleMenu}>Contact</ScrollLink>
            </div>
          )}
        </nav>
      </header>

      <main className="pt-16">
        <section id="home" className="min-h-screen flex items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
              Hi, I'm <span className="text-blue-600 dark:text-blue-400">Your Name</span>
            </h1>
            <h2 className="text-2xl md:text-3xl mb-8 text-gray-700 dark:text-gray-300">
              I'm a{' '}
              <Typewriter
                words={['Developer', 'Designer', 'Creator']}
                loop={0}
                cursor
                cursorStyle='_'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h2>
            <ScrollLink to="about" smooth={true} duration={500} className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">
              Learn More <ChevronRight className="ml-2 w-5 h-5" />
            </ScrollLink>
          </motion.div>
          <motion.div style={{ opacity }} className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <ArrowRight className="w-8 h-8 text-gray-500 dark:text-gray-400 animate-bounce" />
          </motion.div>
        </section>
      </main>
    </div>
  )
}
