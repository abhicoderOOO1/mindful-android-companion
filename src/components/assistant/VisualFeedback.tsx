
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface VisualFeedbackProps {
  isActive: boolean;
  className?: string;
}

export function VisualFeedback({ isActive, className }: VisualFeedbackProps) {
  const [bars, setBars] = useState<number[]>([]);
  
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setBars(Array.from({ length: 5 }, () => Math.random() * 50 + 10));
      }, 150);
      
      return () => clearInterval(interval);
    } else {
      setBars([15, 15, 15, 15, 15]);
    }
  }, [isActive]);

  return (
    <div className={cn("flex items-end justify-center gap-1 h-12", className)}>
      {bars.map((height, index) => (
        <div
          key={index}
          className="w-2 bg-primary rounded-t-full transition-all duration-150 ease-in-out"
          style={{ height: isActive ? `${height}px` : "10px" }}
        />
      ))}
    </div>
  );
}
