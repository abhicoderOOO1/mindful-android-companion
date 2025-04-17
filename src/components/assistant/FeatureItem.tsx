
import { cn } from "@/lib/utils";

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureItem({ 
  icon, 
  title, 
  description,
  className 
}: FeatureItemProps) {
  return (
    <div className={cn("flex items-start gap-3 p-4", className)}>
      <div className="bg-primary/10 p-2 rounded-full text-primary">
        {icon}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}
