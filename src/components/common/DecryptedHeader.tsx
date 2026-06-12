import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { useTextScramble } from "../../hooks/useTextScramble";

interface DecryptedHeaderProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "span";
}

export default function DecryptedHeader({ text, className, tag = "h2" }: DecryptedHeaderProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  // Animates when it comes into view
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { text: scrambledText, scramble } = useTextScramble(text, 25, 100, false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (inView && !hasTriggered.current) {
      hasTriggered.current = true;
      scramble();
    }
  }, [inView, scramble]);

  const Tag = tag as any;

  return (
    <Tag
      ref={ref}
      onMouseEnter={scramble}
      className={className}
      style={{ userSelect: "none" }}
    >
      {scrambledText}
    </Tag>
  );
}
