import React, { useState } from "react";
import { motion } from "framer-motion";

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
      <header className="flex justify-between items-center px-6 py-4 shadow-sm bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <img 
            src="/android-chrome-512x512.png" 
            alt="Diffrenzz Logo" 
            className="h-10 w-10 transition-transform hover:scale-110" 
          />
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            Diffrenzz
          </h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="space-x-6 hidden md:flex">
          {['About', 'Services', 'Projects', 'Book', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="relative px-2 py-1 text-gray-700 hover:text-blue-600 group transition-colors"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-md focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-16 right-0 left-0 bg-white shadow-lg md:hidden z-40"
          >
            <div className="flex flex-col space-y-2 p-4">
              {['About', 'Services', 'Projects', 'Book', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 via-green-500 to-teal-400 text-white text-center px-4 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-white filter blur-3xl opacity-20"></div>
        </div>
        
        <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold mb-6">
          Smart <span className="text-yellow-300">Salesforce</span> Solutions
        </motion.h2>
        
        <motion.p variants={fadeInUp} className="text-xl md:text-3xl mb-8 max-w-2xl">
          Tailored development, automation & consulting that drives results
        </motion.p>
        
        <motion.div variants={fadeInUp}>
          <a 
            href="#contact" 
            className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-medium"
          >
            Let's Talk
          </a>
        </motion.div>
        
        <motion.div 
          variants={fadeInUp}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.section>

      {/* About */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        id="about" 
        className="px-6 py-20 max-w-4xl mx-auto"
      >
        <motion.h3 variants={fadeInUp} className="text-3xl font-bold mb-6 text-center">
          About <span className="text-blue-600">Diffrenzz</span>
        </motion.h3>
        
        <motion.div variants={fadeInUp} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <p className="text-lg leading-relaxed text-gray-700">
            At Diffrenzz, I help businesses unleash the full power of Salesforce by delivering custom solutions, intelligent automation, and strategic consulting. From solo projects to large-scale integrations, every build is optimized for performance, usability, and scale.
          </p>
          
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {['5+ Years Experience', '50+ Projects', '100% Satisfaction', '24/7 Support'].map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="font-medium text-gray-800">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Services */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        id="services" 
        className="px-6 py-20 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h3 variants={fadeInUp} className="text-3xl font-bold text-center mb-4">
            My <span className="text-green-600">Services</span>
          </motion.h3>
          
          <motion.p variants={fadeInUp} className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Comprehensive Salesforce solutions tailored to your business needs
          </motion.p>
          
          <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Salesforce Admin & Setup",
                description: "Professional setup and customizations tailored to your needs.",
                icon: "🛠️"
              },
              {
                title: "Flow Automation",
                description: "Streamline processes with powerful automation workflows.",
                icon: "⏩"
              },
              {
                title: "Apex & LWC Development",
                description: "Custom solutions built with Salesforce's powerful development tools.",
                icon: "💻"
              },
              {
                title: "API Integrations",
                description: "Connect Salesforce with your other business systems seamlessly.",
                icon: "🔗"
              },
              {
                title: "Experience Cloud",
                description: "Build engaging portals for your customers and partners.",
                icon: "🌐"
              },
              {
                title: "Project Dashboards",
                description: "Visualize your data with powerful, actionable insights.",
                icon: "📊"
              }
            ].map((service, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h4 className="font-semibold text-xl mb-3 text-gray-800">{service.title}</h4>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Projects */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        id="projects" 
        className="px-6 py-20 max-w-6xl mx-auto"
      >
        <motion.h3 variants={fadeInUp} className="text-3xl font-bold text-center mb-4">
          Featured <span className="text-purple-600">Projects</span>
        </motion.h3>
        
        <motion.p variants={fadeInUp} className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Some of my recent work delivering value through Salesforce
        </motion.p>
        
        <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Sales Process Automation",
              description: "Automated the entire sales process for a mid-sized manufacturer, reducing manual work by 80% and improving deal velocity.",
              tags: ["Sales Cloud", "Flow", "Custom Objects"],
              color: "bg-blue-100 text-blue-800"
            },
            {
              title: "Customer Portal Implementation",
              description: "Built an Experience Cloud portal for a service company, enabling 24/7 self-service for their clients.",
              tags: ["Experience Cloud", "LWC", "Apex"],
              color: "bg-green-100 text-green-800"
            }
          ].map((project, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all"
            >
              <h4 className="font-semibold text-xl mb-3 text-gray-800">{project.title}</h4>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span key={i} className={`px-3 py-1 rounded-full text-sm ${project.color}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Booking Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        id="booking" 
        className="px-6 py-20 bg-gradient-to-b from-white to-gray-50 text-center"
      >
        <div className="max-w-xl mx-auto">
          <motion.h3 variants={fadeInUp} className="text-3xl font-bold mb-6">
            Ready to <span className="text-green-600">Get Started</span>?
          </motion.h3>
          
          <motion.p variants={fadeInUp} className="mb-8 text-gray-700">
            Want to discuss a Salesforce project or just explore how we can collaborate? Choose a time that works for you.
          </motion.p>
          
          <motion.div variants={fadeInUp}>
            <a
              href="https://calendly.com/your-link" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-green-700 transition-all duration-300 font-medium"
            >
              Book a Free Consultation
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        id="contact" 
        className="px-6 py-20 bg-gray-900 text-white"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h3 variants={fadeInUp} className="text-3xl font-bold mb-6 text-center">
            Let's <span className="text-blue-400">Connect</span>
          </motion.h3>
          
          <motion.p variants={fadeInUp} className="mb-12 text-gray-300 text-center max-w-2xl mx-auto">
            Have a project or need advice? I'd love to hear from you.
          </motion.p>
          
          <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-8">
            <motion.form variants={fadeInUp} className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
              <textarea 
                placeholder="Your Message" 
                rows="5" 
                className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Send Message
              </button>
            </motion.form>
            
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="font-semibold text-xl mb-4">Contact Information</h4>
                <div className="space-y-3">
                  <p className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    hello@diffrenzz.com
                  </p>
                  <p className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="font-semibold text-xl mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  {['LinkedIn', 'Twitter', 'GitHub'].map((social, index) => (
                    <a 
                      key={index}
                      href="#" 
                      className="bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition-colors"
                      aria-label={social}
                    >
                      <span className="sr-only">{social}</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        {/* Replace with actual social icons */}
                        <rect width="20" height="20" x="2" y="2" rx="4" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

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
            <a href="#" className="hover:text-gray-700">Privacy Policy</a>
            <a href="#" className="hover:text-gray-700">Terms of Service</a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}