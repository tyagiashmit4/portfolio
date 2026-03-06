import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Rocket, Briefcase, Award } from "lucide-react";

const achievements = [
    { number: 20, suffix: "+", label: "Projects Completed", Icon: Rocket },
    { number: 2.5, suffix: "+", label: "Years Experience", Icon: Briefcase },
    { number: 8, suffix: "+", label: "Certifications", Icon: Award }
];

function useAnimatedCounter(value: number, duration: number = 2) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!inView) return;
        let startTime: number;
        let animationFrame: number;
        const easeOutExpo = (x: number) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
        const updateCount = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            setCount(Math.floor(easeOutExpo(progress) * value));
            if (progress < 1) animationFrame = requestAnimationFrame(updateCount);
        };
        animationFrame = requestAnimationFrame(updateCount);
        return () => cancelAnimationFrame(animationFrame);
    }, [value, duration, inView]);

    return { count, ref };
}

const Stat3DCard = ({ item, index }: { item: typeof achievements[0], index: number }) => {
    const { count, ref } = useAnimatedCounter(item.number, 2.5);
    const IconComponent = item.Icon;

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 200, damping: 20 });
    const ySpring = useSpring(y, { stiffness: 200, damping: 20 });

    const rotateX = useTransform(ySpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative group w-full cursor-default"
        >
            <div className="glass p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center overflow-hidden transition-all duration-500 group-hover:border-primary/40 relative bg-background/50 backdrop-blur-xl">

                {/* Mouse-tracking spotlight glare */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"
                    style={{
                        background: useTransform(
                            [mouseX, mouseY],
                            ([mx, my]: number[]) => `radial-gradient(300px circle at ${mx}px ${my}px, rgba(0, 229, 255, 0.12), transparent 50%)`
                        )
                    }}
                />

                {/* Icon */}
                <div
                    style={{ transform: "translateZ(40px)" }}
                    className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] transition-all duration-500"
                >
                    <IconComponent className="w-6 h-6 text-primary" />
                </div>

                {/* Number */}
                <div style={{ transform: "translateZ(60px)" }} className="flex items-baseline gap-1 mb-2">
                    <span className="text-5xl font-display font-bold text-white group-hover:text-primary transition-colors duration-300">{count}</span>
                    <span className="text-3xl font-display font-bold text-primary">{item.suffix}</span>
                </div>

                {/* Label */}
                <p style={{ transform: "translateZ(30px)" }} className="text-white/40 font-mono uppercase tracking-[0.2em] text-[10px]">{item.label}</p>

                {/* Corner accent lines */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary/0 group-hover:border-primary/40 transition-colors duration-500 rounded-tl-xl" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary/0 group-hover:border-primary/40 transition-colors duration-500 rounded-br-xl" />
            </div>
        </motion.div>
    );
};

const Card = ({ title, content, delay }: { title: string, content: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 50, rotateX: 20 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
        whileHover={{ scale: 1.05, rotateY: 10, translateZ: 20 }}
        className="glass p-8 rounded-2xl border border-white/10 relative overflow-hidden group h-full"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <h3 className="text-2xl font-display font-bold mb-4 text-primary">{title}</h3>
        <p className="text-white/70 font-sans leading-relaxed">{content}</p>
    </motion.div>
);

const AboutArea = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    
    const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

    return (
        <section ref={ref} id="about" className="py-32 relative overflow-hidden px-4 md:px-0 bg-background">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="md:w-1/2">
                        <motion.span 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-accent font-mono tracking-[0.2em] uppercase mb-4 block"
                        >
                            / About Me
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-4xl md:text-6xl font-display font-bold mb-8 text-white uppercase leading-tight"
                        >
                            CREATIVITY MEETS <br />
                            <span className="neon-text">CODE ARCHITECTURE</span>
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-white/60 text-lg mb-12 max-w-xl leading-relaxed"
                        >
                            I specialize in building complex digital systems that are as beautiful as they are functional. With a focus on performance and user experience, I bring ideas to life using the latest web technologies.
                        </motion.p>
                    </div>
                    
                    <div className="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 perspective-1000">
                        <Card 
                            title="Architecture" 
                            content="Designing scalable frontend and backend systems with high efficiency."
                            delay={0.2}
                        />
                        <Card 
                            title="Interactive" 
                            content="Creating immersive user experiences with 3D and smooth animations."
                            delay={0.4}
                        />
                    </div>
                </div>

                {/* 3D Stats Cards */}
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto" style={{ perspective: "1000px" }}>
                    {achievements.map((item, i) => (
                        <Stat3DCard key={i} item={item} index={i} />
                    ))}
                </div>
            </div>
            
            {/* Background elements */}
            <motion.div style={{ y: y1 }} className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />
            <motion.div style={{ y: y2 }} className="absolute bottom-1/4 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] -z-10" />
        </section>
    );
};

export default AboutArea;
