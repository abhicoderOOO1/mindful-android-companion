
import { cn } from "@/lib/utils";

interface AssistantMessageProps {
  message: string;
  isUser?: boolean;
  className?: string;
}

export function AssistantMessage({ 
  message, 
  isUser = false,
  className
}: AssistantMessageProps) {
  return (
    <div 
      className={cn(
        "animate-fade-in max-w-[80%] px-4 py-3 rounded-2xl mb-3",
        isUser 
          ? "bg-primary text-primary-foreground self-end rounded-br-sm" 
          : "bg-secondary text-secondary-foreground self-start rounded-bl-sm",
        className
      )}
    >
      {message}
    </div>
  );
}
