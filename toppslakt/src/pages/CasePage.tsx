import { motion } from 'framer-motion';

const fadeUp: Record<string, any> = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const caseImages = [
  {
    src: '/images/2a1495_a5907a6ad8ee4b0f8cd780a48d8183be~mv2.avif',
    alt: 'Case study: On-board fish handling',
  },
  {
    src: '/images/2a1495_ca045296a8834bf59cc7b3ab49b1ad7e~mv2.avif',
    alt: 'Case study: Delousing operation',
  },
  {
    src: '/images/2a1495_4294b3ff2cf8457a934e892d5539c241~mv2.avif',
    alt: 'Case study: Equipment installation',
  },
  {
    src: '/images/2a1495_8e7900bdcadc444c817c899fb9b11121~mv2.avif',
    alt: 'Case study: Vessel operations',
  },
  {
    src: '/images/2a1495_5cadef8044694bd398c440472333efe3~mv2.avif',
    alt: 'Case study: Fish processing',
  },
];

export default function CasePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Page Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="text-center mb-14"
      >
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-kemy-dark dark:text-kemy-dark-text">
          Case Studies
        </h1>
        <p className="mt-3 text-kemy-gray dark:text-kemy-light text-lg">
          Proven results across the industry
        </p>
      </motion.div>

      {/* Case Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {caseImages.map((item) => (
          <motion.div
            key={item.src}
            variants={fadeUp}
            className="group rounded-2xl overflow-hidden border border-kemy-border dark:border-kemy-dark-border bg-kemy-white dark:bg-kemy-dark-surface"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
