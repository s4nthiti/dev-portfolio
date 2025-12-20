"use client";

import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/contexts/language-context";
import { useTheme } from "@/contexts/theme-context";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Code, 
  Rocket,
  ArrowRight,
  ExternalLink,
  Phone,
  Menu,
  X
} from "lucide-react";
import { LineIcon } from "@/components/icons/line-icon";
import { useEffect, useState, useRef } from "react";

type Project = {
  titleKey: string;
  descriptionKey: string;
  tags: string[];
  link?: string;
  github?: string;
};

const projectKeys = [
  { titleKey: "projects.ecommerce.title", descriptionKey: "projects.ecommerce.description" },
  { titleKey: "projects.task.title", descriptionKey: "projects.task.description" },
  { titleKey: "projects.ai.title", descriptionKey: "projects.ai.description" },
];

const projectTags = [
  ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
  ["React", "Node.js", "WebSocket", "MongoDB"],
  ["Next.js", "Python", "TensorFlow", "D3.js"],
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

function HomeContent() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  const navItems = [
    { key: "nav.about", href: "#about" },
    { key: "nav.projects", href: "#projects" },
    { key: "nav.contact", href: "#contact" },
  ];

  const projects: Project[] = projectKeys.map((project, index) => ({
    titleKey: project.titleKey,
    descriptionKey: project.descriptionKey,
    tags: projectTags[index],
    link: "#",
    github: "#",
  }));

  const getBackgroundClasses = () => {
    switch (theme) {
      case "dark":
        return "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100";
      case "nature":
        return "bg-gradient-to-b from-orange-50 via-green-50/50 to-orange-50 text-orange-950";
      default: // light
        return "bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900";
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 overflow-x-hidden ${getBackgroundClasses()}`}>
      {/* Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ 
          backgroundColor: 'transparent',
          background: 'transparent'
        }}
        className="relative z-50"
      >
        <nav 
          style={{ 
            backgroundColor: 'transparent',
            background: 'transparent'
          }}
          className="mx-auto flex max-w-7xl items-center justify-center px-4 sm:px-6 py-5 sm:py-4 relative"
        >
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ 
              transform: 'translateZ(0)',
              WebkitTransform: 'translateZ(0)',
              WebkitTapHighlightColor: 'transparent'
            }}
            className="md:hidden absolute left-4 p-3 sm:p-2 rounded-md transition-colors active:scale-95"
            aria-label="Toggle menu"
          >
            <Menu className={`h-7 w-7 sm:h-6 sm:w-6 transition-opacity ${
              theme === "dark"
                ? "text-slate-300"
                : theme === "nature"
                ? "text-orange-800"
                : "text-slate-700"
            }`} />
          </button>

          {/* Centered Navigation Items - Desktop */}
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {navItems.map((item, index) => (
              <motion.a
                key={item.key}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2, scale: 1.05 }}
                className="relative transition-all duration-300 cursor-pointer group"
              >
                <span className={`relative z-10 transition-colors duration-300 ${
                  theme === "dark"
                    ? "text-slate-300 group-hover:text-orange-400"
                    : theme === "nature"
                    ? "text-orange-800 group-hover:text-orange-500"
                    : "text-slate-700 group-hover:text-orange-500"
                }`}>
                  {t(item.key)}
                </span>
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-green-400 group-hover:w-full transition-all duration-300"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                />
              </motion.a>
            ))}
          </div>
          
          {/* Right-aligned Switchers */}
          <div className="absolute right-3 sm:right-6 flex items-center gap-3 sm:gap-4">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </nav>
      </motion.header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: [0.4, 0, 1, 1] }}
              style={{ 
                willChange: 'opacity',
                transform: 'translateZ(0)',
                WebkitTransform: 'translateZ(0)'
              }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            
            {/* Sidebar */}
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.2, ease: [0.32, 0, 0.67, 0] }}
              style={{ 
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
                WebkitTransform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                isolation: 'isolate',
                contain: 'layout style paint'
              }}
              className={`fixed top-0 left-0 h-full w-64 z-50 border-r md:hidden ${
                theme === "dark"
                  ? "bg-slate-900/98 border-slate-700 backdrop-blur-sm"
                  : theme === "nature"
                  ? "bg-orange-50/98 border-orange-200 backdrop-blur-sm"
                  : "bg-white/98 border-slate-200 backdrop-blur-sm"
              }`}
            >
              <div className="flex flex-col h-full">
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className={`text-lg font-semibold ${
                    theme === "dark"
                      ? "text-slate-200"
                      : theme === "nature"
                      ? "text-orange-900"
                      : "text-slate-800"
                  }`}>
                    Menu
                  </h2>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 rounded-md transition-colors"
                    aria-label="Close menu"
                  >
                    <X className={`h-6 w-6 ${
                      theme === "dark"
                        ? "text-slate-300"
                        : theme === "nature"
                        ? "text-orange-800"
                        : "text-slate-700"
                    }`} />
                  </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 p-4 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.key}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.15, ease: "easeOut" }}
                      onClick={() => setSidebarOpen(false)}
                      style={{ 
                        willChange: 'transform, opacity',
                        transform: 'translateZ(0)',
                        WebkitTransform: 'translateZ(0)'
                      }}
                      className={`block px-4 py-3 rounded-lg transition-colors duration-150 ${
                        theme === "dark"
                          ? "text-slate-300 hover:bg-slate-800 hover:text-orange-400"
                          : theme === "nature"
                          ? "text-orange-800 hover:bg-orange-100 hover:text-orange-600"
                          : "text-slate-700 hover:bg-slate-100 hover:text-orange-500"
                      }`}
                    >
                      {t(item.key)}
                    </motion.a>
                  ))}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden pt-0">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className={`absolute top-10 left-4 sm:top-20 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 rounded-full blur-3xl ${
                theme === "dark" 
                  ? "bg-cyan-500/20" 
                  : theme === "nature"
                  ? "bg-orange-400/20"
                  : "bg-cyan-500/10"
              }`}
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [90, 0, 90],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
              className={`absolute bottom-10 right-4 sm:bottom-20 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl ${
                theme === "dark" 
                  ? "bg-purple-500/20" 
                  : theme === "nature"
                  ? "bg-green-400/20"
                  : "bg-purple-500/10"
              }`}
            />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-5xl mx-auto text-center w-full mb-40"
          >
            <motion.div variants={itemVariants} className="mb-2">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-block"
              >
                <Image
                  src="/assets/orange_no_bg.webp"
                  alt="Orange Leaf Studio"
                  width={256}
                  height={256}
                  className="mx-auto w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72"
                  priority
                />
              </motion.div>
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-10 leading-tight"
              style={{ fontFamily: 'var(--font-pacifico), cursive' }}
            >
              <span className="gradient-text">{t("hero.title1")}</span>{" "}
              <span>{t("hero.title2")}</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto ${
                theme === "dark" 
                  ? "text-slate-300" 
                  : theme === "nature"
                  ? "text-orange-800"
                  : "text-slate-600"
              }`}
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild variant="outline" size="lg">
                  <a href="#contact">{t("hero.getInTouch")}</a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, repeat: Infinity, repeatType: "reverse" }}
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 bg-slate-400 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-24 px-4 sm:px-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {t("about.title")} <span className="gradient-text">{t("about.me")}</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-green-400 rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-8"
            >
              <Card className="glass h-full">
                <CardHeader>
                  <Code className="w-10 h-10 text-cyan-400 mb-4" />
                  <CardTitle>{t("about.developer.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className={`text-base leading-relaxed ${
                    theme === "dark" 
                      ? "text-slate-300" 
                      : theme === "nature"
                      ? "text-orange-800"
                      : "text-slate-600"
                  }`}>
                    {t("about.developer.description")}
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="glass h-full">
                <CardHeader>
                  <Rocket className="w-10 h-10 text-purple-400 mb-4" />
                  <CardTitle>{t("about.learning.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className={`text-base leading-relaxed ${
                    theme === "dark" 
                      ? "text-slate-300" 
                      : theme === "nature"
                      ? "text-orange-800"
                      : "text-slate-600"
                  }`}>
                    {t("about.learning.description")}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="py-24 px-4 sm:px-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {t("projects.title")} <span className="gradient-text">{t("projects.projects")}</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-green-400 rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.titleKey}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="glass group hover:border-cyan-500/50 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-2xl group-hover:text-cyan-400 transition-colors">
                          {t(project.titleKey)}
                        </CardTitle>
                        <div className="flex gap-2">
                          {project.github && (
                            <motion.a
                              href={project.github}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-slate-400 hover:text-white"
                            >
                              <Github className="w-5 h-5" />
                            </motion.a>
                          )}
                          {project.link && (
                            <motion.a
                              href={project.link}
                              whileHover={{ scale: 1.1, rotate: -5 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-slate-400 hover:text-cyan-400"
                            >
                              <ExternalLink className="w-5 h-5" />
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className={`text-base mb-4 ${
                        theme === "dark" 
                          ? "text-slate-300" 
                          : theme === "nature"
                          ? "text-orange-800"
                          : "text-slate-600"
                      }`}>
                        {t(project.descriptionKey)}
                      </CardDescription>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-24 px-4 sm:px-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {t("contact.title")}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-green-400 rounded-full mx-auto mb-8" />
              <p className={`text-xl mb-8 ${
                theme === "dark" 
                  ? "text-slate-300" 
                  : theme === "nature"
                  ? "text-orange-800"
                  : "text-slate-600"
              }`}>
                {t("contact.description")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <motion.a
                href="mailto:s4nthiti@gmail.com"
                whileHover={{ scale: 1.02, y: -2 }}
                className="glass p-6 rounded-lg flex items-center gap-4 group transition-all"
              >
                <div className="p-3 rounded-full bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-colors">
                  <Mail className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="flex-1 text-left">
                  <p className={`text-sm mb-1 ${
                    theme === "dark" 
                      ? "text-slate-400" 
                      : theme === "nature"
                      ? "text-orange-600"
                      : "text-slate-500"
                  }`}>
                    {t("contact.email")}
                  </p>
                  <p className={`font-medium ${
                    theme === "dark" 
                      ? "text-slate-200" 
                      : theme === "nature"
                      ? "text-orange-900"
                      : "text-slate-800"
                  }`}>
                    s4nthiti@gmail.com
                  </p>
                </div>
              </motion.a>

              <motion.a
                href="https://line.me/ti/p/~s4nthiti"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                className="glass p-6 rounded-lg flex items-center gap-4 group transition-all"
              >
                <div className="p-3 rounded-full bg-green-500/20 group-hover:bg-green-500/30 transition-colors">
                  <LineIcon className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex-1 text-left">
                  <p className={`text-sm mb-1 ${
                    theme === "dark" 
                      ? "text-slate-400" 
                      : theme === "nature"
                      ? "text-orange-600"
                      : "text-slate-500"
                  }`}>
                    {t("contact.line")}
                  </p>
                  <p className={`font-medium ${
                    theme === "dark" 
                      ? "text-slate-200" 
                      : theme === "nature"
                      ? "text-orange-900"
                      : "text-slate-800"
                  }`}>
                    s4nthiti
                  </p>
                </div>
              </motion.a>

              <motion.a
                href="tel:+66916151618"
                whileHover={{ scale: 1.02, y: -2 }}
                className="glass p-6 rounded-lg flex items-center gap-4 group transition-all"
              >
                <div className="p-3 rounded-full bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                  <Phone className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1 text-left">
                  <p className={`text-sm mb-1 ${
                    theme === "dark" 
                      ? "text-slate-400" 
                      : theme === "nature"
                      ? "text-orange-600"
                      : "text-slate-500"
                  }`}>
                    {t("contact.phone")}
                  </p>
                  <p className={`font-medium ${
                    theme === "dark" 
                      ? "text-slate-200" 
                      : theme === "nature"
                      ? "text-orange-900"
                      : "text-slate-800"
                  }`}>
                    (+66) 0916151618
                  </p>
                </div>
              </motion.a>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-8 px-4 sm:px-6"
      >
        <div className={`max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm ${
          theme === "dark" 
            ? "text-slate-500" 
            : theme === "nature"
            ? "text-orange-600"
            : "text-slate-400"
        }`}>
          <p>© {new Date().getFullYear()} {t("footer.author")}. {t("footer.rights")}</p>
          <p>
            {t("footer.built")} <span className="text-cyan-400">Next.js</span> {t("footer.and")}{" "}
          </p>
        </div>
      </motion.footer>
    </div>
  );
}

export default dynamic(() => Promise.resolve(HomeContent), {
  ssr: false,
});
