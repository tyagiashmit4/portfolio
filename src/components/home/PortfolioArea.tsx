import { useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import ImagePopup from "../../modals/ImagePopup";
import "react-18-image-lightbox/style.css";

interface DataType {
  id: number;
  col: string;
  image: string;
  title: string;
  category: string;
}

const portfolio_data: DataType[] = [
  { id: 1, col: "6", image: "/assets/images/projects/amarujala.jpeg", title: "Amarujala News App", category: "app" },
  { id: 2, col: "6", image: "/assets/images/projects/myjyotish.jpeg", title: "Myjyotish Astrologer App", category: "app" },
  { id: 3, col: "4", image: "/assets/images/projects/thebonus.jpeg", title: "TheBonus app", category: "app" },
  { id: 4, col: "4", image: "/assets/images/Lens.png", title: "LensCorp Replica", category: "web" },
  { id: 5, col: "4", image: "/assets/images/netflix.png", title: "Netflix Clone", category: "web" },
  { id: 6, col: "6", image: "/assets/images/Dashbaord.png", title: "React Dashboard", category: "web" },
  { id: 7, col: "6", image: "/assets/images/editor.png", title: "Code Editor", category: "web" },
];

const ProjectCard = ({ item, index, onClick }: { item: DataType, index: number, onClick: () => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className="relative group h-[400px] w-full rounded-2xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer shadow-2xl"
      onClick={onClick}
    >
      <div
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="absolute inset-4 flex flex-col justify-end p-6 bg-gradient-to-t from-background/90 via-background/40 to-transparent z-10"
      >
        <span className="text-accent font-mono text-xs uppercase tracking-widest mb-2 block">{item.category}</span>
        <h3 className="text-2xl font-display font-bold text-white group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {item.title}
        </h3>
        
        <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <span className="text-white/60 text-sm font-sans">View Project</span>
          <div className="w-8 h-[1px] bg-primary" />
        </div>
      </div>
      
      <motion.img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-500"
        style={{ transform: "translateZ(-50px)" }}
      />
      
      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
        <div className="flex flex-col mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-accent font-mono tracking-widest uppercase mb-4"
          >
            / Case Studies
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-display font-bold"
          >
            LATEST <span className="neon-text">CREATIONS</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
