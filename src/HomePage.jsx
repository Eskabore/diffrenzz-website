import React from "react";

export default function HomePage() {
  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 shadow-md bg-white sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <img src="/android-chrome-512x512.png" alt="Diffrenzz Logo" className="h-10 w-10" />
          <h1 className="text-xl font-bold">Diffrenzz</h1>
        </div>
        <nav className="space-x-6 hidden md:block">
          <a href="#about" className="hover:text-blue-500">About</a>
          <a href="#services" className="hover:text-blue-500">Services</a>
          <a href="#projects" className="hover:text-blue-500">Projects</a>
          <a href="#contact" className="hover:text-blue-500">Contact</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 via-green-400 to-yellow-300 text-white text-center px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">Smart Salesforce Solutions</h2>
        <p className="text-lg md:text-2xl mb-6">Tailored development, automation & consulting</p>
        <a href="#contact" className="bg-white text-gray-900 px-6 py-3 rounded-full shadow hover:bg-gray-100 transition">Let’s Talk</a>
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
