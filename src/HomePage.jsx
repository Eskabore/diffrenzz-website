import React, { useEffect, useRef, useState } from "react";

export default function HomePage() {
  const images = [
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=60',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=60',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=60',
  ]

  const alts = [
    'Dashboard screenshot',
    'Team collaborating',
    'Customer service call',
  ]

  const [menuOpen, setMenuOpen] = useState(false) // mobile nav state
  const [slide, setSlide] = useState(0) // hero slideshow index
  const heroRef = useRef(null)
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (prefersReduced) return // honor reduced motion
    const timer = setInterval(() => {
      setSlide((s) => (s + 1) % images.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [prefersReduced])

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return
      const y = window.scrollY
      heroRef.current.style.transform = `translateY(${y * -0.1}px) scale(${1 +
        y / 1000})`
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 shadow-md bg-white sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <img src="/android-chrome-512x512.png" alt="Diffrenzz Logo" className="h-10 w-10" />
          <h1 className="text-xl font-bold">Diffrenzz</h1>
        </div>
        <button
          className="md:hidden p-2"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="block w-6 border-t border-gray-700 mb-1" />
          <span className="block w-6 border-t border-gray-700 mb-1" />
          <span className="block w-6 border-t border-gray-700" />
        </button>
        <nav
          className={`space-x-6 ${menuOpen ? 'block' : 'hidden'} md:block`}
          onClick={() => setMenuOpen(false)}
        >
          <a href="#about" className="hover:text-blue-500 block md:inline">About</a>
          <a href="#services" className="hover:text-blue-500 block md:inline">Services</a>
          <a href="#projects" className="hover:text-blue-500 block md:inline">Projects</a>
          <a href="#booking" className="hover:text-blue-500 block md:inline">Book</a>
          <a href="#contact" className="hover:text-blue-500 block md:inline">Contact</a>
        </nav>
      </header>

      {/* Hero */}
      <section
        className="relative h-screen flex flex-col justify-center items-center text-white text-center overflow-hidden px-4"
        aria-label={alts[slide]}
      >
        {images.map((img, i) => (
          <img
            key={img}
            src={img}
            loading="lazy" // performance
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === slide ? 'opacity-100' : 'opacity-0'
            }`}
            alt=""
          />
        ))}
        <div ref={heroRef} className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Smart Salesforce Solutions</h2>
          <p className="text-lg md:text-2xl mb-6">Tailored development, automation & consulting</p>
          <a
            href="#contact"
            className="bg-white text-gray-900 px-6 py-3 rounded-full shadow hover:shadow-lg focus:shadow-lg transition-transform transform hover:-translate-y-1 focus:-translate-y-1" // lift on hover
          >
            Let’s Talk
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-16 max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold mb-4">About Diffrenzz</h3>
        <p className="text-lg leading-relaxed">
          At Diffrenzz, I help businesses unleash the full power of Salesforce by delivering custom solutions, intelligent automation, and strategic consulting. From solo projects to large-scale integrations, every build is optimized for performance, usability, and scale.
        </p>
      </section>

      {/* Services */}
      <section id="services" className="bg-gray-50 px-6 py-16">
        <h3 className="text-3xl font-bold text-center mb-10">Services</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            "Salesforce Admin & Setup",
            "Flow Automation",
            "Apex & LWC Development",
            "API Integrations",
            "Experience Cloud",
            "Project Dashboards"
          ].map((service, index) => (
            <div key={index} className="bg-white shadow p-6 rounded-xl text-center hover:shadow-md transition">
              <h4 className="font-semibold text-lg mb-2">{service}</h4>
              <p className="text-sm text-gray-600">Professional setup and customizations tailored to your needs.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="px-6 py-16 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-10">Projects</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2].map((p) => (
            <div key={p} className="border p-6 rounded-xl hover:shadow-lg transition">
              <h4 className="font-semibold text-xl mb-2">Project {p} Name</h4>
              <p className="text-gray-600 mb-2">Brief description of the project, what tools were used, and the business value delivered.</p>
              <span className="text-sm text-blue-600">Salesforce • Apex • Flow</span>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="bg-white px-6 py-16 text-center">
        <h3 className="text-3xl font-bold mb-4">Book an Appointment</h3>
        <p className="mb-6 text-gray-700 max-w-xl mx-auto">
          Want to discuss a Salesforce project or just explore how we can collaborate? Choose a time that works for you.
        </p>
        <a
          href="https://calendar.google.com/calendar/appointments/schedules/your-schedule-id" // Replace with actual Google appointment link
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
        >
          Book a Free Consultation
        </a>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-gray-100 px-6 py-16 text-center">
        <h3 className="text-3xl font-bold mb-4">Contact Me</h3>
        <p className="mb-6">Have a project or need advice? Let’s talk.</p>
        <form className="max-w-xl mx-auto grid gap-4">
          <input type="text" placeholder="Your Name" className="p-3 rounded border" />
          <input type="email" placeholder="Your Email" className="p-3 rounded border" />
          <textarea placeholder="Your Message" rows="5" className="p-3 rounded border"></textarea>
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">Send Message</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Diffrenzz. All rights reserved.
      </footer>
    </div>
  );
}
