import { motion } from "framer-motion";
import { UserIcon, ChartBarIcon, CheckBadgeIcon, ClockIcon } from "@heroicons/react/24/outline";

const About = () => {
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

  const stats = [
    { value: "5+", label: "Years Experience", icon: <ClockIcon className="w-6 h-6" /> },
    { value: "50+", label: "Projects Completed", icon: <CheckBadgeIcon className="w-6 h-6" /> },
    { value: "100%", label: "Client Satisfaction", icon: <UserIcon className="w-6 h-6" /> },
    { value: "24/7", label: "Support Available", icon: <ChartBarIcon className="w-6 h-6" /> }
  ];

  return (
    <motion.section 
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-20 px-6 max-w-7xl mx-auto"
    >
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Image with Decorative Elements */}
        <motion.div 
          variants={fadeInUp}
          className="relative"
        >
          <div className="relative rounded-xl overflow-hidden shadow-lg aspect-[4/3] bg-gradient-to-br from-blue-100 to-green-50">
            {/* Placeholder for your image - replace with your actual image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <UserIcon className="w-32 h-32 text-blue-400 opacity-30" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          </div>
          
          {/* Floating stats badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100"
          >
            <div className="text-3xl font-bold text-blue-600">5+</div>
            <div className="text-sm font-medium text-gray-600">Years in Salesforce</div>
          </motion.div>
        </motion.div>

        {/* Right Column - Content */}
        <motion.div variants={fadeInUp}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            About <span className="text-blue-600">Diffrenzz</span>
          </h2>
          
          <div className="space-y-6 text-gray-700">
            <p className="text-lg leading-relaxed">
              I'm a certified Salesforce consultant dedicated to helping businesses transform their operations through tailored CRM solutions. With a passion for automation and efficiency, I bridge the gap between business needs and technical implementation.
            </p>
            
            <p className="text-lg leading-relaxed">
              My approach combines deep technical expertise with clear communication, ensuring you understand every step of the process while I handle the complex Salesforce configurations behind the scenes.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-blue-50 text-blue-600">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Certification Badges */}
      <motion.div 
        variants={fadeInUp}
        className="mt-16 flex flex-wrap justify-center gap-6"
      >
        {[
          "Salesforce Certified Administrator",
          "Platform App Builder",
          "Flow Automation Specialist",
          "Experience Cloud Consultant"
        ].map((cert, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200"
          >
            <CheckBadgeIcon className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium">{cert}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default About;