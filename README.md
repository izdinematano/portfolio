# Portfolio — Web Designer & Front-end Developer

Portfolio web completo, moderno e **bilíngue (PT / EN)** para um Web Designer & Front-end Developer, construído com React, Vite e Tailwind CSS.

Clique no botão **PT / EN** no menu para alternar o idioma.

## Como correr

```bash
npm install
npm run dev
```

Abre o browser em `http://localhost:5173`.

## Personalização

### 1. Dados pessoais

Edita os seguintes ficheiros:

- `src/App.jsx` — estrutura das secções
- `src/components/Navbar.jsx` — substitui `[NOME]` pelo teu nome
- `src/components/Contact.jsx` — atualiza o email e links sociais
- `src/components/Footer.jsx` — substitui `[NOME]` pelo teu nome

### 2. Projectos

Os 5 projectos web reais já estão configurados:
- **Consulting.co.mz** — Consultoria empresarial em Moçambique
- **Servicos.co.mz** — Directório nacional de empresas e serviços
- **Loja Print4You** — E-commerce de equipamentos de impressão
- **CV-Gen AI** — Editor de CV com Inteligência Artificial
- **MozTraders Tips** — Plataforma de dicas de apostas com IA

Para editar ou adicionar mais projectos, abre `src/data/projects.js`:

```js
{
  id: 1,
  numero: "01",
  titulo: "Nome do Projecto",
  categoria: "web", // ou "graphic"
  descricao: "Descrição do projecto...",
  tags: ["Figma", "React", "Illustrator"],
  gradient: "linear-gradient(135deg, #1a1a2e, #e94560)",
  featured: true,
  link: "#",
  ano: "2024"
}
```

### 3. Cores e tipografia

Edita `src/index.css` — as cores e fontes estão definidas na secção `@theme`.

### 4. Sobre / Skills

Edita `src/components/About.jsx` para mudar a bio, manifesto e skills.

## Stack

- React 19 + Vite
- Tailwind CSS v4
- Framer Motion (animações)
- React Intersection Observer (scroll triggers)
- @tabler/icons-react (ícones)
