import { motion } from 'framer-motion';

const content = 'WEB DESIGN \u00B7 UI/UX \u00B7 FRONT-END \u00B7 REACT \u00B7 WORDPRESS \u00B7 E-COMMERCE \u00B7 RESPONSIVE \u00B7 SEO \u00B7 ';

export default function Marquee() {
  const repeated = Array(6).fill(content).join('');

  return (
    <div className="bg-yellow py-3 overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-block font-display text-black text-sm uppercase tracking-widest"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        {repeated}
      </motion.div>
    </div>
  );
}
