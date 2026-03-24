import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp: Record<string, any> = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const products = [
  {
    title: 'KemySplit',
    image: '/images/kemysplit.avif',
    description: 'Fish-friendly weight-based sorting',
  },
  {
    title: 'KemyLice',
    image: '/images/kemylice.avif',
    description: 'Delousing and return water cleaning',
  },
  {
    title: 'KemyPump',
    image: '/images/kemypump.avif',
    description: 'Mammut-principle fish & water pumping',
  },
];

export default function HomePage() {
  return (
    <div className="font-body">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <img
          src="/images/hero-waves.avif"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-kemy-dark/70 via-kemy-dark/50 to-kemy-dark/80" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative z-10 text-center px-6 max-w-3xl mx-auto"
        >
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight">
            Designed for the fish.
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-white/80 font-medium">
            Proven in practice.
          </p>
          <Link
            to="/products"
            className="mt-8 inline-block px-8 py-3.5 bg-white text-kemy-dark font-semibold text-sm rounded-xl hover:bg-white/90 transition-colors"
          >
            Explore Products
          </Link>
        </motion.div>
      </section>

      {/* Product Highlights */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        className="max-w-6xl mx-auto px-4 sm:px-6 py-16"
      >
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-kemy-dark dark:text-kemy-dark-text text-center mb-10">
          Our Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <motion.div key={product.title} variants={fadeUp}>
              <Link
                to="/products"
                className="block bg-kemy-white dark:bg-kemy-dark-surface rounded-2xl overflow-hidden border border-kemy-border dark:border-kemy-dark-border hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-semibold text-kemy-dark dark:text-kemy-dark-text">
                    {product.title}
                  </h3>
                  <p className="mt-1 text-sm text-kemy-gray dark:text-kemy-light">
                    {product.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Tools Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
        className="max-w-6xl mx-auto px-4 sm:px-6 pb-16"
      >
        <div className="relative overflow-hidden rounded-2xl bg-kemy-white dark:bg-kemy-dark-surface border border-kemy-border dark:border-kemy-dark-border p-8 sm:p-12">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-risk-low rounded-l-2xl" />
          <div className="max-w-xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-risk-low mb-3">
              New Tool
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-kemy-dark dark:text-kemy-dark-text">
              Decision Support Tool
            </h2>
            <p className="mt-3 text-kemy-plum dark:text-kemy-light leading-relaxed">
              Assess harvest timing with our risk calculator for selective
              top-harvesting.
            </p>
            <Link
              to="/tools"
              className="mt-6 inline-block px-6 py-3 bg-risk-low text-white font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity"
            >
              Open Calculator
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 px-4">
        <p className="text-center text-xs text-kemy-light dark:text-kemy-gray">
          Powered by Saxe.Tech AS &copy; 2026
        </p>
      </footer>
    </div>
  );
}
