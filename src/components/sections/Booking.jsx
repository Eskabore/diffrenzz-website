import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  XMarkIcon, 
  CalendarIcon, 
  ArrowRightIcon, 
  UserIcon, 
  LightBulbIcon, 
  SparklesIcon,
  ClockIcon,
  CheckBadgeIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";

const Booking = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const modalVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { type: "spring", damping: 25, stiffness: 500 }
        },
        exit: { opacity: 0, y: 20, scale: 0.95 }
    };

    const stats = [
        { value: "30 min", label: "Duration", icon: <ClockIcon className="w-5 h-5" /> },
        { value: "100%", label: "Free", icon: <CheckBadgeIcon className="w-5 h-5" /> },
        { value: "No obligation", label: "Commitment", icon: <ChartBarIcon className="w-5 h-5" /> }
    ];

    const benefits = [
        {
            icon: <UserIcon className="w-6 h-6" />,
            title: "Personalized Strategy",
            description: "Tailored Salesforce solutions for your business needs"
        },
        {
            icon: <LightBulbIcon className="w-6 h-6" />,
            title: "Expert Insights",
            description: "Leverage years of implementation experience"
        },
        {
            icon: <SparklesIcon className="w-6 h-6" />,
            title: "Clear Roadmap",
            description: "Walk away with actionable next steps"
        }
    ];

    return (
        <section id="booking" className="px-6 py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center justify-center space-x-3 mb-6 bg-green-50 px-6 py-3 rounded-full"
                    >
                        <CalendarIcon className="w-6 h-6 text-green-600" />
                        <span className="text-green-600 font-medium">FREE CONSULTATION</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold mb-6"
                    >
                        Ready to Transform Your <span className="text-green-600">Salesforce</span> Experience?
                    </motion.h2>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-lg text-gray-600 max-w-2xl mx-auto mb-12"
                    >
                        Let's discuss how to optimize your CRM implementation and drive measurable business growth
                    </motion.p>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {benefits.map((benefit, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all"
                            >
                                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-green-600 mb-4">
                                    {benefit.icon}
                                </div>
                                <h4 className="text-xl font-semibold mb-3">{benefit.title}</h4>
                                <p className="text-gray-600">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 mb-12">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-center space-x-3 bg-white px-5 py-3 rounded-lg shadow-sm border border-gray-100"
                            >
                                <div className="p-2 rounded-full bg-green-50 text-green-600">
                                    {stat.icon}
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">{stat.value}</div>
                                    <div className="text-sm text-gray-600">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        viewport={{ once: true }}
                        whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.3)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-teal-500 text-white px-10 py-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-semibold"
                    >
                        Book Your Free Strategy Session
                        <ArrowRightIcon className="w-5 h-5 ml-3" />
                    </motion.button>
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                        />

                        <motion.div
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-4xl p-0 rounded-xl z-50 shadow-2xl overflow-hidden"
                        >
                            <div className="flex justify-between items-center bg-gray-50 px-8 py-5 border-b border-gray-200">
                                <div>
                                    <h4 className="text-xl font-bold text-gray-800">Schedule Your Consultation</h4>
                                    <p className="text-sm text-gray-500">Select a time that works for you</p>
                                </div>
                                <button 
                                    onClick={() => setIsModalOpen(false)} 
                                    className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                                >
                                    <XMarkIcon className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="w-full h-[600px]">
                                <iframe
                                    src="https://calendar.app.google/HQA1YKCRb9hDWGdp7"
                                    title="Booking Calendar"
                                    className="w-full h-full border-0"
                                    loading="lazy"
                                />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Booking;