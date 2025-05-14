import { motion } from "framer-motion";
import { BoltIcon, CogIcon, CodeBracketIcon, LinkIcon, GlobeAltIcon, ChartBarIcon } from "@heroicons/react/24/outline";

const Services = () => {
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

  const services = [
    {
      title: "Salesforce Admin & Setup",
      description: "Professional configuration, user management, and security settings tailored to your business processes.",
      icon: <CogIcon className="w-10 h-10 text-blue-600" />,
      color: "bg-blue-50"
    },
    {
      title: "Flow Automation",
      description: "Build efficient workflows to automate business processes and reduce manual work.",
      icon: <BoltIcon className="w-10 h-10 text-green-600" />,
      color: "bg-green-50"
    },
    {
      title: "Apex & LWC Development",
      description: "Custom solutions built with Salesforce's powerful development tools for complex requirements.",
      icon: <CodeBracketIcon className="w-10 h-10 text-purple-600" />,
      color: "bg-purple-50"
    },
    {
      title: "API Integrations",
      description: "Seamlessly connect Salesforce with your other business systems and applications.",
      icon: <LinkIcon className="w-10 h-10 text-red-600" />,
      color: "bg-red-50"
    },
    {
      title: "Experience Cloud",
      description: "Build engaging customer and partner portals with personalized experiences.",
      icon: <GlobeAltIcon className="w-10 h-10 text-teal-600" />,
      color: "bg-teal-50"
    },
    {
      title: "Analytics & Dashboards",
      description: "Transform your data into actionable insights with powerful visualizations.",
      icon: <ChartBarIcon className="w-10 h-10 text-orange-600" />,
      color: "bg-orange-50"
    }
  ];

  return (
    <motion.section 
      id="services"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Salesforce <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions tailored to your business needs and objectives
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
              }}
              className={`${service.color} p-8 rounded-xl border border-gray-100 hover:border-transparent transition-all duration-300`}
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="p-3 rounded-lg bg-white shadow-sm">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
              </div>
              <p className="text-gray-600">{service.description}</p>
              <motion.div 
                className="mt-6 pt-6 border-t border-gray-200"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              />
              <div className="mt-4">
                <motion.a
                  href="#contact"
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center text-blue-600 font-medium"
                >
                  Get started
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Services;