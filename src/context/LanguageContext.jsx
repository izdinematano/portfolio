import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  pt: {
    // Navbar
    navWork: 'Work',
    navAbout: 'Sobre',
    navContact: 'Contacto',

    // Hero
    heroSubtitle: 'Web Design · UI/UX · Front-end · SEO · AI · Chatbots',
    heroProjects: 'Projectos',
    heroYears: 'Anos',
    heroPassion: 'Paixão',

    // Marquee (same in both, skills are universal)

    // Projects
    projectsTitle: 'ALGUNS PROJECTOS',
    projectsFilterAll: 'TODOS',
    projectsFilterWeb: 'WEB DESIGN',
    projectsView: 'Ver Projecto',

    // ProjectModal
    modalVisit: 'Visitar Site',
    modalPrev: '← Anterior',
    modalNext: 'Próximo →',

    // About
    aboutTitle: 'SOBRE',
    aboutBio:
      'Web Designer & Front-end Developer com 8+ anos de experiência a criar soluções digitais em Moçambique. Especialista em websites institucionais, e-commerce, plataformas com IA e chatbots, e estratégias de SEO. Combino design, desenvolvimento e marketing digital para entregar projectos que geram resultados reais.',
    aboutQuote:
      '"Design não é apenas como algo se parece — é como funciona, como se sente e como conecta pessoas a ideias."',
    aboutSkills: 'Skills',
    aboutAvailable: 'Disponível para projectos',

    // Stats
    statsProjects: 'Projectos Entregues',
    statsYears: 'Anos Experiência',
    statsSEO: 'SEO Optimizado',
    statsAI: 'Inovação com IA',

    // Contact
    contactTitle1: 'VAMOS CRIAR',
    contactTitle2: 'ALGO INCRÍVEL?',
    contactPhone1: '+258 84 531 7940',
    contactPhone2: '+258 82 343 8161',
    contactName: 'Nome',
    contactEmail: 'Email',
    contactMessage: 'Mensagem',
    contactSend: 'Enviar',
    contactSending: 'A enviar...',
    contactSuccess: 'Mensagem enviada! Entrarei em contacto em breve.',
    contactError: 'Erro ao enviar. Por favor, tenta novamente.',

    // Footer
    footerRights: 'Todos os direitos reservados.',
    footerTop: 'Topo',
  },
  en: {
    // Navbar
    navWork: 'Work',
    navAbout: 'About',
    navContact: 'Contact',

    // Hero
    heroSubtitle: 'Web Design · UI/UX · Front-end · SEO · AI · Chatbots',
    heroProjects: 'Projects',
    heroYears: 'Years',
    heroPassion: 'Passion',

    // Projects
    projectsTitle: 'SELECTED PROJECTS',
    projectsFilterAll: 'ALL',
    projectsFilterWeb: 'WEB DESIGN',
    projectsView: 'View Project',

    // ProjectModal
    modalVisit: 'Visit Site',
    modalPrev: '← Prev',
    modalNext: 'Next →',

    // About
    aboutTitle: 'ABOUT',
    aboutBio:
      'Web Designer & Front-end Developer with 8+ years of experience creating digital solutions in Mozambique. Specialist in institutional websites, e-commerce, AI-powered platforms and chatbots, and SEO strategies. I combine design, development and digital marketing to deliver projects that generate real results.',
    aboutQuote:
      '"Design is not just how it looks — it is how it works, how it feels, and how it connects people to ideas."',
    aboutSkills: 'Skills',
    aboutAvailable: 'Available for projects',

    // Stats
    statsProjects: 'Projects Delivered',
    statsYears: 'Years Experience',
    statsSEO: 'SEO Optimized',
    statsAI: 'Innovation with AI',

    // Contact
    contactTitle1: "LET'S CREATE",
    contactTitle2: 'SOMETHING AMAZING?',
    contactPhone1: '+258 84 531 7940',
    contactPhone2: '+258 82 343 8161',
    contactName: 'Name',
    contactEmail: 'Email',
    contactMessage: 'Message',
    contactSend: 'Send',
    contactSending: 'Sending...',
    contactSuccess: 'Message sent! I will get back to you soon.',
    contactError: 'Error sending. Please try again.',

    // Footer
    footerRights: 'All rights reserved.',
    footerTop: 'Top',
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('pt');

  const toggleLang = () => setLang((prev) => (prev === 'pt' ? 'en' : 'pt'));

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
