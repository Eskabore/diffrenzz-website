import { motion } from "framer-motion";
import { ArrowTopRightOnSquareIcon, CodeBracketIcon, CpuChipIcon, ArrowsRightLeftIcon } from "@heroicons/react/24/outline";

const Projects = () => {
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

  const projects = [
    {
      title: "Manufacturing Process Automation",
      description: "Automated the entire quote-to-cash process for a mid-sized manufacturer, reducing manual work by 80% and improving deal velocity by 40%.",
      tags: ["Sales Cloud", "Flow", "CPQ"],
      icon: <ArrowsRightLeftIcon className="w-8 h-8 text-blue-600" />,
      results: [
        { metric: "80%", label: "Reduction in manual work" },
        { metric: "40%", label: "Faster deal processing" }
      ]
    },
    {
      title: "Nonprofit Donor Management System",
      description: "Built a custom donor management solution with automated receipting and campaign tracking, helping process 2x more donations.",
      tags: ["Nonprofit Cloud", "LWC", "Apex Triggers"],
      icon: <CpuChipIcon className="w-8 h-8 text-purple-600" />,
      results: [
        { metric: "2x", label: "More donations processed" },
        { metric: "90%", label: "Faster receipt generation" }
      ]
    },
    {
      title: "Field Service Mobile App",
      description: "Developed a mobile-optimized solution for field technicians with offline capabilities, reducing service resolution time by 35%.",
      tags: ["Field Service", "Mobile", "LWC"],
      icon: <CodeBracketIcon className="w-8 h-8 text-green-600" />,
      results: [
        { metric: "35%", label: "Faster resolution" },
        { metric: "60%", label: "Fewer callbacks" }
      ]
    }
  ];

  return (
    <motion.section 
      id="projects"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-20 px-6 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Salesforce <span className="text-blue-600">Projects</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real-world solutions delivering measurable business impact
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
              }}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-blue-100 transition-all duration-300"
            >
              <div className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="p-3 rounded-lg bg-blue-50">
                    {project.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6">{project.description}</p>
                
                <div className="mb-6 space-y-4">
                  {project.results.map((result, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                        {result.metric}
                      </div>
                      <span className="text-sm text-gray-600">{result.label}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <motion.div 
                whileHover={{ backgroundColor: "#1e40af" }}
                className="bg-blue-600 text-white p-4 text-center cursor-pointer flex items-center justify-center space-x-2"
              >
                <span className="font-medium">Case Study</span>
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Client logos section (optional) */}
        <motion.div 
          variants={fadeInUp}
          className="mt-20 text-center"
        >
          <h3 className="text-lg font-medium text-gray-500 mb-8">Trusted by innovative companies</h3>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-70">
            {/* Replace with actual client logos */}
            <div className="h-12 w-auto bg-gray-200 rounded-lg"></div>
            <div className="h-12 w-auto bg-gray-200 rounded-lg"></div>
            <div className="h-12 w-auto bg-gray-200 rounded-lg"></div>
            <div className="h-12 w-auto bg-gray-200 rounded-lg"></div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;