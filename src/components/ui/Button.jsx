import React from "react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";

const Button = React.forwardRef(
  ({ className, variant = "primary", size = "default", asChild = false, ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "border border-border bg-transparent hover:bg-secondary/50 text-foreground",
      ghost: "hover:bg-secondary/50 text-muted-foreground hover:text-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    };

    const Comp = asChild ? Slot : motion.button;
    
    // Only pass motion props if NOT asChild (Slot doesn't handle them well with merged props)
    const motionProps = asChild ? {} : { whileTap: { scale: 0.98 } };

    return (
      <Comp
        ref={ref}
        {...motionProps}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
