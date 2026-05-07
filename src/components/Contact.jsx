import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const socials = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/izdine-matano/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

function MagneticButton({ children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.button>
  );
}

// Obter access_key gratuito em: https://web3forms.com/
// Coloca aqui a tua chave ou usa variável de ambiente VITE_WEB3FORMS_KEY
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || 'COLOCA_AQUI_A_TUA_ACCESS_KEY';

export default function Contact() {
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (WEB3FORMS_KEY === 'COLOCA_AQUI_A_TUA_ACCESS_KEY') {
      alert(lang === 'pt'
        ? 'Configura a tua Web3Forms access_key no Contact.jsx ou no .env'
        : 'Set your Web3Forms access_key in Contact.jsx or .env');
      return;
    }

    setStatus('sending');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: 'Nova mensagem do Portfolio',
          from_name: 'Portfolio Izdine',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }

    // Reset status after 5s
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="contact" className="px-6 md:px-12 py-24 max-w-[1400px] mx-auto">
      <motion.h2
        className="font-display text-cream leading-[0.95] mb-8"
        style={{ fontSize: 'clamp(60px, 10vw, 140px)' }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {t.contactTitle1}
        <br />
        {t.contactTitle2}
      </motion.h2>

      <motion.a
        href="mailto:izdinematano@gmail.com"
        className="block font-body text-lg md:text-2xl text-cream hover:text-yellow transition-colors duration-300 mb-4 border-b border-cream/20 pb-2 w-fit"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        izdinematano@gmail.com
      </motion.a>

      {/* Telefones */}
      <motion.div
        className="flex flex-wrap gap-6 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25 }}
      >
        <a
          href="tel:+258845317940"
          className="font-body text-sm text-cream/70 hover:text-yellow transition-colors flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          {t.contactPhone1}
        </a>
        <a
          href="tel:+258823438161"
          className="font-body text-sm text-cream/70 hover:text-yellow transition-colors flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          {t.contactPhone2}
        </a>
      </motion.div>

      {/* Socials */}
      <motion.div
        className="flex gap-6 mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-cream hover:text-yellow transition-colors"
          >
            {s.icon}
            <span className="font-body text-xs uppercase tracking-wider">{s.name}</span>
          </a>
        ))}
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="max-w-xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="mb-6">
          <input
            type="text"
            name="name"
            placeholder={t.contactName}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-transparent border-b border-cream/30 py-3 font-body text-sm text-cream placeholder:text-muted focus:outline-none focus:border-yellow transition-colors"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="email"
            name="email"
            placeholder={t.contactEmail}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-transparent border-b border-cream/30 py-3 font-body text-sm text-cream placeholder:text-muted focus:outline-none focus:border-yellow transition-colors"
            required
          />
        </div>
        <div className="mb-8">
          <textarea
            name="message"
            placeholder={t.contactMessage}
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-transparent border-b border-cream/30 py-3 font-body text-sm text-cream placeholder:text-muted focus:outline-none focus:border-yellow transition-colors resize-none"
            required
          />
        </div>

        {/* Status message */}
        {status === 'success' && (
          <p className="font-body text-sm text-green-400 mb-6">{t.contactSuccess}</p>
        )}
        {status === 'error' && (
          <p className="font-body text-sm text-red-400 mb-6">{t.contactError}</p>
        )}

        <MagneticButton className="group font-body text-sm uppercase tracking-wider text-black bg-yellow px-8 py-3 flex items-center gap-2 hover:bg-cream transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          {status === 'sending' ? t.contactSending : t.contactSend}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="group-hover:translate-x-1 transition-transform"
          >
            <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </MagneticButton>
      </motion.form>
    </section>
  );
}
