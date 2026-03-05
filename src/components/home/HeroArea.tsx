import { motion } from "framer-motion";
import { Scene } from "../canvas/Scene";
import { Hero3D } from "../canvas/Hero3D";

const HeroArea = () => {
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
            <Scene>
                <Hero3D />
            </Scene>
            
            <div className="container relative z-10 pointer-events-none">
                <div className="flex flex-col items-center justify-center text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-4 text-white uppercase"
                    >
                        ASHMIT <span className="neon-text">TYAGI</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-white/60 font-mono tracking-widest max-w-2xl px-4"
                    >
                    <span className="text-accent underline-offset-8 underline decoration-accent/50">FULL-STACK DEVELOPER</span>
                    </motion.p>
                    
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="mt-12 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 pointer-events-auto"
                    >
                        <a 
                            href="#projects" 
                            onClick={(e) => handleScroll(e, "projects")}
                            className="px-8 py-4 bg-primary text-background font-bold tracking-widest hover:bg-white transition-all duration-300 neon-border uppercase cursor-pointer no-underline block"
                        >
                            VIEW WORK
                        </a>
                        <a 
                            href="#contact" 
                            onClick={(e) => handleScroll(e, "contact")}
                            className="px-8 py-4 border border-white/20 text-white font-bold tracking-widest hover:bg-white/10 transition-all duration-300 uppercase cursor-pointer no-underline block"
                        >
                            CONTACT ME
                        </a>
                        <a 
                            href="/Ashmit_Tyagi_Resume.pdf" 
                            download 
                            target="_blank" 
                            rel="noreferrer"
                            className="px-8 py-4 border border-primary/50 text-primary font-bold tracking-widest hover:bg-primary/10 transition-all duration-300 uppercase cursor-pointer no-underline block shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                        >
                            DOWNLOAD RESUME
                        </a>
                    </motion.div>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
                <span className="text-white/30 text-[10px] font-mono mb-4 tracking-[0.3em] uppercase">Scroll to explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent animate-bounce" />
            </div>
        </section>
    );
};

export default HeroArea;
