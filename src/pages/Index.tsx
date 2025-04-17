
import { useState } from "react";
import { useAssistant } from "@/contexts/AssistantContext";
import { VoiceButton } from "@/components/assistant/VoiceButton";
import { AssistantMessage } from "@/components/assistant/AssistantMessage";
import { SuggestionChip } from "@/components/assistant/SuggestionChip";
import { VisualFeedback } from "@/components/assistant/VisualFeedback";
import { NavBar } from "@/components/assistant/NavBar";
import { 
  Mic, 
  Calendar, 
  BellRing, 
  MessageSquare, 
  Phone, 
  Settings,
  RefreshCw
} from "lucide-react";

const Index = () => {
  const { 
    messages, 
    isListening, 
    isProcessing, 
    startListening, 
    sendTextCommand,
    clearMessages
  } = useAssistant();

  const [inputText, setInputText] = useState("");

  const handleSendText = () => {
    if (inputText.trim()) {
      sendTextCommand(inputText);
      setInputText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendText();
    }
  };

  // Example suggestions
  const suggestions = [
    { text: "Set an alarm", icon: <BellRing className="w-4 h-4" />, action: () => sendTextCommand("Set an alarm for 7 AM") },
    { text: "Check calendar", icon: <Calendar className="w-4 h-4" />, action: () => sendTextCommand("What's on my calendar today?") },
    { text: "Send message", icon: <MessageSquare className="w-4 h-4" />, action: () => sendTextCommand("Send a message to John") },
    { text: "Make a call", icon: <Phone className="w-4 h-4" />, action: () => sendTextCommand("Call Mom") },
    { text: "Device settings", icon: <Settings className="w-4 h-4" />, action: () => sendTextCommand("Open WiFi settings") },
  ];

  return (
    <div className="assistant-container dark assistant-gradient">
      <NavBar className="bg-background/30 backdrop-blur-sm" />
      
      <main className="flex-1 flex flex-col">
        {/* Assistant chat area */}
        <div className="flex-1 flex flex-col p-4 overflow-y-auto">
          <div className="flex-1 flex flex-col justify-end space-y-4 mb-4">
            {messages.map((message) => (
              <AssistantMessage 
                key={message.id} 
                message={message.text} 
                isUser={message.isUser} 
              />
            ))}
            
            {isProcessing && (
              <div className="self-start bg-secondary text-secondary-foreground rounded-2xl py-3 px-5 animate-pulse">
                Thinking...
              </div>
            )}
          </div>
        </div>
        
        {/* Suggestions */}
        <div className="px-4 py-2">
          <div className="flex gap-2 overflow-x-auto pb-2 animate-fade-in">
            {suggestions.map((suggestion, index) => (
              <SuggestionChip 
                key={index}
                text={suggestion.text}
                icon={suggestion.icon}
                onClick={suggestion.action}
              />
            ))}
            
            <SuggestionChip 
              text="Clear chat"
              icon={<RefreshCw className="w-4 h-4" />}
              onClick={clearMessages}
              className="bg-muted/50"
            />
          </div>
        </div>
        
        {/* Input area */}
        <div className="p-4 border-t border-border bg-card/30 backdrop-blur-md">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-background/50 text-foreground placeholder:text-muted-foreground border border-input focus:border-primary focus-visible:ring-1 focus-visible:ring-ring rounded-full px-4 py-2 outline-none"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            
            <VoiceButton 
              onActivate={startListening} 
              isListening={isListening} 
            />
          </div>
          
          {/* Visual feedback when listening */}
          {isListening && (
            <div className="mt-3 flex justify-center">
              <VisualFeedback isActive={true} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
