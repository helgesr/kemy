import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator } from 'lucide-react';

const fadeUp: Record<string, any> = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const products = [
  { title: 'KemySplit', image: '/images/kemysplit-render.avif', description: 'Fish-friendly weight-based sorting of fish groups' },
  { title: 'KemyLice', image: '/images/kemylice.avif', description: 'Delousing and return water cleaning system' },
  { title: 'KemyPump', image: '/images/kemypump.avif', description: 'Mammut-principle fish and water pumping' },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero with background image and strong overlay */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <img
          src="/images/hero-waves.avif"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Heavy gradient overlay: hides embedded image text, darkens bottom for our text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-16 pt-40 w-full">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              Designed for
              <br />
              the fish.
            </h1>
            <p className="mt-5 text-lg text-white/60 max-w-md">
              Fish handling equipment engineered for welfare, efficiency and durability. Proven across Norwegian aquaculture.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-kemy-dark font-semibold text-sm rounded-xl hover:bg-white/90 transition-colors"
              >
                Explore Products <ArrowRight size={16} />
              </Link>
              <Link
                to="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium text-sm rounded-xl border border-white/15 hover:bg-white/15 transition-colors"
              >
                <Calculator size={16} /> Harvest Calculator
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Highlights */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="max-w-6xl mx-auto px-4 sm:px-6 py-16"
      >
        <h2 className="text-2xl font-bold text-kemy-dark dark:text-kemy-dark-text text-center mb-10">
          Our Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <motion.div key={p.title} variants={fadeUp}>
              <Link
                to="/products"
                className="group block bg-kemy-white dark:bg-kemy-dark-surface rounded-2xl overflow-hidden border border-kemy-border dark:border-kemy-dark-border hover:shadow-lg transition-shadow"
              >
                {/* Image with soft inner shadow to mask any embedded text */}
                <div className="relative aspect-[4/3] overflow-hidden bg-kemy-surface dark:bg-kemy-dark-bg">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Soft vignette to fade image edges */}
                  <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_0_40px_rgba(0,0,0,0.25)]" />
                </div>
                <div className="p-5">
                  <h3 className="text-[15px] font-semibold text-kemy-dark dark:text-kemy-dark-text">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-kemy-gray dark:text-kemy-light">
                    {p.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Tools CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeUp}
        className="max-w-6xl mx-auto px-4 sm:px-6 pb-20"
      >
        <div className="relative overflow-hidden rounded-2xl bg-kemy-white dark:bg-kemy-dark-surface border border-kemy-border dark:border-kemy-dark-border p-8 sm:p-12">
          <div className="absolute top-0 left-0 w-1 h-full bg-risk-low rounded-l-2xl" />
          <div className="max-w-xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-risk-low mb-2">
              Decision Support
            </span>
            <h2 className="text-2xl font-bold text-kemy-dark dark:text-kemy-dark-text">
              Harvest Risk Calculator
            </h2>
            <p className="mt-3 text-sm text-kemy-gray dark:text-kemy-light leading-relaxed">
              Assess whether it's the right time for selective top-harvesting with our 12-factor risk scoring tool.
            </p>
            <Link
              to="/tools"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-risk-low text-white font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity"
            >
              Open Calculator <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
