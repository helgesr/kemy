import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const fadeUp: Record<string, any> = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const images = [
  '/images/2a1495_a5907a6ad8ee4b0f8cd780a48d8183be~mv2.avif',
  '/images/2a1495_ca045296a8834bf59cc7b3ab49b1ad7e~mv2.avif',
  '/images/2a1495_4294b3ff2cf8457a934e892d5539c241~mv2.avif',
  '/images/2a1495_8e7900bdcadc444c817c899fb9b11121~mv2.avif',
  '/images/2a1495_5cadef8044694bd398c440472333efe3~mv2.avif',
];

export default function CasePage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  function closeLightbox() { setLightboxIndex(null); }
  function prev() { if (lightboxIndex !== null) setLightboxIndex((lightboxIndex - 1 + images.length) % images.length); }
  function next() { if (lightboxIndex !== null) setLightboxIndex((lightboxIndex + 1) % images.length); }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-kemy-dark dark:text-kemy-dark-text">
          Case Studies
        </h1>
        <p className="mt-3 text-kemy-gray dark:text-kemy-light">
          Press coverage and proven results — click to enlarge
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {images.map((src, i) => (
          <motion.button
            key={src}
            variants={fadeUp}
            onClick={() => setLightboxIndex(i)}
            className="group relative rounded-2xl overflow-hidden bg-kemy-white dark:bg-kemy-dark-surface border border-kemy-border dark:border-kemy-dark-border cursor-pointer focus:outline-none focus:ring-2 focus:ring-risk-low"
          >
            <img src={src} alt={`Case study ${i + 1}`} className="w-full aspect-[4/3] object-cover object-top group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_0_50px_rgba(0,0,0,0.25)]" />
            <div className="absolute inset-0 bg-kemy-dark/0 group-hover:bg-kemy-dark/20 transition-colors flex items-center justify-center">
              <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">View full size</span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
              <X size={20} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
              <ChevronRight size={20} />
            </button>
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              src={images[lightboxIndex]}
              alt={`Case study ${lightboxIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {lightboxIndex + 1} / {images.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
