import { motion } from "framer-motion";
import { UserIcon, ChartBarIcon, CheckBadgeIcon, ClockIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useTranslation, Trans } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
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
    { value: "5+", label: t('about.stats.years'), icon: <ClockIcon className="w-6 h-6" /> },
    { value: "50+", label: t('about.stats.projects'), icon: <CheckBadgeIcon className="w-6 h-6" /> },
    { value: "100%", label: t('about.stats.satisfaction'), icon: <UserIcon className="w-6 h-6" /> },
    { value: "24/7", label: t('about.stats.support'), icon: <ChartBarIcon className="w-6 h-6" /> }
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
            <img
              src="images/confident.png"
              alt="Jean-Luc Turquin - Salesforce Consultant"
              fill
              className="object-cover"
            />

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
            <div className="text-sm font-medium text-gray-600">{t('about.stats.badge')}</div>
          </motion.div>
        </motion.div>

        {/* Right Column - Content */}
        <motion.div variants={fadeInUp}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <Trans i18nKey="about.title" components={[<span className="text-blue-600" key="diffrenzz" />]}>
              About <span className="text-blue-600">Diffrenzz</span>
            </Trans>
          </h2>

          <div className="space-y-6 text-gray-700">
            <p className="text-lg leading-relaxed">{t('about.p1')}</p>

            <p className="text-lg leading-relaxed">{t('about.p2')}</p>

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
        {t('about.certs', { returnObjects: true }).map((cert, index) => (
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