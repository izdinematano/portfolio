import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = typeof target === 'number' ? target : 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  if (target === '∞') return <span>∞</span>;
  return <span>{count}{suffix}</span>;
}

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 pb-12 overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#F2EDE4 1px, transparent 1px), linear-gradient(90deg, #F2EDE4 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        className="relative z-10 max-w-[1400px] mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="font-display text-cream leading-[0.9] tracking-tight"
          style={{ fontSize: 'clamp(64px, 14vw, 200px)' }}
        >
          WEB
        </motion.h1>
        <motion.h1
          variants={itemVariants}
          className="font-display leading-[0.9] tracking-tight"
          style={{ fontSize: 'clamp(64px, 14vw, 200px)' }}
        >
          <span className="text-cream">DEVELOPER</span>
          <span className="text-yellow">.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="font-body text-muted text-sm md:text-base mt-8 tracking-wider"
        >
          {t.heroSubtitle}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-6 md:gap-12 mt-12"
        >
          {[
            { value: 48, suffix: '+', label: t.heroProjects },
            { value: 10, suffix: '+', label: t.heroYears },
            { value: '∞', suffix: '', label: t.heroPassion },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl md:text-5xl text-yellow">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-body text-xs text-muted mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="font-body text-[10px] text-muted uppercase tracking-widest">Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="text-muted">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" />
          <motion.circle
            cx="8"
            cy="8"
            r="2"
            fill="currentColor"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>
    </section>
  );
}
