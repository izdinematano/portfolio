import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

function CountUp({ end, suffix = '', inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
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
  }, [end, inView]);

  if (end === '∞') return <span>∞</span>;
  return <span>{count}{suffix}</span>;
}

export default function Stats() {
  const { t } = useLanguage();
  const ref = useRef(null);

  const stats = [
    { value: 48, suffix: '+', label: t.statsProjects },
    { value: 10, suffix: '+', label: t.statsYears },
    { value: 100, suffix: '%', label: t.statsSEO },
    { value: '∞', suffix: '', label: t.statsAI },
  ];
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="px-6 md:px-12 py-24 max-w-[1400px] mx-auto">
      <div
        ref={ref}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="text-center relative"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <div className="font-display text-5xl md:text-7xl text-yellow mb-3">
              <CountUp end={stat.value} suffix={stat.suffix} inView={inView} />
            </div>
            <div className="font-body text-xs text-muted uppercase tracking-wider">
              {stat.label}
            </div>

            {/* Separator */}
            {i < stats.length - 1 && (
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-16 bg-yellow/30" />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
