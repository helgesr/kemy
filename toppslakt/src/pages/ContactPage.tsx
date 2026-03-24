import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';

const fadeUp: Record<string, any> = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you shortly.');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  }

  const inputClasses =
    'w-full px-4 py-3 text-sm bg-kemy-white dark:bg-kemy-dark-surface text-kemy-dark dark:text-kemy-dark-text border border-kemy-border dark:border-kemy-dark-border rounded-xl outline-none focus:ring-2 focus:ring-kemy-dark/20 dark:focus:ring-kemy-dark-text/20 transition-shadow placeholder:text-kemy-light dark:placeholder:text-kemy-gray';

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
          Contact
        </h1>
        <p className="mt-3 text-kemy-gray dark:text-kemy-light text-lg">
          Get in touch with our team
        </p>
      </motion.div>

      {/* Contact Form */}
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
            <label
              htmlFor="name"
              className="block text-xs font-medium text-kemy-gray dark:text-kemy-light mb-1.5 uppercase tracking-wider"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-kemy-gray dark:text-kemy-light mb-1.5 uppercase tracking-wider"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-xs font-medium text-kemy-gray dark:text-kemy-light mb-1.5 uppercase tracking-wider"
            >
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What is this regarding?"
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs font-medium text-kemy-gray dark:text-kemy-light mb-1.5 uppercase tracking-wider"
            >
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us more about your needs..."
              required
              rows={5}
              className={`${inputClasses} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-kemy-dark dark:bg-kemy-dark-text text-white dark:text-kemy-dark font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  );
}
