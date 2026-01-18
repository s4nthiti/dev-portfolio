"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "th";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    
    // Hero
    "hero.title1": "OrangeLeafy",
    "hero.title2": "Digital Solutions",
    "hero.subtitle": "Your modern digital solutions partner.",
    "hero.subtitle2": "We offer comprehensive digital solutions",
    "hero.subtitle3": "from design to development, with expert guidance.",
    "hero.viewWork": "View My Work",
    "hero.getInTouch": "Contact Me",
    
    // ClickUp
    "clickup.title": "Project",
    "clickup.clickup": "Management",
    
    // About
    "about.title": "About",
    "about.me": "Me",
    "about.developer.title": "Full-Stack Developer",
    "about.developer.description": "I specialize in building scalable web applications using modern technologies. With a passion for clean code and user experience, I create solutions that are both functional and beautiful.",
    "about.learning.title": "Always Learning",
    "about.learning.description": "Technology evolves rapidly, and so do I. I stay current with the latest frameworks, tools, and best practices to deliver cutting-edge solutions that stand the test of time.",
    
    // Skills
    "skills.title": "My",
    "skills.skills": "Skills",
    "skills.my": "My",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.tools": "Tools",
    
    // Projects
    "projects.title": "Featured",
    "projects.projects": "Projects",
    "projects.ecommerce.title": "E-Commerce Platform",
    "projects.ecommerce.description": "A full-stack e-commerce solution with real-time inventory management, secure payment processing, and admin dashboard. Built with modern technologies for scalability and performance.",
    "projects.task.title": "Task Management App",
    "projects.task.description": "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Optimized for both desktop and mobile experiences.",
    "projects.ai.title": "AI-Powered Analytics Dashboard",
    "projects.ai.description": "An intelligent analytics platform that provides real-time insights with AI-powered recommendations. Features interactive charts, custom reports, and predictive analytics.",
    
    // Contact
    "contact.title": "Contact",
    "contact.description": "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
    "contact.getInTouch": "Contact Me",
    "contact.email": "Email",
    "contact.line": "Line",
    "contact.facebook": "Facebook",
    "contact.phone": "Phone",
    "contact.github": "GitHub",
    
    // Footer
    "footer.author": "Santhiti Traiyasakda",
    "footer.rights": "All rights reserved.",
    "footer.built": "Built with",
  },
  th: {
    // Navigation
    "nav.about": "เกี่ยวกับ",
    "nav.skills": "ทักษะ",
    "nav.projects": "โปรเจ็กต์",
    "nav.contact": "ติดต่อ",
    
    // Hero
    "hero.title1": "OrangeLeafy",
    "hero.title2": "Studio",
    "hero.subtitle": "เว็ปไซต์คุณภาพคิดถึงเรา",
    "hero.subtitle2": "บริการสร้างเว็ปไซต์ครบวงจร",
    "hero.subtitle3": "ตั้งแต่การออกแบบจนถึงพัฒนา พร้อมให้คำปรึกษา",
    "hero.viewWork": "ดูผลงาน",
    "hero.getInTouch": "ติดต่อ",

    // ClickUp
    "clickup.title": "Project",
    "clickup.clickup": "Management",
    
    // About
    "about.title": "เกี่ยวกับ",
    "about.me": "ฉัน",
    "about.developer.title": "นักพัฒนา Full-Stack",
    "about.developer.description": "ฉันเชี่ยวชาญในการสร้างแอปพลิเคชันเว็บที่ขยายตัวได้โดยใช้เทคโนโลยีสมัยใหม่ ด้วยความหลงใหลในโค้ดที่สะอาดและประสบการณ์ผู้ใช้ ฉันสร้างโซลูชันที่ทั้งใช้งานได้จริงและสวยงาม",
    "about.learning.title": "เรียนรู้อยู่เสมอ",
    "about.learning.description": "เทคโนโลยีพัฒนาไปอย่างรวดเร็ว และฉันก็เช่นกัน ฉันติดตามเฟรมเวิร์ก เครื่องมือ และแนวทางปฏิบัติที่ดีล่าสุดเพื่อส่งมอบโซลูชันที่ล้ำสมัยและทนทานต่อกาลเวลา",
    
    // Skills
    "skills.title": "ทักษะ",
    "skills.skills": "ของฉัน",
    "skills.my": "ของฉัน",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.tools": "เครื่องมือ",
    
    // Projects
    "projects.title": "โปรเจ็กต์",
    "projects.projects": "เด่น",
    "projects.ecommerce.title": "แพลตฟอร์ม E-Commerce",
    "projects.ecommerce.description": "โซลูชัน E-Commerce แบบ Full-stack พร้อมการจัดการสต็อกแบบเรียลไทม์ การประมวลผลการชำระเงินที่ปลอดภัย และแดชบอร์ดผู้ดูแล สร้างด้วยเทคโนโลยีสมัยใหม่เพื่อความสามารถในการขยายตัวและประสิทธิภาพ",
    "projects.task.title": "แอปจัดการงาน",
    "projects.task.description": "แอปพลิเคชันจัดการงานแบบร่วมมือพร้อมการอัปเดตแบบเรียลไทม์ ฟังก์ชันลากและวาง และคุณสมบัติการทำงานร่วมกันของทีม ปรับให้เหมาะกับทั้งเดสก์ท็อปและมือถือ",
    "projects.ai.title": "แดชบอร์ดวิเคราะห์ด้วย AI",
    "projects.ai.description": "แพลตฟอร์มวิเคราะห์อัจฉริยะที่ให้ข้อมูลเชิงลึกแบบเรียลไทม์พร้อมคำแนะนำที่ขับเคลื่อนด้วย AI มีแผนภูมิแบบโต้ตอบ รายงานที่กำหนดเอง และการวิเคราะห์เชิงทำนาย",
    
    // Contact
    "contact.title": "ช่องทางการติดต่อ",
    "contact.description": "ฉันพร้อมเสมอที่จะหารือเกี่ยวกับโปรเจ็กต์ใหม่ ไอเดียสร้างสรรค์ หรือโอกาสในการเป็นส่วนหนึ่งของวิสัยทัศน์ของคุณ",
    "contact.getInTouch": "ติดต่อ",
    "contact.email": "อีเมล",
    "contact.line": "ไลน์",
    "contact.facebook": "เฟสบุ๊ค",
    "contact.phone": "โทรศัพท์",
    "contact.github": "GitHub",
    
    // Footer
    "footer.author": "สัณฐิติ ไตรยศักดา",
    "footer.rights": "สงวนลิขสิทธิ์",
    "footer.built": "สร้างด้วย",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language | null;
      if (savedLanguage) {
        setLanguageState(savedLanguage);
        document.documentElement.lang = savedLanguage;
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
      document.documentElement.lang = lang;
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
