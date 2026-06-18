import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import menu_data from "./menu_data";

export default function NavMenu() {
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const sections = menu_data.map(item => document.querySelector(item.link));
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      // Higher rootMargin settings for precision tracking
      { threshold: 0.2, rootMargin: "-25% 0px -45% 0px" }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    if (link.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <ul className="flex items-center gap-1 list-none m-0 p-1 bg-black/[0.02] border border-black/[0.04] rounded-full backdrop-blur-sm">
      {menu_data.map((item, i) => {
        const isActive = activeSection === item.link;
        return (
          <li key={i} className="relative">
            <a 
              href={item.link}
              onClick={(e) => handleClick(e, item.link)}
              className={`relative z-10 px-4 py-2 font-mono text-[10px] md:text-xs tracking-wider uppercase no-underline transition-colors duration-300 block cursor-pointer ${
                isActive ? "text-indigo-600 font-semibold" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {item.title}
            </a>
            
            {isActive && (
              <motion.div
                layoutId="activeHeaderPill"
                className="absolute inset-0 bg-white/90 shadow-sm border border-black/[0.05] rounded-full z-0"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
