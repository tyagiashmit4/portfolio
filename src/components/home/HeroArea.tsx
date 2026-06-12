import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import Magnetic from "../common/Magnetic";

const HeroArea = () => {
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    // Tracking mouse movements relative to the window for the ambient glow
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    const glowBackground = useMotionTemplate`
        radial-gradient(
            800px circle at ${mouseX}px ${mouseY}px,
            rgba(52, 211, 153, 0.12) 0%,
            rgba(16, 185, 129, 0.08) 40%,
            transparent 80%
        )
    `;

    return (
        <section 
            id="home" 
            onMouseMove={handleMouseMove}
            className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background grid-bg"
        >
            {/* Interactive Glow Back-blob */}
            <motion.div 
                className="pointer-events-none absolute inset-0 z-0"
                style={{ background: glowBackground }}
            />

            {/* Additional static atmospheric glow */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -z-10" />
            
            <div className="container relative z-10 pointer-events-none px-4 md:px-0">
                <div className="flex flex-col items-center justify-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="mb-4"
                    >
                        <span className="px-4 py-1.5 rounded-full border border-black/5 bg-black/[0.02] text-xs font-mono tracking-[0.2em] text-primary uppercase inline-block">
                            Available for Freelance & Roles
                        </span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-6xl md:text-8xl font-display font-extrabold tracking-tighter mb-6 text-slate-900 uppercase"
                    >
                        ASHMIT <span className="bg-gradient-to-r from-primary via-accent to-slate-800 bg-clip-text text-transparent">TYAGI</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-slate-500 font-mono tracking-widest max-w-2xl px-4 uppercase mb-12"
                    >
                        Full-Stack Developer
                    </motion.p>
                    
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6 pointer-events-auto items-center justify-center w-full"
                    >
                        <Magnetic>
                            <a 
                                href="#projects" 
                                data-cursor="link"
                                onClick={(e) => handleScroll(e, "projects")}
                                className="px-8 py-4 bg-primary text-white font-bold tracking-widest rounded-xl hover:bg-opacity-90 transition-all duration-300 shadow-[0_4px_20px_rgba(52, 211, 153, 0.25)] hover:shadow-[0_4px_30px_rgba(52, 211, 153, 0.4)] uppercase cursor-pointer no-underline block"
                            >
                                VIEW WORK
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a 
                                href="#contact" 
                                data-cursor="link"
                                onClick={(e) => handleScroll(e, "contact")}
                                className="px-8 py-4 border border-black/10 text-slate-800 font-bold tracking-widest rounded-xl hover:bg-black/[0.02] hover:border-black/20 transition-all duration-300 uppercase cursor-pointer no-underline block"
                            >
                                CONTACT ME
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a 
                                href="/Ashmit_Tyagi_Resume.pdf" 
                                data-cursor="link"
                                download 
                                target="_blank" 
                                rel="noreferrer"
                                className="px-8 py-4 border border-primary/20 text-primary font-bold tracking-widest rounded-xl hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 uppercase cursor-pointer no-underline block"
                            >
                                DOWNLOAD RESUME
                            </a>
                        </Magnetic>
                    </motion.div>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
                <span className="text-slate-400 text-[10px] font-mono mb-4 tracking-[0.3em] uppercase">Scroll to explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent animate-bounce" />
            </div>
        </section>
    );
};

export default HeroArea;
