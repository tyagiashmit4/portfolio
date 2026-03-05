import { motion } from "framer-motion";
import { Send, Github, Linkedin, Mail, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";

interface InputFieldProps {
    label: string;
    type?: string;
    placeholder: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    required?: boolean;
}

const InputField = ({ label, type = "text", placeholder, name, value, onChange, required }: InputFieldProps) => (
    <div className="mb-6">
        <label className="block text-white/40 font-mono text-xs uppercase tracking-[0.2em] mb-2 pl-2 border-l-2 border-primary/30">
            {label}
        </label>
        <div className="relative group">
            <input 
                name={name}
                type={type} 
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
            />
            <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-focus-within:opacity-100 blur-xl -z-10 transition-opacity" />
        </div>
    </div>
);

const ContactArea = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!name || !email || !subject || !message) {
            setStatus("error");
            setErrorMessage("Please fill in all fields.");
            return;
        }

        setStatus("loading");
        
        try {
            const response = await axios.post("https://portfolio-server-eta-beige.vercel.app/mail", {
                name,
                email,
                subject,
                message,
            }, { headers: { "Content-Type": "application/json" } });

            if (response.status === 200) {
                setStatus("success");
                setName("");
                setEmail("");
                setSubject("");
                setMessage("");
                
                // Reset success message after 5 seconds
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
                setErrorMessage("Failed to send the message. Please try again.");
            }
        } catch (error) {
            setStatus("error");
            setErrorMessage("An unexpected error occurred. Please try again.");
            console.error(error);
        }
    };

    return (
        <section id="contact" className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-0">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    <div className="lg:w-1/2">
                        <motion.span 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-accent font-mono tracking-widest uppercase mb-4 block"
                        >
                            / Get in touch
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-4xl md:text-6xl font-display font-bold mb-8 text-white"
                        >
                            LET'S BUILD <br />
                            <span className="neon-text">THE FUTURE</span> TOGETHER
                        </motion.h2>
                        
                        <div className="space-y-8 mt-12">
                            {[
                                { icon: <Mail className="w-6 h-6" />, label: "Email", value: "tyagiashmit4@gmail.com", link: "mailto:tyagiashmit4@gmail.com" },
                                { icon: <Github className="w-6 h-6" />, label: "GitHub", value: "tyagiashmit4", link: "https://github.com/tyagiashmit4" },
                                { icon: <Linkedin className="w-6 h-6" />, label: "LinkedIn", value: "Ashmit Tyagi", link: "https://linkedin.com/in/tyagiashmit4/" }
                            ].map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-6 group cursor-pointer no-underline"
                                >
                                    <div className="w-14 h-14 rounded-2xl glass border border-white/5 flex items-center justify-center text-white/50 group-hover:text-primary group-hover:border-primary/30 transition-all duration-300">
                                        {social.icon}
                                    </div>
                                    <div>
                                        <p className="text-white/30 font-mono text-[10px] uppercase tracking-widest mb-1">{social.label}</p>
                                        <p className="text-lg text-white group-hover:text-primary transition-colors">{social.value}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="lg:w-1/2 w-full glass p-10 rounded-[2.5rem] border border-white/10 relative"
                    >
                        <form className="relative z-10" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField 
                                    name="name" 
                                    label="Full Name" 
                                    placeholder="Your Name" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <InputField 
                                    name="email" 
                                    label="Email Address" 
                                    type="email" 
                                    placeholder="hello@world.com" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <InputField 
                                name="subject" 
                                label="Subject" 
                                placeholder="Your Subject" 
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            />

                            <div className="mb-8">
                                <label className="block text-white/40 font-mono text-xs uppercase tracking-[0.2em] mb-2 pl-2 border-l-2 border-primary/30">
                                    Message
                                </label>
                                <textarea 
                                    name="message"
                                    rows={4}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    placeholder="Your Message"
                                    className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                                />
                            </div>
                            
                            <button 
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full py-5 bg-primary text-background font-bold rounded-xl flex items-center justify-center gap-3 group overflow-hidden relative shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-primary/60 transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <span className="relative z-10 uppercase tracking-widest text-background">
                                    {status === "loading" ? "Transmitting..." : "Transmit Message"}
                                </span>
                                {status === "loading" ? (
                                    <Loader2 className="w-5 h-5 relative z-10 animate-spin text-background" />
                                ) : (
                                    <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                )}
                                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </button>

                            {/* Status Messages */}
                            {status === "success" && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 flex items-center gap-3 text-green-400 bg-green-400/10 p-4 rounded-xl border border-green-400/20"
                                >
                                    <CheckCircle2 className="w-5 h-5" />
                                    <p className="text-sm font-sans">Message received! I'll get back to you soon.</p>
                                </motion.div>
                            )}

                            {status === "error" && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 flex items-center gap-3 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20"
                                >
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <p className="text-sm font-sans">{errorMessage}</p>
                                </motion.div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactArea;
