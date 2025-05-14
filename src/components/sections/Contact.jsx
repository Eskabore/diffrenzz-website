import { motion } from "framer-motion";
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon 
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
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

  const onSubmit = async (data) => {
    // Replace with your form submission logic
    console.log(data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactMethods = [
    {
      icon: <EnvelopeIcon className="w-6 h-6 text-blue-600" />,
      title: "Email Us",
      description: "hello@diffrenzz.com",
      action: "mailto:hello@diffrenzz.com"
    },
    {
      icon: <PhoneIcon className="w-6 h-6 text-green-600" />,
      title: "Call Us",
      description: "+1 (555) 123-4567",
      action: "tel:+15551234567"
    },
    {
      icon: <MapPinIcon className="w-6 h-6 text-purple-600" />,
      title: "Location",
      description: "San Francisco, CA",
      action: "https://maps.google.com"
    }
  ];

  return (
    <motion.section 
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-20 px-6 bg-gray-900 text-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's <span className="text-blue-400">Connect</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have a Salesforce project or need expert advice? Reach out today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div variants={fadeInUp} className="bg-gray-800 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-green-50 text-green-800 rounded-lg flex items-start space-x-3"
              >
                <CheckCircleIcon className="w-6 h-6 flex-shrink-0" />
                <div>
                  <h4 className="font-bold">Message Sent Successfully!</h4>
                  <p>We'll get back to you within 24 hours.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${
                      errors.name ? "border-red-500" : "border-gray-600"
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${
                      errors.email ? "border-red-500" : "border-gray-600"
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    {...register("subject", { required: "Subject is required" })}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${
                      errors.subject ? "border-red-500" : "border-gray-600"
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  >
                    <option value="">Select a topic</option>
                    <option value="consultation">Salesforce Consultation</option>
                    <option value="implementation">Implementation Help</option>
                    <option value="integration">System Integration</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register("message", { 
                      required: "Message is required",
                      minLength: {
                        value: 20,
                        message: "Message must be at least 20 characters"
                      }
                    })}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${
                      errors.message ? "border-red-500" : "border-gray-600"
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                >
                  Send Message
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Contact Information */}
          <div className="space-y-8">
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-gray-300 mb-8">
                Get in touch through any of these channels. We typically respond within 24 hours.
              </p>
              
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={index}
                    variants={fadeInUp}
                    href={method.action}
                    whileHover={{ x: 5 }}
                    className="flex items-start space-x-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <div className="p-3 rounded-full bg-gray-700">
                      {method.icon}
                    </div>
                    <div>
                      <h4 className="font-bold">{method.title}</h4>
                      <p className="text-gray-300">{method.description}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-gray-800 p-6 rounded-xl">
              <div className="flex items-start space-x-3">
                <ClockIcon className="w-6 h-6 text-blue-400 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-2">Working Hours</h4>
                  <p className="text-gray-300 mb-1">Monday - Friday: 9am - 6pm PST</p>
                  <p className="text-gray-300">Weekends: Emergency support only</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {[
                  { name: "LinkedIn", icon: "linkedin", color: "bg-blue-600" },
                  { name: "Twitter", icon: "twitter", color: "bg-blue-400" },
                  { name: "GitHub", icon: "github", color: "bg-gray-700" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ y: -3 }}
                    className={`w-10 h-10 ${social.color} rounded-full flex items-center justify-center text-white`}
                    aria-label={social.name}
                  >
                    <span className="sr-only">{social.name}</span>
                    {/* Replace with actual social icons or SVG */}
                    {social.icon[0].toUpperCase()}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;