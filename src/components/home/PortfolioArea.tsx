import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import ImagePopup from "../../modals/ImagePopup";
import "react-18-image-lightbox/style.css";
import { ExternalLink } from "lucide-react";

interface DataType {
  id: number;
  col: string;
  image: string;
  title: string;
  category: string;
  link?: string;
}

const portfolio_data: DataType[] = [
  { id: 1, col: "6", image: "/assets/images/projects/amarujala.jpeg", title: "Amarujala News App", category: "App Development", link: "https://play.google.com/store/apps/details?id=com.org.AmarUjala.news&pcampaignid=web_share" },
  { id: 2, col: "6", image: "/assets/images/projects/myjyotish.jpeg", title: "Myjyotish Astrologer App", category: "App Development", link: "https://play.google.com/store/apps/details?id=com.amarujala.myjyotish&pcampaignid=web_share" },
  { id: 3, col: "4", image: "/assets/images/projects/thebonus.jpeg", title: "TheBonus app", category: "App Development", link: "https://play.google.com/store/apps/details?id=com.org.amarujala.thebonus&pcampaignid=web_share" },
  { id: 4, col: "4", image: "/assets/images/Lens.png", title: "LensCorp Replica", category: "Web Interface", link: "https://lenscorp-replica.vercel.app/" },
  { id: 6, col: "6", image: "/assets/images/Dashbaord.png", title: "React Dashboard", category: "Web Interface", link: "https://react-project-assignment-eight.vercel.app/" },
  { id: 7, col: "6", image: "/assets/images/editor.png", title: "Code Editor", category: "Web Interface", link: "https://code-editor-pied-tau.vercel.app/" },
];

const ProjectCard = ({ item, index, onClick }: { item: DataType, index: number, onClick: () => void }) => {
  // 3D Tilt tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX, rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-xl overflow-hidden border border-white/5 bg-[#0c1018] cursor-pointer"
      onClick={onClick}
    >
      {/* Dynamic backglow on hover */}
      <div
        className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl -z-10 bg-primary/15 rounded-2xl"
        style={{ transform: "translateZ(-30px)" }}
      />

      {/* Mouse-tracking spotlight on surface */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 z-30"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 229, 255, 0.1),
              transparent 80%
            )
          `,
        }}
      />

      {/* Image Container — sits at Z=0 */}
      <div className="relative h-[280px] overflow-hidden" style={{ transform: "translateZ(0px)" }}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-110 transition-all duration-700 ease-out"
        />
        {/* Gradient fade to card base */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1018] via-[#0c1018]/30 to-transparent group-hover:via-primary/5 transition-colors duration-500" />

        {/* Horizontal scan line */}
        <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute left-0 right-0 h-[1px] bg-primary/40 animate-scan" />
        </div>

        {/* Targeting brackets */}
        <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
        <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
      </div>

      {/* Category badge — floats above the image at Z=30 */}
      <div className="absolute top-4 left-4 z-20" style={{ transform: "translateZ(30px)" }}>
        <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-mono text-primary uppercase tracking-widest group-hover:border-primary/30 group-hover:shadow-[0_0_12px_rgba(0,229,255,0.15)] transition-all duration-300">
          {item.category}
        </span>
      </div>

      {/* External Link button — floats at Z=40 */}
      {item.link && (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary/30 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]"
          style={{ transform: "translateZ(40px)" }}
        >
          <ExternalLink className="w-4 h-4 text-white" />
        </a>
      )}

      {/* Info Section — pops forward at Z=50 */}
      <div className="p-6 relative z-10" style={{ transform: "translateZ(50px)" }}>
        <h3 className="text-lg font-display font-bold text-white group-hover:text-primary transition-colors duration-300 truncate">
          {item.title}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-6 h-[1px] bg-primary/50 group-hover:w-12 transition-all duration-500" />
          <span className="text-white/30 font-mono text-[10px] uppercase tracking-widest group-hover:text-white/50 transition-colors">
            View Details
          </span>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  );
};

export default function PortfolioArea() {
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleImagePopup = (i: number) => {
    setPhotoIndex(i);
    setIsOpen(true);
  };

  const images = portfolio_data.map((item) => item.image);

  return (
    <section id="projects" className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="flex flex-col">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-accent font-mono tracking-widest uppercase mb-4 flex items-center gap-4"
            >
              / Case Studies
              <span className="w-24 h-[1px] bg-accent/30 hidden md:block" />
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-6xl font-display font-bold"
            >
              LATEST <span className="neon-text">CREATIONS</span>
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1200px" }}>
          {portfolio_data.map((item, i) => (
            <ProjectCard key={item.id} item={item} index={i} onClick={() => handleImagePopup(i)} />
          ))}
        </div>
      </div>

      {isOpen && photoIndex !== null && (
        <ImagePopup
          images={images}
          setIsOpen={setIsOpen}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
        />
      )}
    </section>
  );
}
