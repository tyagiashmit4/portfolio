import { motion } from "framer-motion";

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

export default function ServiceArea() {
    return (
        <section id="services" className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-0">
                <div className="flex flex-col mb-16">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-accent font-mono tracking-widest uppercase mb-4"
                    >
                        / Capabilities
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-4xl md:text-6xl font-display font-bold text-white uppercase"
                    >
                        PREMIUM <span className="neon-text">SOLUTIONS</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="glass p-8 rounded-3xl border border-white/10 group hover:border-primary/50 transition-all duration-500"
                        >
                            <span className="text-primary/30 font-display text-4xl mb-6 block group-hover:text-primary transition-colors">{service.id}</span>
                            <h3 className="text-xl font-display font-bold text-white mb-4 h-14">{service.title}</h3>
                            <p className="text-white/60 mb-8 leading-relaxed text-sm">{service.description}</p>
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {service.tech.map(t => (
                                    <span key={t} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono text-accent uppercase tracking-wider">{t}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
