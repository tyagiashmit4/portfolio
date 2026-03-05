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
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          sticky ? "bg-background/80 backdrop-blur-lg py-4 border-b border-white/10" : "py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-0">
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0">
              <Link to="/" className="block">
                <img 
                  src="/assets/images/portfolio.png" 
                  alt="Logo" 
                  className="w-24 md:w-32 h-auto hover:scale-105 transition-transform duration-300 invert" 
                />
              </Link>
            </div>

            <div className="hidden lg:block">
              <nav>
                <NavMenu />
              </nav>
            </div>

            <div className="flex items-center gap-6">
              <button 
                onClick={() => setOpen(true)}
                className="lg:hidden text-white hover:text-primary transition-colors p-2"
              >
                <div className="w-8 h-[2px] bg-current mb-2" />
                <div className="w-6 h-[2px] bg-current ml-auto" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <Sidebar open={open} setOpen={setOpen} />
    </>
  );
}
