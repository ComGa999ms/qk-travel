import React from "react";
import { motion } from "framer-motion";
import {
  useScrollAnimation,
  scrollVariants,
} from "../hooks/useScrollAnimation";

const ScrollReveal = ({
  children,
  className = "",
  variants = scrollVariants,
  ...props
}) => {
  const { ref, isInView } = useScrollAnimation(props);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
