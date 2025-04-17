
import React, { createContext, useContext, useState, useEffect } from "react";

type MessageType = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

type AssistantContextType = {
  messages: MessageType[];
  isListening: boolean;
  isProcessing: boolean;
  startListening: () => void;
  stopListening: () => void;
  sendTextCommand: (text: string) => void;
  clearMessages: () => void;
};

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

export function AssistantProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulate the initial welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: "welcome",
      text: "Hello! I'm your mindful assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

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
        startListening,
        stopListening,
        sendTextCommand,
        clearMessages,
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
  
  if (lowerMessage.includes("what can you do") || lowerMessage.includes("help")) {
    return "I can help with many tasks like opening apps, sending messages, making calls, setting alarms and reminders, checking your calendar, controlling device settings, and answering questions. What would you like help with?";
  }
  
  return "I understand you said: '" + message + "'. In a full implementation, I would process this request and provide a helpful response or take the appropriate action.";
}
