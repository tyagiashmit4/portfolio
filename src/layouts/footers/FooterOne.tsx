import { Github, Linkedin, Mail } from "lucide-react";

export default function FooterOne() {
  return (
    <footer className="py-20 border-t border-white/10 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-display font-bold text-white mb-2">ASHMIT <span className="text-primary">TYAGI</span></h2>
            <p className="text-white/40 font-mono text-xs uppercase tracking-widest">Constructing the digital future.</p>
          </div>

          <div className="flex items-center gap-8 text-white/40">
            {[
              { icon: <Github className="w-5 h-5" />, link: "https://github.com/tyagiashmit4" },
              { icon: <Linkedin className="w-5 h-5" />, link: "https://linkedin.com/in/tyagiashmit4/" },
              { icon: <Mail className="w-5 h-5" />, link: "mailto:tyagiashmit4@gmail.com" }
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.link} 
                target="_blank" 
                className="hover:text-primary transition-colors duration-300 transform hover:scale-110"
              >
                {social.icon}
              </a>
            ))}
          </div>

          <div className="text-white/20 font-mono text-[10px] uppercase tracking-tighter">
            © {new Date().getFullYear()} ALL SYSTEMS OPERATIONAL
          </div>
        </div>
      </div>
      
      {/* Background glow */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200px] bg-primary/5 rounded-full blur-[100px]" />
    </footer>
  )
}
