import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, Download, ArrowRight, MessageSquare } from "lucide-react";
import Magnetic from "../common/Magnetic";
import Hero3DCanvas from "../canvas/Hero3DCanvas";

// Counters logic with easeOut interpolation for high-fidelity loading animations
const CounterItem = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Start counter simulation immediately upon mounting
    setHasStarted(true);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number;
    let animationFrame: number;
    const duration = 2000; // 2 seconds animation time

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuad = (x: number) => x * (2 - x);
      setCount(Math.floor(easeOutQuad(progress) * value));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, hasStarted]);

  return (
    <div ref={ref} className="glass-premium px-4 py-3.5 md:px-5 md:py-4 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-lg hover:border-slate-300">
      <div className="text-xl md:text-2xl font-display font-extrabold text-slate-800 flex items-baseline justify-center">
        <span>{count}</span>
        <span className="text-indigo-600 font-bold ml-0.5">{suffix}</span>
      </div>
      <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-1">
        {label}
      </div>
    </div>
  );
};

// Continuous Floating card around avatar
const FloatingCard = ({ 
  icon,
  title,
  subtitle,
  className,
  yOffset = 0,
  delay = 0,
  glowColor = "rgba(99, 102, 241, 0.08)",
  accentColor = "rgba(99, 102, 241, 1)",
  translateZ = 50
}: { 
  icon: string;
  title: string;
  subtitle: string;
  className: string;
  yOffset?: number;
  delay?: number;
  glowColor?: string;
  accentColor?: string;
  translateZ?: number;
}) => {
  return (
    <motion.div
      style={{ transform: `translateZ(${translateZ}px)` }}
      className={`absolute glass-premium pl-2 pr-4 py-2.5 md:pl-2.5 md:pr-5 md:py-3 rounded-2xl flex items-center gap-3 border border-white/60 shadow-lg pointer-events-auto cursor-default transition-all duration-300 ${className}`}
      animate={{
        y: [yOffset, yOffset - 12, yOffset],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
      whileHover={{
        scale: 1.06,
        borderColor: accentColor,
        boxShadow: `0 12px 32px -4px ${glowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.8)`,
        y: yOffset - 12
      }}
    >
      {/* Vertical Left Accent Border */}
      <div 
        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full"
        style={{ backgroundColor: accentColor }}
      />
      <div 
        className="flex items-center justify-center w-7 h-7 rounded-xl bg-white/90 border border-slate-100/50 text-xs shadow-sm flex-shrink-0 relative ml-1"
      >
        <span className="relative z-10">{icon}</span>
      </div>
      <div className="flex flex-col text-left">
        <span className="text-[10px] md:text-xs font-display font-extrabold text-slate-800 leading-tight">{title}</span>
        <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest leading-none mt-1">{subtitle}</span>
      </div>
    </motion.div>
  );
};

// Unused DeviceMockup component removed. Usage can be restored from history if needed.

const HeroArea = () => {
  const roles = [
    "React Native Developer",
    "FullStack Developer",
    "Web Developer",
    "Frontend Developer"
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    // Initialize random particle variables on client-side
    const initialParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 5 + 3,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 8,
    }));
    setParticles(initialParticles);

    // Set role cycle interval
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Mouse coordinate tracking for the atmospheric hover glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 22 });

  // 3D parallax tilt transforms for the avatar container
  const rotateX = useTransform(springY, [0, 800], [8, -8]);
  const rotateY = useTransform(springX, [0, 1200], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Headlines reveal animations configuration
  const line1 = "Building Web & Mobile Apps";
  const line2 = "That People Love To Use.";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: 0.1 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, damping: 12, stiffness: 100 }
    }
  };

  return (
    <section 
      id="home" 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#EEF2FF] to-[#FAFAF9] pt-24 md:pt-32 pb-16 md:pb-20 grid-bg-subtle"
    >
      {/* Background 3D Hexagonal Canvas */}
      <div 
        className="absolute inset-0 w-full h-full z-0 opacity-[0.85] select-none pointer-events-none"
        style={{
          maskImage: "radial-gradient(ellipse 80% 50% at 50% 35%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 35%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)"
        }}
      >
        <Hero3DCanvas />
      </div>

      {/* Background Layer 6: Mouse Following Glow */}
      <motion.div 
        className="absolute pointer-events-none rounded-full bg-gradient-to-r from-indigo-500/8 via-purple-500/8 to-emerald-500/8 blur-[120px] w-[600px] h-[600px] z-0"
        style={{ 
          x: springX, 
          y: springY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      />

      {/* Background Layer 2: Blurred Blobs (Pulsing Colors) */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-200/30 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/3 w-[350px] h-[350px] bg-purple-200/25 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Background Layer 5: Moving Light Beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] rotate-[28deg]">
          <motion.div
            className="w-[1.5px] h-full bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent absolute"
            style={{ left: "25%" }}
            animate={{ x: ["-10vw", "10vw"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="w-[1.5px] h-full bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent absolute"
            style={{ left: "70%" }}
            animate={{ x: ["-15vw", "15vw"] }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear", delay: 3 }}
          />
        </div>
      </div>

      {/* Background Layer 4: Rising Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-indigo-500/8 rounded-full pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            bottom: "-10px",
          }}
          animate={{
            y: ["0vh", "-110vh"],
            x: [0, Math.sin(p.id) * 30, 0],
            opacity: [0, 0.5, 0.5, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        {/* Split Screen Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Content & Actions */}
          <div className="lg:col-span-7 flex flex-col text-left">
            
            {/* Small Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-5 self-start"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-100 bg-indigo-50/50 text-[10px] font-mono font-bold tracking-wider text-indigo-600 uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                Available for Full-Time Roles & Freelance Projects
              </span>
            </motion.div>

            {/* Character-by-Character Headline */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-3xl sm:text-4xl lg:text-[2.85rem] xl:text-[3.35rem] font-display font-extrabold tracking-tight text-slate-900 leading-[1.15]"
            >
              <div className="block whitespace-nowrap">
                {line1.split(" ").map((word, wIdx) => (
                  <span key={wIdx} className="inline-block mr-2.5 whitespace-nowrap">
                    {word.split("").map((char, cIdx) => (
                      <motion.span key={cIdx} variants={letterVariants} className="inline-block">
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </div>
              <div className="block mt-1 whitespace-nowrap">
                {line2.split(" ").map((word, wIdx) => (
                  <span key={wIdx} className="inline-block mr-2.5 whitespace-nowrap">
                    {word.split("").map((char, cIdx) => (
                      <motion.span 
                        key={cIdx} 
                        variants={letterVariants} 
                        className={`inline-block ${
                          wIdx >= 2 ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent" : ""
                        }`}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Animated Role Switcher */}
            <div className="h-6 flex items-center mt-4 mb-6">
              <span className="font-mono text-xs text-slate-500 uppercase tracking-widest mr-2">I am a</span>
              <div className="relative h-full overflow-hidden flex-grow">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 text-xs font-mono font-bold text-emerald-600 uppercase tracking-wider"
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base text-slate-500 max-w-xl leading-relaxed mb-10"
            >
              Software Developer specializing in building scalable React Native mobile apps, React.js web applications, Node.js backend services, Next.js full-stack systems, and TypeScript architectures.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 md:gap-6"
            >
              <Magnetic>
                <a 
                  href="#projects" 
                  onClick={(e) => handleScroll(e, "projects")}
                  className="px-6 py-3.5 bg-indigo-600 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-600/15 hover:bg-indigo-700 hover:shadow-indigo-600/25 transition-all flex items-center gap-2 cursor-pointer no-underline"
                >
                  View Projects
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </Magnetic>

              <Magnetic>
                <a 
                  href="/Ashmit_Tyagi_Resume(1).pdf" 
                  download 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-6 py-3.5 border border-slate-200 hover:border-slate-300 text-slate-700 font-mono text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer no-underline"
                >
                  Download Resume
                  <Download className="w-3.5 h-3.5" />
                </a>
              </Magnetic>

              <Magnetic>
                <a 
                  href="#contact" 
                  onClick={(e) => handleScroll(e, "contact")}
                  className="px-6 py-3.5 text-slate-500 hover:text-slate-900 font-mono text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-slate-50/50 transition-all flex items-center gap-2 cursor-pointer no-underline"
                >
                  Contact Me
                  <MessageSquare className="w-3.5 h-3.5" />
                </a>
              </Magnetic>
            </motion.div>

            {/* Statistics Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mt-12 max-w-xl w-full"
            >
              <CounterItem value={3} suffix="+" label="Years Exp" />
              <CounterItem value={15} suffix="+" label="Projects Done" />
              <CounterItem value={4} suffix="+" label="In Production" />
            </motion.div>

          </div>

          {/* Right Side: Visual Experiences */}
          <div className="lg:col-span-5 relative flex items-center justify-center pointer-events-none mt-8 lg:mt-0 preserve-3d">
            
            {/* Interactive 3D Elements Wrapper (Fixed viewport-independent scaling) */}
            <motion.div 
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative w-[320px] h-[320px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] flex items-center justify-center preserve-3d pointer-events-auto"
            >
              
              {/* Concentric Orbit Rings (3D back-layer) */}
              <div 
                style={{ transform: "translateZ(-25px)" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
              >
                <div className="w-[280px] h-[280px] md:w-[340px] md:h-[340px] rounded-full border border-dashed border-indigo-400/25 absolute animate-spin-slow" />
                <div className="w-[380px] h-[380px] md:w-[460px] md:h-[460px] rounded-full border border-dashed border-indigo-300/15 absolute animate-spin-reverse-slow" />
              </div>

              {/* SVG connections overlay (quadratic bezier curves connecting avatar to cards) */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
              >
                {/* SVG path from center (50,50) to React Native card (12, 16) */}
                <motion.path 
                  d="M 50 50 Q 35 25 12 16" 
                  stroke="rgba(6, 182, 212, 0.25)" 
                  strokeWidth="0.75" 
                  fill="none" 
                  strokeDasharray="4 4"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                
                {/* SVG path to Next.js card (88, 12) */}
                <motion.path 
                  d="M 50 50 Q 65 25 88 12" 
                  stroke="rgba(15, 23, 42, 0.2)" 
                  strokeWidth="0.75" 
                  fill="none" 
                  strokeDasharray="4 4"
                  animate={{ strokeDashoffset: [0, 20] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                
                {/* SVG path to React.js card (8, 56) */}
                <motion.path 
                  d="M 50 50 Q 30 50 8 56" 
                  stroke="rgba(97, 218, 251, 0.3)" 
                  strokeWidth="0.75" 
                  fill="none" 
                  strokeDasharray="4 4"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                
                {/* SVG path to TypeScript card (92, 52) */}
                <motion.path 
                  d="M 50 50 Q 70 50 92 52" 
                  stroke="rgba(49, 120, 198, 0.25)" 
                  strokeWidth="0.75" 
                  fill="none" 
                  strokeDasharray="4 4"
                  animate={{ strokeDashoffset: [0, 20] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                
                {/* SVG path to Node.js card (20, 88) */}
                <motion.path 
                  d="M 50 50 Q 35 75 20 88" 
                  stroke="rgba(51, 153, 51, 0.25)" 
                  strokeWidth="0.75" 
                  fill="none" 
                  strokeDasharray="4 4"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </svg>

              {/* Personal Avatar Circle */}
              <div 
                style={{ transform: "translateZ(20px)" }}
                className="relative z-10 w-[190px] h-[190px] md:w-[250px] md:h-[250px] rounded-full border border-slate-200/60 shadow-[0_30px_70px_rgba(0,0,0,0.08)] bg-white flex items-center justify-center p-3 select-none"
              >
                {/* Soft backdrop gradient ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-slate-100 via-indigo-50/30 to-slate-50 opacity-40" />
                
                {/* Elegant outer glow */}
                <div className="absolute inset-[-15px] rounded-full bg-indigo-500/5 blur-xl pointer-events-none -z-10" />

                {/* Actual image wrapper with multiply blend mode */}
                <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-50/50 border border-slate-100 shadow-inner">
                  <img 
                    src="/assets/images/ashmit.png" 
                    alt="Ashmit Tyagi Portrait" 
                    className="w-full h-full object-contain object-bottom select-none z-10 relative scale-105 translate-y-1"
                    style={{ mixBlendMode: 'multiply', filter: 'contrast(1.04) brightness(1.02)' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/assets/images/ashmit.jpg";
                      (e.target as HTMLImageElement).style.mixBlendMode = 'normal';
                    }}
                  />
                </div>
              </div>

              {/* Floating Skill Cards (3D foreground layer with precise anchored offsets) */}
              <FloatingCard 
                icon="⚡"
                title="React Native" 
                subtitle="Mobile Development"
                className="top-[4%] left-[-4%] md:left-[-12%]" 
                glowColor="rgba(6, 182, 212, 0.15)"
                accentColor="rgba(6, 182, 212, 1)"
                yOffset={0} 
                delay={0}
                translateZ={45}
              />
              <FloatingCard 
                icon="▲"
                title="Next.js" 
                subtitle="Full-Stack Web"
                className="top-[0%] right-[-2%] md:right-[-10%]" 
                glowColor="rgba(15, 23, 42, 0.15)"
                accentColor="rgba(15, 23, 42, 1)"
                yOffset={-8} 
                delay={1}
                translateZ={55}
              />
              <FloatingCard 
                icon="⚛️"
                title="React.js" 
                subtitle="Web Applications"
                className="top-[46%] left-[-12%] md:left-[-22%]" 
                glowColor="rgba(97, 218, 251, 0.15)"
                accentColor="rgba(97, 218, 251, 1)"
                yOffset={10} 
                delay={2}
                translateZ={60}
              />
              <FloatingCard 
                icon="⚙️"
                title="TypeScript" 
                subtitle="Type-Safe Systems"
                className="top-[42%] right-[-10%] md:right-[-18%]" 
                glowColor="rgba(49, 120, 198, 0.15)"
                accentColor="rgba(49, 120, 198, 1)"
                yOffset={6} 
                delay={1.5}
                translateZ={50}
              />
              <FloatingCard 
                icon="🟢"
                title="Node.js" 
                subtitle="Backend Services"
                className="bottom-[4%] left-[6%] md:left-[-2%]" 
                glowColor="rgba(51, 153, 51, 0.15)"
                accentColor="rgba(51, 153, 51, 1)"
                yOffset={-6} 
                delay={2.5}
                translateZ={40}
              />

              {/* Device 1: iPhone displaying Amar Ujala App */}
              {/* <DeviceMockup 
                appName="Amar Ujala App"
                deviceType="iphone"
                gradient="bg-gradient-to-b from-orange-500 to-red-600 text-white"
                className="bottom-[0%] left-[-2%] w-[100px] h-[175px] md:w-[115px] md:h-[200px] z-20"
                yOffset={0}
                delay={0.5}
              >
                <div className="flex-grow flex flex-col">
                  <span className="font-mono text-[7px] md:text-[8px] font-extrabold uppercase tracking-wider text-center border-b border-white/20 pb-1">AMAR UJALA</span>
                  <div className="bg-white/15 rounded-lg p-1.5 mt-2 flex flex-col gap-1 border border-white/10">
                    <span className="text-[6px] text-white/90 font-bold leading-tight">BREAKING NEWS</span>
                    <div className="h-1 bg-white/40 rounded-full w-4/5" />
                    <div className="h-1 bg-white/30 rounded-full w-3/5" />
                  </div>
                  <div className="bg-white/10 rounded p-1 mt-1.5 flex flex-col gap-0.5 border border-white/5">
                    <div className="h-0.5 bg-white/25 rounded-full" />
                    <div className="h-0.5 bg-white/25 rounded-full w-5/6" />
                  </div>
                  <div className="mt-auto flex justify-between px-1">
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                  </div>
                </div>
              </DeviceMockup> */}

              {/* Device 2: Android displaying Bonus App */}
              {/* <DeviceMockup 
                appName="Bonus App"
                deviceType="android"
                gradient="bg-gradient-to-b from-blue-600 to-indigo-800 text-white"
                className="top-[5%] left-[36%] w-[90px] h-[155px] md:w-[105px] md:h-[180px] z-0 opacity-80"
                yOffset={0}
                delay={1.8}
              >
                <div className="flex-grow flex flex-col">
                  <span className="font-mono text-[7px] font-bold text-center text-emerald-300 tracking-widest border-b border-white/15 pb-1">BONUS APP</span>
                  <div className="mt-2.5 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full border-[2px] border-emerald-400 border-t-transparent flex items-center justify-center">
                      <span className="text-[6px] font-bold">2,4K</span>
                    </div>
                    <span className="text-[5px] text-white/50 uppercase tracking-widest mt-1">Wallet Points</span>
                  </div>
                  <div className="mt-auto bg-emerald-500 rounded py-0.5 text-center text-[5px] font-bold text-indigo-950">
                    CLAIM BONUS
                  </div>
                </div>
              </DeviceMockup> */}

              {/* Device 3: Phone displaying Astro App */}
              {/* <DeviceMockup 
                appName="Astro App"
                deviceType="iphone"
                gradient="bg-gradient-to-b from-[#180E29] to-[#2D1B4E] text-[#F3EFE0]"
                className="bottom-[2%] right-[-5%] w-[100px] h-[175px] md:w-[115px] md:h-[200px] z-20"
                yOffset={0}
                delay={1.0}
              >
                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex justify-between items-center border-b border-purple-500/20 pb-1">
                    <span className="text-[6px] font-serif text-yellow-300">★ ASTRO</span>
                    <span className="text-[5px] font-mono text-purple-400">DAILY</span>
                  </div>
                  <div className="my-auto flex flex-col items-center">
             
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-100 to-transparent relative shadow-sm">
                      <div className="absolute inset-y-0 inset-x-1 bg-[#201535] rounded-full scale-95" />
                    </div>
                    <span className="text-[6px] text-yellow-200/80 mt-1 font-mono tracking-wide">LEO</span>
                  </div>
                  <div className="bg-purple-950/60 border border-purple-500/20 rounded p-1 text-center text-[5px] font-mono text-purple-200 leading-tight">
                    Horizon is clear.
                  </div>
                </div>
              </DeviceMockup> */}

            </motion.div>
          </div>
          
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10 select-none">
        <span className="text-slate-400 text-[9px] font-mono mb-2.5 tracking-[0.3em] uppercase">Scroll to explore</span>
        <div className="w-[1px] h-9 bg-gradient-to-b from-indigo-500 to-transparent animate-bounce" />
      </div>
    </section>
  );
};

export default HeroArea;
