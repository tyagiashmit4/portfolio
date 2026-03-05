import { useState } from 'react';
import menu_data from './menu_data';
import { ChevronRight } from 'lucide-react';

export default function MobileMenu({ setOpen }: { setOpen: (open: boolean) => void }) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const toggleMenu = (title: string) => {
    setActiveMenu(activeMenu === title ? null : title);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    if (link.startsWith("#")) {
      e.preventDefault();
      setOpen(false);
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (link === "/") {
      setOpen(false);
    }
  };

  return (
    <nav className="flex flex-col gap-6">
      {menu_data.map((item, i) => (
        <div key={i} className="flex flex-col">
          <div className="flex items-center justify-between">
            <a 
              href={item.link} 
              onClick={(e) => handleClick(e, item.link)}
              className="text-2xl font-display font-bold text-white hover:text-primary transition-colors no-underline uppercase tracking-tighter cursor-pointer"
            >
              {item.title}
            </a>
            
            {item.has_dropdown && (
              <button 
                onClick={() => toggleMenu(item.title)}
                className={`p-2 text-white/50 transition-transform duration-300 ${activeMenu === item.title ? "rotate-90" : ""}`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {item.has_dropdown && activeMenu === item.title && (
            <div className="flex flex-col gap-4 mt-6 ml-4 border-l border-white/10 pl-6">
              {item.sub_menus?.map((sub, idx) => (
                <a 
                  key={idx} 
                  href={sub.link} 
                  onClick={(e) => handleClick(e, sub.link)}
                  className="text-lg text-white/50 hover:text-primary no-underline transition-colors uppercase font-mono tracking-widest text-sm cursor-pointer"
                >
                  {sub.title}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
