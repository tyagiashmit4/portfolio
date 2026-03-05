import { motion } from "framer-motion";
import { Scene } from "../canvas/Scene";
import { OrbitingTech } from "../canvas/OrbitingTech";

const TechStackArea = () => {
    const skills = [
        'React Native', 'React.js', 'Node.js', 'TypeScript', 
        'Java', 'Spring Boot', 'MySql', 
        'JavaScript','HTML' , 'CSS','DSA', 'OOPs', 'Git'
    ];

    return (
        <section id="tech-stack" className="py-32 relative min-h-[80vh] flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Scene cameraPos={[0, 0, 5]}>
                    <OrbitingTech />
                </Scene>
            </div>
            
            <div className="container mx-auto relative z-10 pointer-events-none">
                <div className="flex flex-col items-start justify-center text-left max-w-2xl px-4 md:px-0">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-accent font-mono tracking-widest uppercase mb-4 block"
                    >
                        / Skills
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-4xl md:text-6xl font-display font-bold mb-8"
                    >
                        THE <span className="neon-text">ARSENAL</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-white/60 text-lg mb-8"
                    >
                        A comprehensive toolkit for modern full-stack development. I leverage these technologies to build robust, scalable, and high-performance applications.
                    </motion.p>
                    
                    <div className="flex flex-wrap gap-3 pointer-events-auto">
                        {skills.map((tech, i) => (
                            <motion.div
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="px-5 py-2 glass border border-white/10 rounded-full text-center text-xs font-mono text-white/80 hover:border-primary/50 hover:text-primary transition-all duration-300"
                            >
                                {tech}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -z-10" />
        </section>
    );
};

export default TechStackArea;
