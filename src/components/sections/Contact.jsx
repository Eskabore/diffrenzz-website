import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import {
    EnvelopeIcon,
    PhoneIcon,
    ClockIcon,
    CheckCircleIcon,
    ArrowRightIcon,
    BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const Contact = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const formRef = useRef(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    const xanoEndpoint = import.meta.env.VITE_XANO_ENDPOINT;

    // Unified focus handler for all screen sizes
    useEffect(() => {
        const handleFocus = (e) => {
            if (window.innerWidth <= 1024) { // Handles both mobile and small desktop
                setTimeout(() => {
                    e.target.scrollIntoView({
                        block: 'nearest',
                        behavior: 'smooth'
                    });
                }, 100);
            }
        };

        const inputs = formRef.current?.querySelectorAll('input, textarea, select');
        inputs?.forEach(input => input.addEventListener('focus', handleFocus));

        return () => {
            inputs?.forEach(input => input.removeEventListener('focus', handleFocus));
        };
    }, []);

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const onSubmit = async (data) => {
        if (!recaptchaToken) {
            alert("Please complete the reCAPTCHA verification");
            return;
        }

        // Double-check GDPR consent client-side
        if (!data.gdprConsent) {
            setError('gdprConsent', {
                type: 'manual',
                message: 'You must accept the privacy policy to proceed'
            });
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(xanoEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    company: data.company || '',
                    email: data.email,
                    subject: data.subject,
                    message: data.message,
                    gdprConsent: data.gdprConsent,
                    consentTimestamp: new Date().toISOString(),
                    recaptchaToken,
                    userAgent: navigator.userAgent,
                    ipAddress: '' // Xano will capture this from headers
                })
            });

            const result = await response.json();

            if (!response.ok) {
                // Handle Xano's GDPR validation errors
                if (result.error === "GDPR_CONSENT_REQUIRED") {
                    throw new Error(result.message);
                }
                throw new Error(result.message || 'Failed to submit form');
            }

            setIsSubmitted(true);
            reset();
            setRecaptchaToken(null);
        } catch (error) {
            console.error('Submission error:', error);
            // Special handling for GDPR errors
            if (error.message.includes('privacy policy')) {
                setError('gdprConsent', {
                    type: 'manual',
                    message: error.message
                });
            } else {
                alert(error.message || 'Error submitting form. Please try again later.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const contactMethods = [
        {
            icon: <EnvelopeIcon className="w-6 h-6 text-blue-600" />,
            title: "Email Us",
            description: "desk@diffrenzz.com",
            action: "mailto:desk@diffrenzz.com"
        },
        {
            icon: <PhoneIcon className="w-6 h-6 text-green-600" />,
            title: "Call Us",
            description: "+49 (0) 1 6344-82005",
            action: "tel:+491634482005"
        }
    ];

    // Reusable form field classes
    const inputClasses = (hasError) =>
        `w-full px-4 py-3 rounded-lg bg-gray-700 border ${hasError ? "border-red-500" : "border-gray-600"
        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`;

    return (
        <section id="contact" className="pt-28 pb-20 px-6 bg-gray-900 text-white">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="text-center mb-8"
                >
                    <h2 className="text-3xl font-bold mb-4">
                        Let's <span className="text-blue-400">Connect</span>
                    </h2>
                    <p className="text-lg text-gray-300">
                        Have a Salesforce project or need expert advice? Reach out today.
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Contact Form */}
                    <motion.div
                        variants={fadeInUp}
                        className="bg-gray-800 p-6 rounded-xl shadow-lg lg:w-2/3"
                    >
                        <h3 className="text-xl font-bold mb-4">Send Us a Message</h3>

                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-4 bg-green-50 text-green-800 rounded-lg flex items-start space-x-3 mb-6"
                            >
                                <CheckCircleIcon className="w-5 h-5 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold">Message Sent Successfully!</h4>
                                    <p>We'll get back to you within 24 hours.</p>
                                </div>
                            </motion.div>
                        ) : (
                            <form
                                id="contact-form"
                                ref={formRef}
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
                                            First Name *
                                        </label>
                                        <input
                                            id="firstName"
                                            {...register("firstName", { required: "First name is required" })}
                                            className={inputClasses(errors.firstName)}
                                        />
                                        {errors.firstName && (
                                            <p className="mt-1 text-sm text-red-400">{errors.firstName.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
                                            Last Name *
                                        </label>
                                        <input
                                            id="lastName"
                                            {...register("lastName", { required: "Last name is required" })}
                                            className={inputClasses(errors.lastName)}
                                        />
                                        {errors.lastName && (
                                            <p className="mt-1 text-sm text-red-400">{errors.lastName.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                                        <BuildingOfficeIcon className="w-4 h-4 mr-2" />
                                        Company
                                    </label>
                                    <input
                                        id="company"
                                        {...register("company")}
                                        className={inputClasses(false)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                        Email *
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
                                        className={inputClasses(errors.email)}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                                        Subject *
                                    </label>
                                    <select
                                        id="subject"
                                        {...register("subject", { required: "Subject is required" })}
                                        className={inputClasses(errors.subject)}
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
                                        Your Message *
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
                                        className={inputClasses(errors.message)}
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                                    )}
                                </div>

                                <div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="mt-4"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="mt-4"
                                    >
                                        <div className="flex items-start">
                                            <input
                                                id="gdpr-consent"
                                                type="checkbox"
                                                {...register("gdprConsent", {
                                                    required: "You must accept the privacy policy to proceed"
                                                })}
                                                className={`mt-1 h-4 w-4 rounded ${errors.gdprConsent ? 'border-red-500' : 'border-gray-300'
                                                    } focus:ring-blue-500 text-blue-600`}
                                            />
                                            <label htmlFor="gdpr-consent" className="ml-2 block text-sm text-gray-300">
                                                I consent to the processing of my personal data according to the{' '}
                                                <a
                                                    href="/privacy-policy"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-400 hover:underline"
                                                >
                                                    Privacy Policy
                                                </a>. *
                                            </label>
                                        </div>
                                        {errors.gdprConsent && (
                                            <p className="mt-1 text-sm text-red-400">{errors.gdprConsent.message}</p>
                                        )}
                                    </motion.div>

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
                                        className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center disabled:opacity-70 mt-6"
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
                    <div className="lg:w-1/3 space-y-6">
                        <motion.div variants={fadeInUp} className="space-y-4">
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
                                    <p className="text-gray-300 mb-1">Monday - Friday: 9am - 6pm CET</p>
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