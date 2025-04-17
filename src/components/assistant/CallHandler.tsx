
import { useAssistant } from "@/contexts/AssistantContext";
import { Phone, PhoneOff, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CallHandlerProps {
  className?: string;
}

export function CallHandler({ className }: CallHandlerProps) {
  const { callState, currentCaller, handleCall } = useAssistant();
  
  if (callState === "idle") {
    return null;
  }
  
  return (
    <div className={cn(
      "fixed inset-x-0 top-16 mx-auto max-w-md rounded-lg p-4 shadow-lg z-50 animate-in fade-in slide-in-from-top-10 duration-300",
      callState === "incoming" ? "bg-green-900/90" : "bg-blue-900/90",
      className
    )}>
      <div className="flex flex-col items-center text-white">
        <div className="text-lg font-medium mb-2">
          {callState === "incoming" 
            ? `Incoming call from ${currentCaller}` 
            : callState === "outgoing"
              ? `Calling ${currentCaller}...`
              : `On call with ${currentCaller}`
          }
        </div>
        
        <div className="flex gap-4 mt-2">
          {callState === "incoming" ? (
            <>
              <button 
                onClick={() => handleCall("answer")}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 transition-colors"
                aria-label="Answer call"
              >
                <Phone className="h-6 w-6" />
              </button>
              
              <button 
                onClick={() => handleCall("decline")}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
                aria-label="Decline call"
              >
                <X className="h-6 w-6" />
              </button>
            </>
          ) : (
            <button 
              onClick={() => handleCall("end")}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
              aria-label="End call"
            >
              <PhoneOff className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
