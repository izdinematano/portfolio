import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.categoria === activeFilter);

  return (
    <section id="work" className="px-6 md:px-12 py-24 max-w-[1400px] mx-auto">
      <motion.h2
        className="font-display text-5xl md:text-7xl text-cream mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {t.projectsTitle}
      </motion.h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-12">
        {[
          { key: 'all', label: t.projectsFilterAll },
          { key: 'web', label: t.projectsFilterWeb },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`font-body text-xs uppercase tracking-wider px-5 py-2 border transition-all duration-300 ${
              activeFilter === f.key
                ? 'bg-yellow text-black border-yellow'
                : 'bg-transparent text-cream border-cream/30 hover:border-cream'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <ProjectCard project={project} onClick={setSelectedProject} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onPrev={() => {
          const idx = filtered.findIndex((p) => p.id === selectedProject.id);
          if (idx > 0) setSelectedProject(filtered[idx - 1]);
        }}
        onNext={() => {
          const idx = filtered.findIndex((p) => p.id === selectedProject.id);
          if (idx < filtered.length - 1) setSelectedProject(filtered[idx + 1]);
        }}
      />
    </section>
  );
}
