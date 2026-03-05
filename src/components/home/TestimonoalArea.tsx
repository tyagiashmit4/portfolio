import { motion } from "framer-motion";

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

export default function TestimonoalArea() {
    return (
        <section id="testimonials" className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-0">
                <div className="text-center mb-24">
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-display font-bold text-white uppercase"
                    >
                        PEOPLE <span className="neon-text">VOICES</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testi, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass p-8 rounded-[2rem] border border-white/5 flex flex-col justify-between"
                        >
                            <span className="text-primary text-4xl mb-4">"</span>
                            <p className="text-white/70 italic mb-8 leading-relaxed font-sans text-sm line-clamp-6 hover:line-clamp-none transition-all">{testi.content}</p>
                            <div>
                                <h4 className="text-white font-bold text-lg">{testi.name}</h4>
                                <span className="text-accent/60 text-xs font-mono uppercase tracking-widest">{testi.role}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[150px] -z-10" />
        </section>
    );
}
