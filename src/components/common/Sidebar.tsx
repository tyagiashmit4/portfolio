import MobileMenu from "../../layouts/headers/MobileMenu";
import { X } from "lucide-react";

export default function Sidebar({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
  return (
    <>
      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-[400px] bg-background/95 backdrop-blur-2xl z-[200] border-l border-white/10 transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-end mb-12">
            <button 
              onClick={() => setOpen(false)}
              className="p-2 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="flex-grow">
            <MobileMenu setOpen={setOpen} />
          </div>

          <div className="mt-auto pt-12 border-t border-white/5">
            <p className="text-white/30 font-mono text-xs uppercase tracking-[0.3em] mb-4">Social Links</p>
            <div className="flex gap-6">
              <a href="#" className="text-white/50 hover:text-primary transition-colors font-mono text-sm uppercase">Github</a>
              <a href="#" className="text-white/50 hover:text-primary transition-colors font-mono text-sm uppercase">Linkedin</a>
            </div>
          </div>
        </div>
      </div>

      <div 
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] transition-opacity duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
    </>
  );
}
