# Portfolio Website

A modern, responsive portfolio website built with Astro, React, Material UI, and TypeScript.

## 🚀 Features

- **Modern Design**: Clean, professional design with Material UI components
- **Responsive**: Fully responsive design that works on all devices
- **Fast Performance**: Built with Astro for optimal loading speeds
- **Smooth Animations**: Subtle animations and transitions for better UX
- **Contact Form**: Functional contact form with validation
- **SEO Optimized**: Built-in SEO optimization with Astro

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) with React integration
- **UI Library**: [Material UI (MUI)](https://mui.com/)
- **Language**: TypeScript
- **Styling**: Material UI theme system with custom CSS
- **Icons**: Material UI Icons
- **Fonts**: Google Fonts (Roboto)

## 📁 Project Structure

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── AboutSection.tsx
│   │   ├── App.tsx
│   │   ├── ContactSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Navigation.tsx
│   │   ├── ProjectsSection.tsx
│   │   └── theme.ts
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:4321` to see your portfolio

## 🎨 Customization

### Personal Information

Update the following files with your personal information:

- **Hero Section**: Edit `src/components/HeroSection.tsx`

  - Name, title, bio
  - Skills and technologies
  - Social media links
  - Profile image

- **About Section**: Edit `src/components/AboutSection.tsx`

  - About me content
  - Professional experience
  - Technical skills

- **Projects Section**: Edit `src/components/ProjectsSection.tsx`

  - Add your projects
  - Update project descriptions, technologies, and links

- **Contact Section**: Edit `src/components/ContactSection.tsx`
  - Contact information
  - Social media profiles

### Styling

- **Theme**: Customize colors and typography in `src/components/theme.ts`
- **Global Styles**: Edit global styles in `src/layouts/Layout.astro`

### Assets

Add your files to the `public/` directory:

- Profile photo: `public/profile-photo`
- Resume: `public/resume.pdf`
- Project images: `public/project-*.jpg`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run astro` - Run Astro CLI commands

## 🚀 Deployment

This site can be deployed to any static hosting provider:

### Netlify

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel

1. Import your GitHub repository
2. Framework preset: Astro
3. Deploy

### GitHub Pages

1. Enable GitHub Pages in repository settings
2. Use GitHub Actions for automated deployment

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
│ └── index.astro
└── package.json

```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
```
