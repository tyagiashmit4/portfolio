import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import menu_data from "../../layouts/headers/menu_data";

export default function NavTrack() {
  const [activeSection, setActiveSection] = useState("#home");

  // Track global scroll height to fill in the vertical track
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

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
      // Trigger section swap near the top/middle of the viewport
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

  const handleClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    const element = document.querySelector(link);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center select-none">
      {/* Background track line */}
      <div className="absolute top-2 bottom-2 w-[2px] bg-black/5 rounded-full z-0">
        <motion.div 
          style={{ scaleY, transformOrigin: "top" }}
          className="w-full h-full bg-gradient-to-b from-primary to-accent rounded-full"
        />
      </div>

      <div className="relative flex flex-col gap-6 z-10 py-2">
        {menu_data.map((item) => {
          const isActive = activeSection === item.link;
          return (
            <a
              key={item.id}
              href={item.link}
              onClick={(e) => handleClick(e, item.link)}
              className="relative flex items-center justify-center group py-1"
              data-cursor="link"
            >
              {/* Tooltip on hover */}
              <span className="absolute right-8 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity bg-white/95 border border-black/5 px-3 py-1.5 rounded-lg text-[9px] font-mono text-primary uppercase tracking-widest whitespace-nowrap shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                {item.title}
              </span>

              {/* Glowing anchor dot */}
              <motion.div
                animate={{
                  scale: isActive ? 1.3 : 1,
                  backgroundColor: isActive ? "var(--theme-primary, #059669)" : "rgba(0,0,0,0.15)",
                  borderColor: isActive ? "var(--theme-primary, #059669)" : "transparent",
                  boxShadow: isActive ? "0 0 10px var(--theme-primary, #059669)" : "none"
                }}
                className="w-2.5 h-2.5 rounded-full border transition-all duration-300"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}
