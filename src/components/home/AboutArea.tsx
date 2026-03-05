import { motion } from "framer-motion";

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
    return (
        <section id="about" className="py-32 relative overflow-hidden px-4 md:px-0 bg-background">
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
            </div>
            
            {/* Background elements */}
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] -z-10" />
        </section>
    );
};

export default AboutArea;
