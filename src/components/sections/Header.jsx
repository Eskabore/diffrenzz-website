import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const body = document.body;
    body.classList.remove('bg-gray-900', 'text-gray-100', 'bg-white', 'text-gray-900');
    if (theme === 'dark') {
      body.classList.add('bg-gray-900', 'text-gray-100');
    } else {
      body.classList.add('bg-white', 'text-gray-900');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Get both scrollY and scrollYProgress
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track scroll position for header background
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  const navItems = [
    { key: "about", href: "#about" },
    { key: "services", href: "#services" },
    { key: "projects", href: "#projects" },
    { key: "book", href: "#booking" },
    { key: "contact", href: "#contact" },
  ];

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-white/80 backdrop-blur-sm"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <img
                src="/newLogo512.svg"
                alt="Diffrenzz Logo"
                className="h-10 w-10 transition-transform hover:rotate-[15deg]"
              />
              <motion.h1
                className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
              >
                Diffrenzz
              </motion.h1>
            </motion.a>

            <nav className="hidden md:flex space-x-8 items-center">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.key}
                  href={item.href}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  custom={index}
                  className="relative px-1 py-2 text-gray-700 hover:text-blue-600 group transition-colors font-medium"
                >
                  {t(`nav.${item.key}`)}
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  />
                </motion.a>
              ))}
              <select
                className="ml-4 border border-gray-300 rounded p-1 text-sm"
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
              >
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="de">DE</option>
              </select>
            </nav>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="hidden md:block p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {theme === 'dark' ? (
                <SunIcon className="w-6 h-6" />
              ) : (
                <MoonIcon className="w-6 h-6" />
              )}
            </button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 rounded-md focus:outline-none text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        <motion.div
          className="h-0.5 bg-blue-500 origin-left"
          style={{ scaleX }}
        />
      </motion.header>

      <motion.div
        initial={false}
        animate={mobileMenuOpen ? "open" : "closed"}
        variants={menuVariants}
        className="fixed top-16 inset-x-0 bg-white/95 backdrop-blur-md shadow-lg md:hidden z-40"
      >
        <div className="px-6 py-4 space-y-4">
          {navItems.map((item) => (
            <motion.a
              key={item.key}
              href={item.href}
              className="block px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {t(`nav.${item.key}`)}
            </motion.a>
          ))}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="mt-2 p-2 rounded-md bg-gray-100 flex items-center space-x-2"
          >
            {theme === 'dark' ? (
              <>
                <SunIcon className="w-5 h-5" /> <span>{t('nav.light')}</span>
              </>
            ) : (
              <>
                <MoonIcon className="w-5 h-5" /> <span>{t('nav.dark')}</span>
              </>
            )}
          </button>
          <select
            className="mt-4 w-full border border-gray-300 rounded p-2 text-sm"
            value={i18n.language}
            onChange={(e) => {
              i18n.changeLanguage(e.target.value);
              setMobileMenuOpen(false);
            }}
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
            <option value="de">DE</option>
          </select>
        </div>
      </motion.div>
    </>
  );
};

export default Header;