import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  // slideshow images - remote URLs keep bundle small
  const images = [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1581276879432-15b80fb141a0?auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=1350&q=80",
  ];

  const [index, setIndex] = useState(0);
  const { t } = useTranslation();

  const { scrollY } = useScroll();
  // slight scale on scroll for parallax effect
  const titleScale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const textY = useTransform(scrollY, [0, 300], [0, -30]);

  useEffect(() => {
    // respect prefers-reduced-motion
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    // rotate image every 6s
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.section
      aria-label="Slideshow of Salesforce themed background images"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-20"
      style={{ zIndex: 0 }}
    >
      {/* Gradient base */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-600 via-green-500 to-teal-400 -z-10"
        style={{ zIndex: -1 }}
      />

      {/* Background slideshow */}
      <div className="hero-bg" aria-hidden="true">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            loading="lazy"
            alt=""
            className={i === index ? "active" : ""}
          />
        ))}
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white filter blur-3xl opacity-20"
          animate={{
            y: [0, -20, 0],
            x: [0, -10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-white filter blur-3xl opacity-20"
          animate={{
            y: [0, 20, 0],
            x: [0, 10, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.h1
          variants={fadeInUp}
          style={{ scale: titleScale }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight will-change-transform"
        >
          <span className="typewriter">{t('hero.title')}</span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          style={{ y: textY }}
          className="text-xl md:text-2xl lg:text-3xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed will-change-transform"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div variants={fadeInUp}>
          <motion.a
            href="#contact"
            whileHover={{
              scale: 1.05,
              y: -3,
              boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.15)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10
            }}
            className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
          >
            {t('hero.cta')}
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        variants={fadeInUp}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 15, 0],
          opacity: [1, 0.5, 1]
        }}
        transition={{
          duration: 4,
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
