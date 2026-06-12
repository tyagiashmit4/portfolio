import { Github, Linkedin, Mail } from "lucide-react";
import Magnetic from "../../components/common/Magnetic";

export default function FooterOne() {
  return (
    <footer className="py-20 border-t border-black/5 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">ASHMIT <span className="text-primary">TYAGI</span></h2>
            <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">Constructing the digital future.</p>
          </div>

          <div className="flex items-center gap-8 text-slate-500">
            {[
              { icon: <Github className="w-5 h-5" />, link: "https://github.com/tyagiashmit4" },
              { icon: <Linkedin className="w-5 h-5" />, link: "https://linkedin.com/in/tyagiashmit4/" },
              { icon: <Mail className="w-5 h-5" />, link: "mailto:tyagiashmit4@gmail.com" }
            ].map((social, i) => (
              <Magnetic key={i}>
                <a 
                  href={social.link} 
                  target="_blank" 
                  rel="noreferrer"
                  data-cursor="link"
                  className="hover:text-primary transition-colors duration-300 transform hover:scale-110 flex items-center justify-center p-2"
                >
                  {social.icon}
                </a>
              </Magnetic>
            ))}
          </div>

          <div className="text-slate-400 font-mono text-[10px] uppercase tracking-tighter">
            © {new Date().getFullYear()} ALL SYSTEMS OPERATIONAL
          </div>
        </div>
      </div>
      
      {/* Background glow */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200px] bg-primary/5 rounded-full blur-[100px]" />
    </footer>
  )
}
