import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface DecryptedHeaderProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "span";
}

export default function DecryptedHeader({ text, className, tag = "h2" }: DecryptedHeaderProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const Tag = tag as any;

  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const childVariants = {
    hidden: {
      y: "110%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any, // easeOutExpo
      },
    },
  };

  return (
    <Tag
      ref={ref}
      className={`${className} inline-flex flex-wrap overflow-hidden`}
    >
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="inline-flex flex-wrap gap-x-[0.2em] overflow-hidden"
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              variants={childVariants}
              className="inline-block origin-bottom"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
