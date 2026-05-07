import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const skills = [
  { name: 'UI/UX Design', value: 95 },
  { name: 'Front-end Dev', value: 90 },
  { name: 'SEO & Performance', value: 88 },
  { name: 'AI & Chatbots', value: 85 },
  { name: 'Marketing Digital', value: 82 },
  { name: 'WordPress / E-commerce', value: 90 },
  { name: 'VPS / Cloud Hosting', value: 85 },
  { name: 'Linux / cPanel / WHM', value: 80 },
  { name: 'DNS / SSL / DevOps', value: 78 },
  { name: 'APIs / Integrações', value: 88 },
];

function SkillBar({ name, value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="font-body text-xs text-cream uppercase tracking-wider">{name}</span>
        <span className="font-body text-xs text-muted">{value}%</span>
      </div>
      <div className="h-[2px] bg-cream/10 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-yellow"
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : {}}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="px-6 md:px-12 py-24 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-5xl md:text-7xl text-cream mb-8">{t.aboutTitle}</h2>

          <p className="font-body text-sm text-cream/80 leading-relaxed mb-6">
            {t.aboutBio}
          </p>

          <p className="font-body text-sm italic text-cream/60 leading-relaxed mb-8 border-l-2 border-yellow pl-4">
            {t.aboutQuote}
          </p>

          {/* Skills */}
          <div>
            <h3 className="font-body text-xs uppercase tracking-widest text-muted mb-6">{t.aboutSkills}</h3>
            {skills.map((s) => (
              <SkillBar key={s.name} name={s.name} value={s.value} />
            ))}
          </div>

          {/* Badge */}
          <div className="mt-8 inline-flex items-center gap-2 bg-card px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="font-body text-xs text-cream uppercase tracking-wider">
              {t.aboutAvailable}
            </span>
          </div>
        </motion.div>

        {/* Right - Profile photo */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden">
            <img
              src="/profile.png"
              alt="Izdine Matano"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
