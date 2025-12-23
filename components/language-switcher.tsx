"use client";

import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { useTheme } from "@/contexts/theme-context";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en" as const, label: "English", flag: "🇺🇸" },
    { code: "th" as const, label: "ไทย", flag: "🇹🇭" },
  ];

  const currentLang = languages.find((lang) => lang.code === language);

  return (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="gap-2 bg-transparent hover:bg-white/10"
          aria-label="Change language"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline">{currentLang?.label}</span>
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`absolute right-0 top-full mt-2 z-50 min-w-[120px] rounded-md border shadow-lg ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-200"
              }`}
            >
              <div className="p-1">
                {languages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    whileHover={{ x: 4 }}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
                      language === lang.code
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-accent text-foreground"
                    }`}
                  >
                    <span>{lang.label}</span>
                    {language === lang.code && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto"
                      >
                        ✓
                      </motion.span>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}


