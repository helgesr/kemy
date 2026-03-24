import { motion } from 'framer-motion';

const fadeUp: Record<string, any> = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface Product {
  name: string;
  image: string;
  description: string;
  features: string[];
}

const products: Product[] = [
  {
    name: 'KemySplit',
    image: '/images/kemysplit.avif',
    description: 'Fish-friendly splitting of fish groups based on weight.',
    features: ['Gentle weight-based sorting', 'Minimal stress on fish', 'Robust stainless steel construction (AISI304)', 'Customizable size thresholds'],
  },
  {
    name: 'KemyLice',
    image: '/images/delicing-unit.avif',
    description: 'Cleans fish and return water from salmon lice and larvae. Also available for removal of cleaner fish and weak swimmers.',
    features: ['Effective lice flushing', 'Return water purification', 'Removal of weak swimmers', 'Low-impact operation'],
  },
  {
    name: 'KemyPump',
    image: '/images/kemylice.avif',
    description: 'Efficient pumping of both fish and water using the mammut principle.',
    features: ['Gentle fish transport', 'Air-driven suction principle', 'Minimal mechanical contact', 'Stainless steel (AISI304)'],
  },
];

export default function ProductsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-14">
        <h1 className="text-3xl sm:text-4xl font-bold text-kemy-dark dark:text-kemy-dark-text">
          Products
        </h1>
        <p className="mt-3 text-kemy-gray dark:text-kemy-light">
          All designed for fish-friendly handling
        </p>
      </motion.div>

      <div className="space-y-20">
        {products.map((product, i) => {
          const reverse = i % 2 === 1;
          return (
            <motion.section
              key={product.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center`}
            >
              {/* Image with soft vignette */}
              <div className="w-full md:w-1/2">
                <div className="relative rounded-2xl overflow-hidden bg-kemy-surface dark:bg-kemy-dark-surface border border-kemy-border dark:border-kemy-dark-border">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-[4/3] object-cover object-center"
                  />
                  {/* Soft vignette overlay to soften edges and embedded text */}
                  <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_60px_rgba(0,0,0,0.3)]" />
                </div>
              </div>

              {/* Text content */}
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl font-bold text-kemy-dark dark:text-kemy-dark-text">
                  {product.name}
                </h2>
                <p className="mt-3 text-[15px] text-kemy-plum dark:text-kemy-light leading-relaxed">
                  {product.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-kemy-dark dark:text-kemy-dark-text">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-risk-low shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
