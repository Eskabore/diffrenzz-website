import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "./components/sections/Header";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Service";
import About from "./components/sections/About";
import Projects from "./components/sections/Project";
import Bookings from "./components/sections/Booking";
import Contact from "./components/sections/Contact";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Header */}
      {/* Hero */}
      {/* Services */}
      {/* Projects */}
      {/* Booking Section */}
      {/* Contact */}
      {/* Footer */}
      <Header />
      <Hero />
      <Services />
      <About />
      <Projects />
      <Bookings />
      <Contact />



      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center py-8 text-sm text-gray-500 bg-gray-100"
      >
        <div className="max-w-6xl mx-auto px-6">
          <p>© {new Date().getFullYear()} Diffrenzz. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="/privacy-policy.html" className="hover:text-gray-700">Privacy Policy</a>
            <a href="/cookie-policy.html" className="hover:text-gray-700">Terms of Service</a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}