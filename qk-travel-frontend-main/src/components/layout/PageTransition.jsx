import React from "react";
import { motion } from "framer-motion";
import { slideVariants } from "../../utils/animationVariants";

const PageTransition = ({ children, variant = slideVariants }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
