
import { cn } from "@/lib/utils";

interface SuggestionChipProps {
  text: string;
  icon?: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export function SuggestionChip({ 
  text, 
  icon, 
  onClick,
  className 
}: SuggestionChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 bg-secondary/80 hover:bg-secondary text-secondary-foreground rounded-full text-sm transition-colors",
        className
      )}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}
