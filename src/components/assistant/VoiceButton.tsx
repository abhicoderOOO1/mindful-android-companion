
import { useState, useEffect } from "react";
import { Mic, Loader2, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAssistant } from "@/contexts/AssistantContext";

interface VoiceButtonProps {
  onActivate: () => void;
  isListening: boolean;
  className?: string;
}

export function VoiceButton({ onActivate, isListening, className }: VoiceButtonProps) {
  const [pulseClass, setPulseClass] = useState("");
  const { isWakeWordEnabled, toggleWakeWord } = useAssistant();

  useEffect(() => {
    setPulseClass(isListening ? "pulse-animation" : "");
  }, [isListening]);

  return (
    <div className="flex items-center gap-2">
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
      
      <button
        onClick={toggleWakeWord}
        className={cn(
          "flex items-center justify-center p-2 rounded-full transition-colors",
          isWakeWordEnabled ? "bg-primary/20 text-primary" : "bg-muted/30 text-muted-foreground"
        )}
        title={isWakeWordEnabled ? "Wake word 'Hey Abhi' is enabled" : "Wake word is disabled"}
      >
        {isWakeWordEnabled ? (
          <Mic className="h-5 w-5" />
        ) : (
          <MicOff className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
