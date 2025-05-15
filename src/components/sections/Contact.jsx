import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  EnvelopeIcon,
  PhoneIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  console.log("Using siteKey:", siteKey);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const onSubmit = async (data) => {
    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA verification");
      return;
    }

    setIsLoading(true);

    try {
      // First get Salesforce access token
      const authResponse = await fetch('https://login.salesforce.com/services/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
  grant_type: 'password',
  client_id: import.meta.env.VITE_SF_CLIENT_ID,
  client_secret: import.meta.env.VITE_SF_CLIENT_SECRET,
  username: import.meta.env.VITE_SF_USERNAME,
  password: import.meta.env.VITE_SF_PASSWORD
})
      });

      const authData = await authResponse.json();
      if (!authResponse.ok) throw new Error(authData.error || 'Authentication failed');

      // Now submit the lead data
      const leadResponse = await fetch(`${authData.instance_url}/services/data/v56.0/sobjects/Lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData.access_token}`
        },
        body: JSON.stringify({
          FirstName: data.name.split(' ')[0],
          LastName: data.name.split(' ').slice(1).join(' ') || 'Not provided',
          Email: data.email,
          Company: 'Website Inquiry',
          Subject__c: data.subject,
          Description: data.message,
          LeadSource: 'Website',
          reCAPTCHA_Token__c: recaptchaToken
        })
      });

      if (!leadResponse.ok) {
        const errorData = await leadResponse.json();
        throw new Error(errorData[0]?.message || 'Lead creation failed');
      }

      setIsSubmitted(true);
      reset();
      setRecaptchaToken(null);
    } catch (error) {
      console.error('Submission error:', error);
      alert(`Error submitting form: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
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
    }
  ];

  return (
    <section id="contact" className="py-20 px-6 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's <span className="text-blue-400">Connect</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have a Salesforce project or need expert advice? Reach out today.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            variants={fadeInUp}
            className="bg-gray-800 p-8 rounded-xl shadow-lg"
          >
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
                    <option value="Consultation">Salesforce Consultation</option>
                    <option value="Implementation">Implementation Help</option>
                    <option value="Integration">System Integration</option>
                    <option value="Other">Other Inquiry</option>
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

                <div className="mt-4">
                  <ReCAPTCHA
                    sitekey={siteKey}
                    onChange={(token) => setRecaptchaToken(token)}
                    onExpired={() => setRecaptchaToken(null)}
                    onErrored={() => setRecaptchaToken(null)}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center disabled:opacity-70"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <>
                      Send Message
                      <ArrowRightIcon className="w-5 h-5 ml-2" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Contact Information */}
          <div className="space-y-8">
            <motion.div variants={fadeInUp} className="space-y-6">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;