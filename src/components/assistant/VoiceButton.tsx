
import { useState, useEffect } from "react";
import { Mic, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceButtonProps {
  onActivate: () => void;
  isListening: boolean;
  className?: string;
}

export function VoiceButton({ onActivate, isListening, className }: VoiceButtonProps) {
  const [pulseClass, setPulseClass] = useState("");

  useEffect(() => {
    setPulseClass(isListening ? "pulse-animation" : "");
  }, [isListening]);

  return (
    <button
      onClick={onActivate}
      className={cn(
        "assistant-button w-16 h-16 flex items-center justify-center text-white",
        pulseClass,
        className
      )}
      aria-label="Activate voice assistant"
    >
      {isListening ? (
        <Loader2 className="h-8 w-8 animate-spin" />
      ) : (
        <Mic className="h-8 w-8" />
      )}
    </button>
  );
}
