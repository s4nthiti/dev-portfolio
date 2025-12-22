"use client";

import { Moon, Sun, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme-context";
import { useLanguage } from "@/contexts/language-context";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { 
      code: "light" as const, 
      label: "Light", 
      icon: Sun,
      color: "text-yellow-500"
    },
    { 
      code: "dark" as const, 
      label: "Dark", 
      icon: Moon,
      color: "text-slate-400"
    },
    { 
      code: "nature" as const, 
      label: "Nature", 
      icon: Palette,
      color: "text-orange-500"
    },
  ];

  const currentTheme = themes.find((t) => t.code === theme);
  const Icon = currentTheme?.icon || Palette;

  return (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="relative"
          aria-label="Change theme"
        >
          <Icon className="h-5 w-5" />
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
              className={`absolute right-0 top-full mt-2 z-50 min-w-[140px] rounded-md border shadow-lg ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700"
                  : theme === "nature"
                  ? "bg-orange-50/90 border-orange-200"
                  : "bg-white border-slate-200"
              }`}
            >
              <div className="p-1">
                {themes.map((themeOption) => {
                  const ThemeIcon = themeOption.icon;
                  return (
                    <motion.button
                      key={themeOption.code}
                      whileHover={{ x: 4 }}
                      onClick={() => {
                        setTheme(themeOption.code);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
                        theme === themeOption.code
                          ? theme === "dark"
                            ? "bg-slate-700 text-white"
                            : theme === "nature"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-slate-100 text-slate-700"
                          : theme === "dark"
                          ? "hover:bg-slate-700 text-slate-200"
                          : theme === "nature"
                          ? "hover:bg-orange-100 text-orange-900"
                          : "hover:bg-slate-100 text-slate-900"
                      }`}
                    >
                      <ThemeIcon className={`w-4 h-4 ${themeOption.color}`} />
                      <span>{themeOption.label}</span>
                      {theme === themeOption.code && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto"
                        >
                          ✓
                        </motion.span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

