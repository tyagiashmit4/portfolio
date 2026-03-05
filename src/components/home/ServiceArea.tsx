import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const services = [
    {
        id: "01",
        title: "End-to-End Web & Mobile App Development",
        description: "Build high-performance cross-platform apps and websites using React Native/React.js with seamless navigation, theming, and state management.",
        tech: ["React Native", "React.js"]
    },
    {
        id: "02",
        title: "Reusable Component Library / Design System",
        description: "Create modular, theme-aware UI components to ensure design consistency across projects using React or React Native.",
        tech: ["React", "UI/UX"]
    },
    {
        id: "03",
        title: "Custom Hook Development",
        description: "Develop reusable custom hooks to abstract business logic and simplify component code.",
        tech: ["Hooks", "Logic"]
    },
    {
        id: "04",
        title: "Complex State Management",
        description: "Implement scalable, maintainable app-wide state with Redux Toolkit, or Context API.",
        tech: ["Redux", "Context API"]
    },
    {
        id: "05",
        title: "Performance Optimization",
        description: "Optimize render cycles and app speed using memoization, lazy loading, and profiling tools.",
        tech: ["Optimization", "React"]
    },
    {
        id: "06",
        title: "Web App Development",
        description: "Build responsive and interactive SPAs using React.js, React Router, and modern CSS frameworks like Tailwind.",
        tech: ["React.js", "Tailwind"]
    },
    {
        id: "07",
        title: "CI/CD & Deployments",
        description: "Automate builds and deployments using modern CI/CD tools for fast and safe releases.",
        tech: ["CI/CD", "Deployment"]
    },
    {
        id: "08",
        title: "Theming & Localization",
        description: "Enable dark/light mode, RTL layout, and multilingual interfaces using i18next and dynamic theming.",
        tech: ["i18n", "Theming"]
    }
];

const CyberpunkCard = ({ service, index }: { service: typeof services[0], index: number }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const { colors } = useTheme();

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onMouseMove={handleMouseMove}
            className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-background border border-white/5 p-8 transition-all duration-500 hover:border-transparent min-h-[300px]"
        >
            {/* Base Background */}
            <div className="absolute inset-0 bg-white/[0.02]" />

            {/* Mouse Tracking Glow Border */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            350px circle at ${mouseX}px ${mouseY}px,
                            ${colors.primary}50,
                            transparent 80%
                        )
                    `,
                }}
            />
            
            {/* Inner Content Container */}
            <div className="relative z-10 flex flex-col h-full">
                {/* Header: ID and Decorative Elements */}
                <div className="flex items-start justify-between mb-8">
                    <span className="text-primary font-mono text-3xl font-bold tracking-tighter opacity-40 group-hover:opacity-100 transition-opacity">
                        {service.id}
                    </span>
                    <div className="flex gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                        <div className="w-2 h-2 rounded-sm bg-primary" />
                        <div className="w-2 h-2 rounded-sm bg-primary" />
                        <div className="w-2 h-2 rounded-sm bg-transparent border border-primary" />
                    </div>
                </div>

                <h3 className="text-xl font-display font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                </h3>
                
                <p className="text-white/60 mb-8 leading-relaxed text-sm font-sans flex-grow">
                    {service.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                    {service.tech.map(t => (
                        <span 
                            key={t} 
                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-sm text-[10px] font-mono text-white/50 group-hover:border-primary/30 group-hover:text-accent transition-all uppercase tracking-wider"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            {/* Cyberpunk Notches (CSS styling overlay) */}
            <div className="absolute top-0 right-0 w-8 h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 w-8 h-[2px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
    );
};

export default function ServiceArea() {
    return (
        <section id="services" className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-0 relative z-10">
                <div className="flex flex-col mb-16 relative">
                    {/* Decorative Background grid lines for the header */}
                    <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary via-accent to-transparent opacity-50" />
                    
                    <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-accent font-mono tracking-widest uppercase mb-4 pl-6"
                    >
                        / Capabilities
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-4xl md:text-6xl font-display font-bold text-white uppercase pl-6"
                    >
                        PREMIUM <span className="neon-text">SOLUTIONS</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, i) => (
                        <CyberpunkCard key={service.id} service={service} index={i} />
                    ))}
                </div>
            </div>
            
            {/* Background Accent */}
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        </section>
    );
}
