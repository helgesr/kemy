import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useT } from '../i18n/LanguageContext';

const fadeUp: Record<string, any> = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const { t } = useT();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    alert(t('contact.thanks'));
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  }

  const inputClasses =
    'w-full px-4 py-3 text-sm bg-kemy-white dark:bg-kemy-dark-surface text-kemy-dark dark:text-kemy-dark-text border border-kemy-border dark:border-kemy-dark-border rounded-xl outline-none focus:ring-2 focus:ring-kemy-dark/20 dark:focus:ring-kemy-dark-text/20 transition-shadow placeholder:text-kemy-light dark:placeholder:text-kemy-gray';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="text-center mb-14"
      >
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-kemy-dark dark:text-kemy-dark-text">
          {t('contact.title')}
        </h1>
        <p className="mt-3 text-kemy-gray dark:text-kemy-light text-lg">
          {t('contact.subtitle')}
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-xl mx-auto"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-kemy-white dark:bg-kemy-dark-surface rounded-2xl border border-kemy-border dark:border-kemy-dark-border p-6 sm:p-8 space-y-5"
        >
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-kemy-gray dark:text-kemy-light mb-1.5 uppercase tracking-wider">
              {t('contact.name')}
            </label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('contact.namePlaceholder')} required className={inputClasses} />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-medium text-kemy-gray dark:text-kemy-light mb-1.5 uppercase tracking-wider">
              {t('contact.email')}
            </label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('contact.emailPlaceholder')} required className={inputClasses} />
          </div>

          <div>
            <label htmlFor="subject" className="block text-xs font-medium text-kemy-gray dark:text-kemy-light mb-1.5 uppercase tracking-wider">
              {t('contact.subject')}
            </label>
            <input id="subject" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder={t('contact.subjectPlaceholder')} required className={inputClasses} />
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-medium text-kemy-gray dark:text-kemy-light mb-1.5 uppercase tracking-wider">
              {t('contact.message')}
            </label>
            <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t('contact.messagePlaceholder')} required rows={5} className={`${inputClasses} resize-none`} />
          </div>

          <button type="submit" className="w-full py-3 bg-kemy-dark dark:bg-kemy-dark-text text-white dark:text-kemy-dark font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity">
            {t('contact.send')}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
