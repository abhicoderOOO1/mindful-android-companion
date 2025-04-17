
import React, { createContext, useContext, useState, useEffect } from "react";

type MessageType = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

type CallState = "idle" | "incoming" | "ongoing" | "outgoing";

type AssistantContextType = {
  messages: MessageType[];
  isListening: boolean;
  isProcessing: boolean;
  isWakeWordEnabled: boolean;
  callState: CallState;
  currentCaller: string | null;
  startListening: () => void;
  stopListening: () => void;
  sendTextCommand: (text: string) => void;
  clearMessages: () => void;
  toggleWakeWord: () => void;
  simulateIncomingCall: (caller: string) => void;
  handleCall: (action: "answer" | "decline" | "end" | "call", recipient?: string) => void;
};

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

export function AssistantProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isWakeWordEnabled, setIsWakeWordEnabled] = useState(true);
  const [callState, setCallState] = useState<CallState>("idle");
  const [currentCaller, setCurrentCaller] = useState<string | null>(null);
  const [wakeWordDetectionInterval, setWakeWordDetectionInterval] = useState<number | null>(null);

  // Simulate the initial welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: "welcome",
      text: "Hello! I'm your mindful assistant. Say 'Hey Abhi' to activate me anytime.",
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);

    // Set up simulated wake word detection
    simulateWakeWordDetection();

    return () => {
      if (wakeWordDetectionInterval) {
        clearInterval(wakeWordDetectionInterval);
      }
    };
  }, []);

  // Simulate wake word detection
  const simulateWakeWordDetection = () => {
    // This is a simulation - in a real app, this would use the device's microphone
    // and a speech recognition system that's constantly listening for the wake word
    if (isWakeWordEnabled) {
      const intervalId = setInterval(() => {
        // Randomly simulate hearing "Hey Abhi" approximately once every 30-60 seconds
        // This is just for demo purposes
        if (Math.random() < 0.005 && !isListening && callState === "idle") {
          const wakeMessage = {
            id: Date.now().toString(),
            text: "Hey Abhi",
            isUser: true,
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, wakeMessage]);
          
          // Activate the assistant
          startListening();
          
          // Add assistant response
          setTimeout(() => {
            const responseMessage = {
              id: (Date.now() + 1).toString(),
              text: "I'm listening. How can I help you?",
              isUser: false,
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, responseMessage]);
          }, 500);
        }
      }, 1000);
      
      setWakeWordDetectionInterval(intervalId);
    } else if (wakeWordDetectionInterval) {
      clearInterval(wakeWordDetectionInterval);
      setWakeWordDetectionInterval(null);
    }
  };

  // Toggle wake word detection on/off
  const toggleWakeWord = () => {
    setIsWakeWordEnabled(prev => !prev);
  };

  // Effect to handle changes in wake word enablement
  useEffect(() => {
    if (wakeWordDetectionInterval) {
      clearInterval(wakeWordDetectionInterval);
      setWakeWordDetectionInterval(null);
    }
    
    if (isWakeWordEnabled) {
      simulateWakeWordDetection();
    }
  }, [isWakeWordEnabled]);

  // Simulated voice recognition - in a real app this would use the Web Speech API
  const startListening = () => {
    setIsListening(true);
    
    // Simulate listening for 3 seconds
    setTimeout(() => {
      stopListening();
      
      // Simulate user message after listening stops
      const userMessage = {
        id: Date.now().toString(),
        text: getRandomUserMessage(),
        isUser: true,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, userMessage]);
      setIsProcessing(true);
      
      // Simulate assistant processing and response
      setTimeout(() => {
        const assistantMessage = {
          id: (Date.now() + 1).toString(),
          text: getResponseForMessage(userMessage.text),
          isUser: false,
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, assistantMessage]);
        setIsProcessing(false);
      }, 1500);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  // Send a text command instead of using voice
  const sendTextCommand = (text: string) => {
    const userMessage = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsProcessing(true);
    
    // Process call commands
    const lowerText = text.toLowerCase();
    if (
      lowerText.includes("call") || 
      lowerText.includes("answer") || 
      lowerText.includes("decline") || 
      lowerText.includes("hang up") ||
      lowerText.includes("end call")
    ) {
      processCallCommand(lowerText);
    }
    
    // Simulate assistant processing and response
    setTimeout(() => {
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        text: getResponseForMessage(text),
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  // Process call-related commands
  const processCallCommand = (text: string) => {
    if (text.includes("call") && callState === "idle") {
      // Extract name to call
      const nameMatch = text.match(/call\s+(\w+)/i);
      const name = nameMatch ? nameMatch[1] : "Mom";
      
      // Simulate outgoing call
      handleCall("call", name);
    } else if (text.includes("answer") && callState === "incoming") {
      handleCall("answer");
    } else if ((text.includes("decline") || text.includes("reject")) && callState === "incoming") {
      handleCall("decline");
    } else if ((text.includes("hang up") || text.includes("end call")) && 
              (callState === "ongoing" || callState === "outgoing")) {
      handleCall("end");
    }
  };

  // Handle call actions
  const handleCall = (action: "answer" | "decline" | "end" | "call", recipient?: string) => {
    switch (action) {
      case "call":
        if (recipient) {
          setCallState("outgoing");
          setCurrentCaller(recipient);
          
          // Simulate connecting after a delay
          setTimeout(() => {
            setCallState("ongoing");
            
            const callMessage = {
              id: Date.now().toString(),
              text: `Connected to ${recipient}`,
              isUser: false,
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, callMessage]);
          }, 2000);
        }
        break;
        
      case "answer":
        if (callState === "incoming" && currentCaller) {
          setCallState("ongoing");
          
          const answerMessage = {
            id: Date.now().toString(),
            text: `Call with ${currentCaller} connected`,
            isUser: false,
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, answerMessage]);
        }
        break;
        
      case "decline":
        if (callState === "incoming") {
          setCallState("idle");
          
          const declineMessage = {
            id: Date.now().toString(),
            text: `Call from ${currentCaller} declined`,
            isUser: false,
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, declineMessage]);
          setCurrentCaller(null);
        }
        break;
        
      case "end":
        if (callState === "ongoing" || callState === "outgoing") {
          setCallState("idle");
          
          const endMessage = {
            id: Date.now().toString(),
            text: `Call with ${currentCaller} ended`,
            isUser: false,
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, endMessage]);
          setCurrentCaller(null);
        }
        break;
    }
  };

  // Simulate incoming call
  const simulateIncomingCall = (caller: string) => {
    if (callState === "idle") {
      setCallState("incoming");
      setCurrentCaller(caller);
      
      const incomingMessage = {
        id: Date.now().toString(),
        text: `Incoming call from ${caller}`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, incomingMessage]);
    }
  };

  const clearMessages = () => {
    const welcomeMessage = {
      id: "welcome",
      text: "How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  };

  return (
    <AssistantContext.Provider 
      value={{
        messages,
        isListening,
        isProcessing,
        isWakeWordEnabled,
        callState,
        currentCaller,
        startListening,
        stopListening,
        sendTextCommand,
        clearMessages,
        toggleWakeWord,
        simulateIncomingCall,
        handleCall,
      }}
    >
      {children}
    </AssistantContext.Provider>
  );
}

export function useAssistant() {
  const context = useContext(AssistantContext);
  if (context === undefined) {
    throw new Error("useAssistant must be used within an AssistantProvider");
  }
  return context;
}

// Helper functions for demo purposes
function getRandomUserMessage() {
  const messages = [
    "What's the weather like today?",
    "Open my calendar app",
    "Set an alarm for 7 AM tomorrow",
    "Send a message to John",
    "What can you do?",
    "Call Mom",
    "Answer the call",
    "Decline the call",
    "End the call",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

function getResponseForMessage(message: string) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("weather")) {
    return "I don't have access to real-time weather data in this demo, but in a full implementation, I could show you the current weather and forecast.";
  }
  
  if (lowerMessage.includes("calendar")) {
    return "I would open your calendar app. In a full implementation, I could also show your upcoming events or help you create new ones.";
  }
  
  if (lowerMessage.includes("alarm")) {
    return "Alarm set for 7 AM tomorrow. In a full implementation, this would actually create an alarm on your device.";
  }
  
  if (lowerMessage.includes("message") || lowerMessage.includes("send")) {
    return "In a full implementation, I would help you send a message to your contact. Would you like me to show you how that would work?";
  }
  
  if (lowerMessage.includes("call") && !lowerMessage.includes("decline") && !lowerMessage.includes("end")) {
    const nameMatch = lowerMessage.match(/call\s+(\w+)/i);
    const name = nameMatch ? nameMatch[1] : "someone";
    return `I'm initiating a call to ${name}. In a full implementation, this would use your phone's dialer to make an actual call.`;
  }
  
  if (lowerMessage.includes("answer")) {
    return "Call answered. You're now connected.";
  }
  
  if (lowerMessage.includes("decline") || lowerMessage.includes("reject")) {
    return "Call declined.";
  }
  
  if (lowerMessage.includes("hang up") || lowerMessage.includes("end call")) {
    return "Call ended.";
  }
  
  if (lowerMessage.includes("what can you do") || lowerMessage.includes("help")) {
    return "I can help with many tasks like opening apps, sending messages, making calls, answering calls, setting alarms and reminders, checking your calendar, controlling device settings, and answering questions. What would you like help with?";
  }
  
  return "I understand you said: '" + message + "'. In a full implementation, I would process this request and provide a helpful response or take the appropriate action.";
}
