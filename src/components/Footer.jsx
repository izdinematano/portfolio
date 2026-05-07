import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t, lang } = useLanguage();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="px-6 md:px-12 py-8 border-t border-cream/10 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between">
        <p className="font-body text-[10px] text-muted uppercase tracking-wider">
          © {new Date().getFullYear()} Izdine Matano. {t.footerRights}
        </p>
        <p className="font-body text-[10px] text-muted uppercase tracking-wider hidden md:block">
          {lang === 'pt' ? 'Feito com obsessão' : 'Built with obsession'}
        </p>
      </div>

      {/* Scroll to top */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-10 h-10 bg-yellow text-black flex items-center justify-center z-[100]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t.footerTop}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>
    </footer>
  );
}
