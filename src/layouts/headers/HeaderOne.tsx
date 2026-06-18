import { useState } from "react";
import UseSticky from "../../hooks/UseSticky";
import { Link } from "react-router-dom";
import NavMenu from "./NavMenu";
import Sidebar from "../../components/common/Sidebar";

export default function HeaderOne() {
  const { sticky } = UseSticky();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header 
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl z-[100] transition-all duration-500 rounded-2xl ${
          sticky 
            ? "bg-white/45 backdrop-blur-xl py-3 border border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.04)] px-6 md:px-8" 
            : "bg-transparent py-5 border border-transparent px-4"
        }`}
      >
        <div className="w-full">
          <div className="flex items-center justify-between lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="block group">
                <span className="font-display font-bold text-lg md:text-xl text-slate-900 tracking-tight group-hover:text-primary transition-colors duration-300">
                  Ashmit<span className="text-primary">.</span>Tyagi
                </span>
              </Link>
            </div>

            <div className="hidden lg:flex justify-center">
              <nav>
                <NavMenu />
              </nav>
            </div>

            <div className="flex items-center gap-4 justify-end">
              {/* Contact Quick Button on desktop, mobile menu drawer toggle on mobile */}
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hidden lg:inline-flex px-4 py-2 border border-slate-200 hover:border-indigo-500 text-slate-700 hover:text-indigo-600 font-mono text-xs uppercase tracking-wider rounded-full hover:bg-indigo-50/20 transition-all duration-300 cursor-pointer"
              >
                Let's Talk
              </a>

              <button 
                onClick={() => setOpen(true)}
                className="lg:hidden text-slate-800 hover:text-indigo-600 transition-colors p-2 cursor-pointer flex flex-col gap-1.5 items-end justify-center"
              >
                <div className="w-6 h-[2px] bg-current" />
                <div className="w-4 h-[2px] bg-current" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <Sidebar open={open} setOpen={setOpen} />
    </>
  );
}
