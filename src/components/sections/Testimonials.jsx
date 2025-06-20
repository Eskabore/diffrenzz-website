import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: 'Sophie Wagner',
    role: 'Head of Operations, Klarview Solutions',
    feedback:
      'Working with Diffrenzz completely reshaped how we use Salesforce. Our workflows are smoother, reporting is clearer, and the automation saves us hours every week. They felt like part of our team.',
    avatar:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=80&q=80'
  },
  {
    name: 'Liam Patel',
    role: 'CTO, Brightline Technologies',
    feedback:
      'Diffrenzz delivered beyond our expectations. They connected Salesforce to our internal tools in record time, and the integration has been rock solid. Communication was transparent at every step.',
    avatar:
      'https://images.unsplash.com/photo-1544723495-432537d1f88f?auto=format&fit=crop&w=80&q=80'
  },
  {
    name: 'Emily Schneider',
    role: 'Director of Development, HopeBridge Foundation',
    feedback:
      'Diffrenzz helped us streamline donor management and reporting. Their team was responsive, detail-oriented, and truly understood the needs of a nonprofit like ours.',
    avatar:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=80&q=80'
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Client <span className="text-blue-600">Testimonials</span>
        </h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8 shadow-md"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{t.feedback}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
