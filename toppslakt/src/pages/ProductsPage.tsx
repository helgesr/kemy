import { motion } from 'framer-motion';

const fadeUp: Record<string, any> = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
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
    description:
      'Fish-friendly splitting of fish groups based on weight.',
    features: [
      'Gentle weight-based sorting',
      'Minimal stress on fish',
      'Robust stainless steel construction (AISI304)',
      'Customizable size thresholds',
    ],
  },
  {
    name: 'KemyLice',
    image: '/images/kemylice.avif',
    description:
      'Cleans fish and return water from salmon lice and larvae. Also available for removal of cleaner fish and weak swimmers.',
    features: [
      'Effective lice flushing',
      'Return water purification',
      'Removal of weak swimmers',
      'Low-impact operation',
    ],
  },
  {
    name: 'KemyPump',
    image: '/images/kemypump.avif',
    description:
      'Efficient pumping of both fish and water using the mammut principle.',
    features: [
      'Gentle fish transport',
      'Air-driven suction principle',
      'Minimal mechanical contact',
      'Stainless steel (AISI304)',
    ],
  },
  {
    name: 'Delicing Units',
    image: '/images/delicing-unit.avif',
    description:
      'Complete containerized delousing systems for vessel-based operations.',
    features: [
      'Turnkey solutions',
      'Vessel-compatible',
      'Integrated KemySplit sorting',
      'High throughput capacity',
    ],
  },
  {
    name: 'Stun & Bleed',
    image: '/images/stun-bleed.avif',
    description:
      'Humane stunning and bleeding systems for on-board harvest processing.',
    features: [
      'Welfare-compliant stunning',
      'Efficient bleeding process',
      'Vessel-integrated design',
      'High-volume capacity',
    ],
  },
];

export default function ProductsPage() {
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
          Products
        </h1>
        <p className="mt-3 text-kemy-gray dark:text-kemy-light text-lg">
          All designed for fish-friendly handling
        </p>
      </motion.div>

      {/* Product Sections */}
      <div className="space-y-16">
        {products.map((product, index) => {
          const isEven = index % 2 === 1;
          return (
            <motion.section
              key={product.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              className={`flex flex-col ${
                isEven ? 'md:flex-row-reverse' : 'md:flex-row'
              } gap-8 items-center`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2">
                <div className="rounded-2xl overflow-hidden border border-kemy-border dark:border-kemy-dark-border">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-video object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2">
                <h2 className="font-heading text-2xl font-bold text-kemy-dark dark:text-kemy-dark-text">
                  {product.name}
                </h2>
                <p className="mt-3 text-kemy-plum dark:text-kemy-light leading-relaxed">
                  {product.description}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-kemy-dark dark:text-kemy-dark-text"
                    >
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-kemy-gray dark:bg-kemy-light shrink-0" />
                      {feature}
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
