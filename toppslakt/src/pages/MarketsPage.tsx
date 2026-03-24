import { motion } from 'framer-motion';

const fadeUp: Record<string, any> = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const images = [
  { src: '/images/2a1495_2fb4e8bbd52741d58cecbb28b4bfb9d6~mv2.avif', alt: 'Aquaculture operations', tall: true },
  { src: '/images/2a1495_4018224aef2446baa8c2c27d0090ee61~mv2.avif', alt: 'Fish farming facility', tall: false },
  { src: '/images/2a1495_7eeecd8dc0d24a5abe11265d0b198f66~mv2.avif', alt: 'Vessel-based operations', tall: false },
  { src: '/images/opt.avif', alt: 'Equipment in action', tall: true },
];

export default function MarketsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-14">
        <h1 className="text-3xl sm:text-4xl font-bold text-kemy-dark dark:text-kemy-dark-text">
          Markets
        </h1>
        <p className="mt-3 text-kemy-gray dark:text-kemy-light">
          Where our technology makes a difference
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-[200px] sm:auto-rows-[220px]"
      >
        {images.map((img) => (
          <motion.div
            key={img.src}
            variants={fadeUp}
            className={`group relative rounded-2xl overflow-hidden border border-kemy-border dark:border-kemy-dark-border ${img.tall ? 'row-span-2' : 'row-span-1'}`}
          >
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_0_50px_rgba(0,0,0,0.25)]" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
