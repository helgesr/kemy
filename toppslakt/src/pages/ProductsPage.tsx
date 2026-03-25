import { motion } from 'framer-motion';
import { useT } from '../i18n/LanguageContext';
import type { TranslationKey } from '../i18n/no';

const fadeUp: Record<string, any> = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface Product {
  name: string;
  image: string;
  descKey: TranslationKey;
  featureKeys: TranslationKey[];
}

const products: Product[] = [
  {
    name: 'KemySplit',
    image: '/images/kemysplit.avif',
    descKey: 'products.kemysplit.desc',
    featureKeys: ['products.kemysplit.f1', 'products.kemysplit.f2', 'products.kemysplit.f3', 'products.kemysplit.f4'],
  },
  {
    name: 'KemyLice',
    image: '/images/delicing-unit.avif',
    descKey: 'products.kemylice.desc',
    featureKeys: ['products.kemylice.f1', 'products.kemylice.f2', 'products.kemylice.f3', 'products.kemylice.f4'],
  },
  {
    name: 'KemyPump',
    image: '/images/kemypump-render.avif',
    descKey: 'products.kemypump.desc',
    featureKeys: ['products.kemypump.f1', 'products.kemypump.f2', 'products.kemypump.f3', 'products.kemypump.f4'],
  },
];

export default function ProductsPage() {
  const { t } = useT();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-14">
        <h1 className="text-3xl sm:text-4xl font-bold text-kemy-dark dark:text-kemy-dark-text">
          {t('products.title')}
        </h1>
        <p className="mt-3 text-kemy-gray dark:text-kemy-light">
          {t('products.subtitle')}
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
              <div className="w-full md:w-1/2">
                <div className="relative rounded-2xl overflow-hidden bg-kemy-surface dark:bg-kemy-dark-surface border border-kemy-border dark:border-kemy-dark-border">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-[4/3] object-cover object-center"
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_60px_rgba(0,0,0,0.3)]" />
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <h2 className="text-2xl font-bold text-kemy-dark dark:text-kemy-dark-text">
                  {product.name}
                </h2>
                <p className="mt-3 text-[15px] text-kemy-plum dark:text-kemy-light leading-relaxed">
                  {t(product.descKey)}
                </p>
                <ul className="mt-5 space-y-2">
                  {product.featureKeys.map((fk) => (
                    <li key={fk} className="flex items-start gap-2.5 text-sm text-kemy-dark dark:text-kemy-dark-text">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-risk-low shrink-0" />
                      {t(fk)}
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
