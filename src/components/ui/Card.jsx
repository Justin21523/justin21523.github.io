import React from "react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

const Card = React.forwardRef(({ className, children, ...props }, ref) => (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.4 }}
    className={cn(
      "rounded-xl border border-border bg-card text-card-foreground shadow-sm bg-white hover:shadow-md transition-all duration-300",
      className
    )}
    {...props}
  >
    {children}
  </motion.div>
));
Card.displayName = "Card";

export { Card };
