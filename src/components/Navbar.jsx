import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { t, lang, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t.navWork, href: '#work' },
    { label: t.navAbout, href: '#about' },
    { label: t.navContact, href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 80);
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-yellow z-[1001]"
        style={{ width: `${progress}%` }}
      />

      <motion.nav
        className={`fixed top-0 left-0 w-full z-[1000] px-6 md:px-12 py-5 flex items-center justify-between transition-colors duration-300 ${
          scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="font-display text-[28px] text-cream tracking-wide"
        >
          Izdine Matano
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className="group relative font-body text-sm text-cream uppercase tracking-wider"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-yellow transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <button
            onClick={toggleLang}
            className="font-body text-sm text-cream uppercase tracking-wider border border-cream/30 px-3 py-1 hover:border-yellow hover:text-yellow transition-colors"
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>
        </div>

        {/* Mobile hamburger + lang */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="font-body text-sm text-cream uppercase tracking-wider border border-cream/30 px-2 py-1"
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <motion.span
              className="block w-6 h-[2px] bg-cream"
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block w-6 h-[2px] bg-cream"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block w-6 h-[2px] bg-cream"
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-[999] flex flex-col items-center justify-center gap-8 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="font-display text-4xl text-cream uppercase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
