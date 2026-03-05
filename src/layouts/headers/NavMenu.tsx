import menu_data from "./menu_data";

export default function NavMenu() {
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
    <ul className="flex items-center gap-8 list-none m-0 p-0">
      {menu_data.map((item, i) => (
        <li key={i} className="relative group">
          <a 
            href={item.link}
            onClick={(e) => handleClick(e, item.link)}
            className="text-white/70 hover:text-primary font-mono text-sm tracking-widest uppercase py-2 no-underline transition-colors duration-300 block cursor-pointer"
          >
            {item.title}
          </a>
          
          <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />

          {item.has_dropdown && (
            <ul className="absolute top-full left-0 w-48 bg-background border border-white/10 p-4 rounded-xl opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 list-none shadow-2xl">
              {item.sub_menus?.map((sub_menu, index) => (
                <li key={index} className="mb-2 last:mb-0">
                  <a 
                    href={sub_menu.link}
                    onClick={(e) => handleClick(e, sub_menu.link)}
                    className="text-white/60 hover:text-primary text-xs uppercase tracking-wider block py-1 no-underline transition-colors"
                  >
                    {sub_menu.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
