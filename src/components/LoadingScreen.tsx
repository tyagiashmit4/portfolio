import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const LoadingScreen = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setLoading(false), 500);
                    return 100;
                }
                return prev + 5;
            });
        }, 50);

        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    key="loading-screen"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    className="fixed inset-0 z-[10000] bg-[#0b0b13] flex flex-col items-center justify-center p-4 overflow-hidden"
                >
                    <div className="relative">
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-32 h-32 border-2 border-primary/20 rounded-full flex items-center justify-center mb-8 relative"
                        >
                            <img src="/assets/images/portfolio.png" alt="Logo" className="w-20 invert opacity-80" />
                            <div className="absolute inset-x-0 inset-y-0 border-t-2 border-primary rounded-full animate-spin" />
                        </motion.div>
                        
                        <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
                    </div>

                    <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden relative">
                        <motion.div 
                            className="absolute inset-0 bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "easeOut", duration: 0.1 }}
                        />
                    </div>
                    
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 font-mono text-primary text-sm tracking-[0.5em] uppercase"
                    >
                        Initializing System {progress}%
                    </motion.div>

                    {/* Futuristic Scanning Line */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="w-full h-[2px] bg-primary/20 absolute top-0 animate-scan" style={{ boxShadow: '0 0 15px #00E5FF' }} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
