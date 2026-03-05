import { motion } from "framer-motion";

const experiences = [
    {
        year: "MAR 2025 - Present",
        company: "Amarujala Web Services",
        role: "Software Developer",
        description: "Building and optimizing high-performance mobile applications using React Native. Focusing on scalability and user experience."
    },
    {
        year: "Apr 2024 - Mar 2025",
        company: "Freelance",
        role: "Software Developer",
        description: "Helping businesses design, develop, and maintain custom web and app solutions tailored to their goals. Turning requirements into scalable applications."
    },
    {
        year: "Jun 2023 - Mar 2024",
        company: "InfraBlok India Pvt. Ltd",
        role: "Software Developer",
        description: "Developed enterprise-grade applications using React, JavaScript, and Typescript, focusing on scalable and maintainable solutions."
    },
    {
        year: "OCT 2022 - DEC 2022",
        company: "GBMR Electronics Pvt. Ltd.",
        role: "Web Developer (Intern)",
        description: "Built and optimized the official website using React, implementing performance improvements and responsive layouts."
    },
    {
        year: "AUG 2019 - JUN 2023",
        company: "G.L. Bajaj Institute",
        role: "B.Tech Graduation",
        description: "Bachelor's In Information Technology. Built a strong foundation in data structures, algorithms, and core software engineering principles."
    }
];

const TimelineItem = ({ item, index }: { item: typeof experiences[0], index: number }) => (
    <motion.div 
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        className={`relative flex flex-col md:flex-row items-center justify-between mb-24 w-full ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 h-[1px] bg-primary/30" />
        
        <div className={`w-full md:w-[45%] ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
            <div className="glass p-8 rounded-3xl border border-white/10 hover:border-primary/50 transition-colors duration-500">
                <span className="text-primary font-mono text-sm tracking-widest mb-2 block">{item.year}</span>
                <h3 className="text-2xl font-display font-bold text-white mb-2">{item.company}</h3>
                <h4 className="text-lg text-accent font-sans mb-4">{item.role}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
            </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(0,229,255,0.8)] z-20 hidden md:block">
            <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
        </div>
    </motion.div>
);

const ExperienceArea = () => {
    return (
        <section id="experience" className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-0">
                <div className="text-center mb-24">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-accent font-mono tracking-widest uppercase mb-4 block"
                    >
                        / Journey
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-display font-bold"
                    >
                        PROFESSIONAL <span className="neon-text">TIMELINE</span>
                    </motion.h2>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-accent to-transparent opacity-20 hidden md:block" />
                    
                    <div className="relative z-10">
                        {experiences.map((exp, i) => (
                            <TimelineItem key={i} item={exp} index={i} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] -z-10" />
        </section>
    );
};

export default ExperienceArea;
