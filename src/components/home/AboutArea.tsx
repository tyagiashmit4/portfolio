import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import DecryptedHeader from "../common/DecryptedHeader";

const Card = ({ title, content, delay, accentColor = "#6366F1", glowColor = "rgba(99, 102, 241, 0.08)" }: { title: string, content: string, delay: number, accentColor?: string, glowColor?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
        whileHover={{ 
            y: -6,
            borderColor: accentColor,
            boxShadow: `0 20px 40px -10px ${glowColor}`
        }}
        className="glass-premium pl-6 pr-8 py-8 md:pl-8 rounded-2xl border border-white/60 relative overflow-hidden group h-full transition-all duration-300"
    >
        {/* Vertical Left Accent Border */}
        <div 
            className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-full"
            style={{ backgroundColor: accentColor }}
        />
        
        <h3 className="text-xl font-display font-extrabold mb-3 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent group-hover:text-slate-900 transition-colors duration-300">
            {title}
        </h3>
        <p className="text-slate-500 font-sans text-sm leading-relaxed">{content}</p>
    </motion.div>
);

const AboutArea = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    
    const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const y2 = useTransform(scrollYProgress, [0, 1], [-80, 80]);

    return (
        <section 
            ref={ref} 
            id="about" 
            className="py-24 md:py-32 relative overflow-hidden px-4 md:px-8 bg-gradient-to-b from-[#FAFAF9] via-[#F8FAFC] to-[#F1F5F9] grid-bg-subtle border-t border-slate-100"
        >
            {/* Background Layer 2: Blurred Blobs (Pulsing Colors) */}
            <motion.div 
                style={{ y: y1 }}
                className="absolute top-1/4 right-5 w-96 h-96 bg-indigo-200/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow" 
            />
            <motion.div 
                style={{ y: y2 }}
                className="absolute bottom-1/4 left-5 w-[350px] h-[350px] bg-emerald-200/20 rounded-full blur-[100px] pointer-events-none -z-10" 
            />

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Column: Heading & Description */}
                    <div className="lg:col-span-7 flex flex-col text-left">
                        <motion.span 
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-100 bg-indigo-50/50 text-[10px] font-mono font-bold tracking-wider text-indigo-600 uppercase shadow-sm self-start mb-5"
                        >
                            / About Me
                        </motion.span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-slate-950 uppercase leading-[1.15] mb-6">
                            <DecryptedHeader text="CREATIVITY MEETS" tag="span" /> <br />
                            <DecryptedHeader text="CODE ARCHITECTURE" tag="span" className="bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent" />
                        </h2>
                        <motion.p 
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-base text-slate-500 max-w-xl leading-relaxed"
                        >
                            I specialize in building complex digital systems that are as beautiful as they are functional. With a focus on performance and user experience, I bring ideas to life using the latest technologies.
                        </motion.p>
                    </div>
                    
                    {/* Right Column: Focus Cards */}
                    <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
                        <Card 
                            title="Architecture" 
                            content="Designing scalable frontend and backend systems with high efficiency."
                            delay={0.2}
                            accentColor="#059669"
                            glowColor="rgba(5, 150, 105, 0.12)"
                        />
                        <Card 
                            title="Interactive" 
                            content="Creating immersive user experiences with 3D and smooth animations."
                            delay={0.4}
                            accentColor="#6366F1"
                            glowColor="rgba(99, 102, 241, 0.12)"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutArea;
