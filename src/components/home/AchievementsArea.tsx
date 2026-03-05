import { motion } from "framer-motion";

const achievements = [
    { number: "20+", label: "Projects Completed", icon: "🚀" },
    { number: "2+", label: "Years Experience", icon: "💼" },
    { number: "8+", label: "Certifications", icon: "🏆" }
];

const HolographicCard = ({ item, index }: { item: typeof achievements[0], index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        whileHover={{ 
            y: -10,
            transition: { duration: 0.3 }
        }}
        className="relative group perspective-1000"
    >
        <div className="glass p-10 rounded-[2rem] border border-white/10 flex flex-col items-center text-center overflow-hidden transition-all duration-500 group-hover:border-primary/50 group-hover:neon-border">
            {/* Holographic effect gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <span className="text-5xl mb-6">{item.icon}</span>
            <motion.h3 
                className="text-5xl font-display font-bold text-white mb-2"
                whileHover={{ scale: 1.1 }}
            >
                {item.number}
            </motion.h3>
            <p className="text-white/60 font-mono uppercase tracking-widest text-sm">{item.label}</p>
            
            {/* Scanning line animation */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/40 -translate-y-full group-hover:animate-scan" />
        </div>
    </motion.div>
);

const AchievementsArea = () => {
    return (
        <section id="achievements" className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {achievements.map((item, i) => (
                        <HolographicCard key={i} item={item} index={i} />
                    ))}
                </div>
            </div>
            
            {/* Floating particles background element */}
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] -z-10" />
        </section>
    );
};

export default AchievementsArea;
