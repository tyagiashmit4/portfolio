import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
    {
        name: "Ashwini Singh",
        role: "Technical Project Manager at Infrablok",
        content: "I had the pleasure of mentoring Ashmit Tyagi during his time at our company, where he joined as a fresher in Node.js and React.js technologies. Ashmit's enthusiasm and dedication were apparent from day one. He quickly adapted to our development environment and demonstrated a remarkable ability to learn and grow. During his time with us, Ashmit made significant contributions to several projects, showcasing his strong problem-solving skills and a keen eye for detail. He consistently delivered high-quality code and showed a deep understanding of both Node.js and React.js. Aside from his technical abilities, His positive attitude and eagerness to learn made him a valuable member of our team. It was a pleasure having Ashmit on our team, and I am confident that he will continue to excel in his career."
    },
    {
        name: "Gitika Nagpal",
        role: "Head - HR",
        content: "Had the pleasure of working with Ashmit and I recommend him for any Software Engineering Role! His ability to proactively seek solutions, dedication to deliver high quality work , collaborative work in different team settings is commendable . He always maintain a positive attitude even under adverse conditions at work. He seamlessly gels up in the culture and is an absolute asset for any software engineering team. Highly recommend"
    },
    {
        name: "Anjli Shastri",
        role: "UI Developer",
        content: "I highly recommend Ashmit Tyagi as a software developer. He is exceptionally hardworking, passionate about his work, and adapt at seamlessly integrating their skills into projects, ensuring a smooth workflow and outstanding results."
    },
    {
        name: "Vijay Kumar",
        role: "Software Engineer",
        content: "Ashmit is an exceptional team member who worked with me on a React project. He is hardworking, proactive, and has a strong attention to detail. Ashmit consistently delivers high-quality work and collaborates effectively with others. I highly recommend him for any opportunity he pursues."
    },
    {
        name: "Ashutosh Singh Tomer",
        role: "Android Developer - Walmart",
        content: "Ashmit is really amazing with his work, he is a quick learner, adapting to new frameworks, and new technologies is one of his top notch skills."
    }
];

const TestimonialCard = ({ testi, index }: { testi: typeof testimonials[0], index: number }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 200, damping: 20 });
    const ySpring = useSpring(y, { stiffness: 200, damping: 20 });

    const rotateX = useTransform(ySpring, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

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

    // Generate initials for the avatar
    const initials = testi.name.split(" ").map(n => n[0]).join("").slice(0, 2);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.12 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="group relative rounded-2xl overflow-hidden cursor-default h-full"
        >
            <div className="glass p-8 rounded-2xl border border-white/5 flex flex-col h-full relative bg-[#0c1018]/80 backdrop-blur-xl overflow-hidden transition-all duration-500 group-hover:border-primary/30">

                {/* Mouse-tracking spotlight */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                350px circle at ${mouseX}px ${mouseY}px,
                                rgba(0, 229, 255, 0.08),
                                transparent 80%
                            )
                        `,
                    }}
                />

                {/* Quote Icon — floats at Z=30 */}
                <div style={{ transform: "translateZ(30px)" }} className="mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] transition-all duration-500">
                        <Quote className="w-5 h-5 text-primary" />
                    </div>
                </div>

                {/* Content — floats at Z=40 */}
                <div style={{ transform: "translateZ(40px)" }} className="flex-grow mb-8 relative">
                    <p className="text-white/60 text-sm leading-relaxed font-sans line-clamp-6 group-hover:line-clamp-none group-hover:text-white/70 transition-colors duration-300">
                        "{testi.content}"
                    </p>
                </div>

                {/* Author info — floats at Z=50 */}
                <div style={{ transform: "translateZ(50px)" }} className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5 group-hover:border-primary/20 transition-colors duration-300">
                    {/* Avatar Circle */}
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center border border-white/10 group-hover:border-primary/40 group-hover:shadow-[0_0_15px_rgba(0,229,255,0.15)] transition-all duration-500 flex-shrink-0">
                        <span className="text-sm font-display font-bold text-white">{initials}</span>
                    </div>
                    <div className="min-w-0">
                        <h4 className="text-white font-display font-bold text-sm truncate group-hover:text-primary transition-colors duration-300">{testi.name}</h4>
                        <span className="text-white/30 text-[10px] font-mono uppercase tracking-widest truncate block">{testi.role}</span>
                    </div>
                </div>

                {/* Corner accent lines */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary/0 group-hover:border-primary/40 transition-colors duration-500 rounded-tl-xl" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary/0 group-hover:border-primary/40 transition-colors duration-500 rounded-br-xl" />

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
        </motion.div>
    );
};

export default function TestimonialArea() {
    return (
        <section id="testimonials" className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-0 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
                    <div className="flex flex-col">
                        <motion.span 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-accent font-mono tracking-widest uppercase mb-4 flex items-center gap-4"
                        >
                            / Recommendations
                            <span className="w-24 h-[1px] bg-accent/30 hidden md:block" />
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-4xl md:text-6xl font-display font-bold text-white uppercase"
                        >
                            PEOPLE <span className="neon-text">VOICES</span>
                        </motion.h2>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-white/40 font-mono text-sm uppercase tracking-widest hidden lg:block"
                    >
                        0{testimonials.length} Testimonials
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto" style={{ perspective: "1200px" }}>
                    {testimonials.map((testi, i) => (
                        <TestimonialCard key={i} testi={testi} index={i} />
                    ))}
                </div>
            </div>
            
            {/* Background glows */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[400px] bg-accent/5 rounded-[100%] blur-[150px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-primary/5 rounded-[100%] blur-[120px] pointer-events-none -z-10" />
        </section>
    );
}
