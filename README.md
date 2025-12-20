# OrangeLeafy Studio

A modern, responsive portfolio website for OrangeLeafy Studio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Features smooth animations, glass morphism effects, and a beautiful gradient design.

## 🚀 Features

- **Modern Design**: Clean, professional layout with gradient accents and glass morphism effects
- **Smooth Animations**: Powered by Framer Motion for fluid transitions and interactions
- **Fully Responsive**: Optimized for all device sizes
- **Type-Safe**: Built with TypeScript for better developer experience
- **Component Library**: Uses shadcn/ui for consistent, accessible components
- **Performance Optimized**: Built on Next.js 16 with App Router

## 📦 Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Run the development server:

```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Customization

### Update Your Information

Edit `app/page.tsx` to customize:

- **Hero Section**: Update the main heading, description, and social links
- **About Section**: Modify the about cards with your information
- **Skills**: Update the skills array with your technologies
- **Projects**: Replace the projects array with your actual projects
- **Contact**: Update email and social media links

### Styling

- **Colors**: Modify CSS variables in `app/globals.css`
- **Components**: Customize shadcn/ui components in `components/ui/`
- **Animations**: Adjust Framer Motion animations in `app/page.tsx`

### Example Customization

```tsx
// Update projects in app/page.tsx
const projects: Project[] = [
  {
    title: "Your Project Name",
    description: "Your project description",
    tags: ["React", "TypeScript"],
    link: "https://your-project.com",
    github: "https://github.com/yourusername/project",
  },
];
```

## 🏗️ Project Structure

```
dev-portfolio/
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Main OrangeLeafy Studio page
│   └── globals.css     # Global styles and animations
├── components/
│   └── ui/             # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       └── badge.tsx
├── lib/
│   └── utils.ts        # Utility functions
└── components.json      # shadcn/ui configuration
```

## 🚢 Building for Production

Create an optimized production build:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
