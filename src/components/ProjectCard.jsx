import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../context/LanguageContext';

export default function ProjectCard({ project, onClick }) {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      className={`project-card relative overflow-hidden group ${
        project.featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onClick={() => onClick(project)}
    >
      <div
        className={`relative w-full overflow-hidden ${
          project.featured ? 'h-[400px] md:h-[600px]' : 'h-[300px] md:h-[400px]'
        }`}
      >
        {/* Base: gradient */}
        <div className="absolute inset-0" style={{ background: project.gradient }} />

        {/* Image (fica quase escondida por baixo do overlay) */}
        {project.image ? (
          <img
            src={project.image}
            alt={project.titulo}
            className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-opacity duration-500"
            loading="lazy"
          />
        ) : null}

        {/* Color overlay: imagem escondida, gradiente é o que se vê */}
        <div
          className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-20"
          style={{ background: project.gradient, opacity: 0.85 }}
        />

        {/* Giant number */}
        <span
          className="absolute bottom-4 right-4 font-display text-[120px] md:text-[180px] leading-none text-cream/10 select-none pointer-events-none z-10"
        >
          {project.numero}
        </span>

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
          <div className="flex items-start justify-between">
            <span className="font-body text-[10px] uppercase tracking-widest text-cream/70 bg-black/30 px-2 py-1">
              {project.tags[0] || 'Web Design'}
            </span>
            <span className="font-body text-[10px] text-cream/50">{project.ano}</span>
          </div>

          <div>
            <h3 className="font-display text-2xl md:text-3xl text-cream leading-tight max-w-[80%] drop-shadow-lg">
              {project.titulo}
            </h3>
          </div>
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span className="font-body text-sm text-yellow uppercase tracking-wider flex items-center gap-2">
            {t.projectsView}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-yellow">
              <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
