import React from "react";
import { motion } from "framer-motion";
import Header from "./components/sections/Header";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Service";
import About from "./components/sections/About";
import Projects from "./components/sections/Project";
import Testimonials from "./components/sections/Testimonials";
import Bookings from "./components/sections/Booking";
import Contact from "./components/sections/Contact";
import BackToTop from "./components/sections/BackToTop";

export default function HomePage() {
  return (
    <div className="font-sans text-gray-800 bg-white relative">
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <About />
        <Projects />
        <Testimonials />
        <Bookings />
        <Contact />
      </main>
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center py-8 text-sm text-gray-500 bg-gray-100"
      >
        <div className="max-w-6xl mx-auto px-6">
          <p>© {new Date().getFullYear()} Diffrenzz. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="/privacy-policy.html" className="hover:text-gray-700">
              Privacy Policy
            </a>
            <a href="/cookie-policy.html" className="hover:text-gray-700">
              Cookie Policy
            </a>
            <a href="/terms-of-service.html" className="hover:text-gray-700">
              Terms of Service
            </a>
          </div>
        </div>
      </motion.footer>
      <BackToTop />
    </div>
  );
}
