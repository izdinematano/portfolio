import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function ProjectModal({ project, onClose, onPrev, onNext }) {
  const { t } = useLanguage();
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    if (project) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-card w-full max-w-5xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-cream hover:text-yellow transition-colors"
              aria-label="Fechar"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 2L18 18M18 2L2 18" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <div
                className="relative h-[300px] md:h-[500px] overflow-hidden"
                style={{ background: project.image ? 'transparent' : project.gradient }}
              >
                {project.image ? (
                  <img
                    src={`${import.meta.env.BASE_URL}${project.image.replace(/^\//, '')}`}
                    alt={project.titulo}
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>

              {/* Info */}
              <div className="p-8 md:p-12 flex flex-col">
                <span className="font-body text-[10px] text-muted uppercase tracking-widest mb-4">
                  {project.tags[0] || 'Web Design'} — {project.ano}
                </span>

                <h3 className="font-display text-3xl md:text-4xl text-cream mb-6">
                  {project.titulo}
                </h3>

                <p className="font-body text-sm text-cream/70 leading-relaxed mb-8">
                  {project.descricao}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-body text-[10px] uppercase tracking-wider text-black bg-yellow px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Visit link */}
                {project.link && project.link !== '#' && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-body text-xs text-yellow uppercase tracking-wider hover:text-cream transition-colors mb-auto"
                  >
                    {t.modalVisit}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-cream/10">
                  <button
                    onClick={onPrev}
                    className="font-body text-xs text-cream/50 hover:text-yellow uppercase tracking-wider transition-colors"
                  >
                    {t.modalPrev}
                  </button>
                  <span className="font-display text-2xl text-cream/20">
                    {project.numero}
                  </span>
                  <button
                    onClick={onNext}
                    className="font-body text-xs text-cream/50 hover:text-yellow uppercase tracking-wider transition-colors"
                  >
                    {t.modalNext}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
