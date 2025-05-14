import { motion } from "framer-motion";
import { ArrowDownIcon } from "@heroicons/react/24/outline";

const Hero = () => {
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
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white filter blur-3xl opacity-20 animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-white filter blur-3xl opacity-20 animate-float"></div>
      </div>
      
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-green-500 to-teal-400 -z-10"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h1 
          variants={fadeInUp}
          className="text-4xl md:text-6xl font-bold mb-6 text-white"
        >
          Smart <span className="text-yellow-300">Salesforce</span> Solutions
        </motion.h1>
        
        <motion.p 
          variants={fadeInUp}
          className="text-xl md:text-3xl mb-8 text-white/90 max-w-2xl mx-auto"
        >
          Tailored development, automation & consulting that drives results
        </motion.p>
        
        <motion.div variants={fadeInUp}>
          <motion.a 
            href="#contact"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
          >
            Let's Talk
          </motion.a>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        variants={fadeInUp}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
          opacity: [1, 0.7, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <ArrowDownIcon className="w-8 h-8 text-white" />
      </motion.div>
    </motion.section>
  );
};

export default Hero;