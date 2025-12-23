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
  X,
  Sparkles,
  Star
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
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', handleChange);
    };
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
          className="mx-auto flex max-w-7xl items-center justify-center px-4 sm:px-6 py-4 sm:py-5 relative"
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
                  ? "bg-slate-900/98 border-slate-700"
                  : theme === "nature"
                  ? "bg-orange-50/98 border-orange-200"
                  : "bg-white/98 border-slate-200"
              } ${
                isMobile ? '' : 'backdrop-blur-sm'
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
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden pt-16 sm:pt-0">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={prefersReducedMotion || isMobile ? {} : {
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={prefersReducedMotion || isMobile ? {} : {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className={`absolute top-10 left-4 sm:top-20 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 rounded-full ${
                isMobile ? 'blur-xl' : 'blur-3xl'
              } ${
                theme === "dark" 
                  ? "bg-cyan-500/20" 
                  : theme === "nature"
                  ? "bg-orange-400/20"
                  : "bg-cyan-500/10"
              }`}
              style={{ 
                willChange: prefersReducedMotion || isMobile ? 'auto' : 'transform',
                transform: 'translateZ(0)',
                WebkitTransform: 'translateZ(0)'
              }}
            />
            <motion.div
              animate={prefersReducedMotion || isMobile ? {} : {
                scale: [1.2, 1, 1.2],
                rotate: [90, 0, 90],
              }}
              transition={prefersReducedMotion || isMobile ? {} : {
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
              className={`absolute bottom-10 right-4 sm:bottom-20 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 rounded-full ${
                isMobile ? 'blur-xl' : 'blur-3xl'
              } ${
                theme === "dark" 
                  ? "bg-purple-500/20" 
                  : theme === "nature"
                  ? "bg-green-400/20"
                  : "bg-purple-500/10"
              }`}
              style={{ 
                willChange: prefersReducedMotion || isMobile ? 'auto' : 'transform',
                transform: 'translateZ(0)',
                WebkitTransform: 'translateZ(0)'
              }}
            />
          </div>

          <motion.div
            variants={prefersReducedMotion ? {} : containerVariants}
            initial={prefersReducedMotion ? undefined : "hidden"}
            animate={prefersReducedMotion ? undefined : "visible"}
            className="relative z-10 max-w-6xl mx-auto text-center w-full mb-20 sm:mb-40"
          >
            <motion.div 
              variants={prefersReducedMotion ? {} : itemVariants} 
              className="mb-6 sm:mb-8"
            >
              <motion.div
                whileHover={isMobile || prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                className="inline-block"
              >
                <Image
                  src="/assets/orange_no_bg.webp"
                  alt="Orange Leaf Studio"
                  width={256}
                  height={256}
                  className="mx-auto w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 drop-shadow-2xl"
                  priority
                />
              </motion.div>
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 md:mb-10 leading-tight px-2"
              style={{ fontFamily: 'var(--font-pacifico), cursive' }}
            >
              <span className="gradient-text">{t("hero.title1")}</span>{" "}
              <span className={theme === "dark" ? "text-white" : theme === "nature" ? "text-orange-950" : "text-slate-900"}>{t("hero.title2")}</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className={`text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 max-w-2xl mx-auto px-4 font-medium ${
                theme === "dark" 
                  ? "text-slate-200" 
                  : theme === "nature"
                  ? "text-orange-800"
                  : "text-slate-700"
              }`}
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className={`text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4 max-w-2xl mx-auto px-4 leading-relaxed ${
                theme === "dark" 
                  ? "text-slate-300" 
                  : theme === "nature"
                  ? "text-orange-700"
                  : "text-slate-600"
              }`}
            >
              {t("hero.subtitle2")}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className={`text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-4 leading-relaxed ${
                theme === "dark" 
                  ? "text-slate-300" 
                  : theme === "nature"
                  ? "text-orange-700"
                  : "text-slate-600"
              }`}
            >
              {t("hero.subtitle3")}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center px-4"
            >
              <motion.div 
                whileHover={isMobile ? {} : { scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <a 
                  href="#contact"
                  className={`inline-flex items-center justify-center rounded-lg px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-medium transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white border border-white/20 hover:from-purple-500 hover:to-purple-400 shadow-lg shadow-purple-500/20"
                      : theme === "nature"
                      ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white border border-orange-300/30 hover:from-orange-400 hover:to-orange-300 shadow-lg shadow-orange-500/20"
                      : "bg-gradient-to-r from-purple-600 to-purple-500 text-white border border-purple-300/30 hover:from-purple-500 hover:to-purple-400 shadow-lg shadow-purple-500/20"
                  }`}
                >
                  {t("hero.getInTouch")}
                </a>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          {!prefersReducedMotion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              className="absolute bottom-12 sm:bottom-20 left-1/2 transform -translate-x-1/2 z-10"
            >
              <motion.div
                animate={isMobile ? {} : { y: [0, 10, 0] }}
                transition={isMobile ? {} : { duration: 1.5, repeat: Infinity }}
                className={`w-6 h-10 border-2 rounded-full flex justify-center ${
                  theme === "dark"
                    ? "border-slate-400"
                    : theme === "nature"
                    ? "border-orange-400"
                    : "border-slate-500"
                }`}
              >
                <motion.div
                  animate={isMobile ? {} : { y: [0, 12, 0] }}
                  transition={isMobile ? {} : { duration: 1.5, repeat: Infinity }}
                  className={`w-1 h-3 rounded-full mt-2 ${
                    theme === "dark"
                      ? "bg-slate-400"
                      : theme === "nature"
                      ? "bg-orange-400"
                      : "bg-slate-500"
                  }`}
                />
              </motion.div>
            </motion.div>
          )}
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-16 sm:py-24 px-4 sm:px-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8 sm:mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
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
          className="py-16 sm:py-24 px-4 sm:px-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8 sm:mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
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
                      <div className="flex items-start justify-between gap-3 sm:gap-4">
                        <CardTitle className="text-xl sm:text-2xl group-hover:text-cyan-400 transition-colors flex-1">
                          {t(project.titleKey)}
                        </CardTitle>
                        <div className="flex gap-2 flex-shrink-0">
                          {project.github && (
                            <motion.a
                              href={project.github}
                              whileHover={isMobile ? {} : { scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                              className={`${
                                theme === "dark"
                                  ? "text-slate-400 hover:text-white"
                                  : theme === "nature"
                                  ? "text-orange-600 hover:text-orange-800"
                                  : "text-slate-500 hover:text-slate-700"
                              }`}
                            >
                              <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                            </motion.a>
                          )}
                          {project.link && (
                            <motion.a
                              href={project.link}
                              whileHover={isMobile ? {} : { scale: 1.1, rotate: -5 }}
                              whileTap={{ scale: 0.9 }}
                              className={`${
                                theme === "dark"
                                  ? "text-slate-400 hover:text-cyan-400"
                                  : theme === "nature"
                                  ? "text-orange-600 hover:text-orange-800"
                                  : "text-slate-500 hover:text-cyan-500"
                              }`}
                            >
                              <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6" />
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className={`text-sm sm:text-base mb-4 leading-relaxed ${
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

        {/* ClickUp Section */}
        <section
          id="clickup"
          className="py-16 sm:py-24 px-4 sm:px-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8 sm:mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
                {t("clickup.title")} <span className="gradient-text">{t("clickup.clickup")}</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-green-400 rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full"
            >
              <div className="w-full rounded-2xl overflow-hidden border-2 border-slate-300 dark:border-slate-700">
                <iframe 
                  className="clickup-embed w-full" 
                  src="https://sharing.clickup.com/90182225944/b/h/6-901814455252-2/2b7765218debe75" 
                  width="100%" 
                  height="600px"
                  style={{ background: 'transparent', border: 'none' }} 
                  onWheel={() => {}}
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-16 sm:py-24 px-4 sm:px-6"
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
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
                {t("contact.title")}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-green-400 rounded-full mx-auto mb-6 sm:mb-8" />
              <p className={`text-base sm:text-lg md:text-xl mb-6 sm:mb-8 px-4 ${
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
                whileHover={isMobile ? {} : { scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="glass p-4 sm:p-6 rounded-lg flex items-center gap-3 sm:gap-4 group transition-all"
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
                whileHover={isMobile ? {} : { scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="glass p-4 sm:p-6 rounded-lg flex items-center gap-3 sm:gap-4 group transition-all"
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
                whileHover={isMobile ? {} : { scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="glass p-4 sm:p-6 rounded-lg flex items-center gap-3 sm:gap-4 group transition-all"
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
        className="py-6 sm:py-8 px-4 sm:px-6"
      >
        <div className={`max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm ${
          theme === "dark" 
            ? "text-slate-500" 
            : theme === "nature"
            ? "text-orange-600"
            : "text-slate-400"
        }`}>
          <p>© {new Date().getFullYear()} {t("footer.author")}. {t("footer.rights")}</p>
          <p>
            {t("footer.built")} <span className="text-cyan-400">Next.js</span>
          </p>
        </div>
      </motion.footer>
    </div>
  );
}

export default dynamic(() => Promise.resolve(HomeContent), {
  ssr: false,
});
