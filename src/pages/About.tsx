
import { NavBar } from "@/components/assistant/NavBar";
import { FeatureItem } from "@/components/assistant/FeatureItem";
import { 
  Mic, 
  Calendar, 
  BellRing, 
  MessageSquare, 
  Phone, 
  Settings, 
  Zap,
  Lock,
  Workflow
} from "lucide-react";

const About = () => {
  return (
    <div className="assistant-container dark assistant-gradient">
      <NavBar className="bg-background/30 backdrop-blur-sm" />
      
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-md mx-auto">
          <div className="assistant-card p-6 animate-fade-in mb-4">
            <h1 className="text-2xl font-bold mb-2">About Mindful</h1>
            <p className="text-muted-foreground mb-6">
              Your privacy-focused Android assistant companion
            </p>
            
            <h2 className="text-lg font-semibold mb-4">Key Features</h2>
            
            <div className="space-y-2">
              <FeatureItem 
                icon={<Mic className="w-5 h-5" />}
                title="Voice Command Interface"
                description="Activate the assistant with your voice or by tap"
              />
              
              <FeatureItem 
                icon={<Zap className="w-5 h-5" />}
                title="App Controls"
                description="Open apps and control device functions with voice commands"
              />
              
              <FeatureItem 
                icon={<MessageSquare className="w-5 h-5" />}
                title="Smart Messaging"
                description="Send and read messages using your voice"
              />
              
              <FeatureItem 
                icon={<Phone className="w-5 h-5" />}
                title="Call Control"
                description="Make and manage calls hands-free"
              />
              
              <FeatureItem 
                icon={<Calendar className="w-5 h-5" />}
                title="Calendar & Reminders"
                description="Manage your schedule with voice commands"
              />
              
              <FeatureItem 
                icon={<Settings className="w-5 h-5" />}
                title="Device Settings"
                description="Control WiFi, Bluetooth, and other settings"
              />
              
              <FeatureItem 
                icon={<Workflow className="w-5 h-5" />}
                title="Custom Workflows"
                description="Create automated sequences for routine tasks"
              />
              
              <FeatureItem 
                icon={<Lock className="w-5 h-5" />}
                title="Privacy Focused"
                description="Your data stays on your device and under your control"
              />
            </div>
          </div>
          
          <div className="assistant-card p-6 animate-fade-in">
            <h2 className="text-lg font-semibold mb-4">How It Works</h2>
            <p className="text-muted-foreground mb-4">
              Mindful uses on-device processing for most tasks, ensuring your data remains private. Advanced features may require internet access, but all data handling is transparent and privacy-focused.
            </p>
            
            <h3 className="font-medium mb-2">Getting Started</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4">
              <li>Tap the microphone button or say your wake word</li>
              <li>Speak your command or question clearly</li>
              <li>Mindful will respond and take action as needed</li>
              <li>Customize your experience in the Settings</li>
            </ol>
            
            <p className="text-xs text-muted-foreground">
              This is a demonstration prototype. A full implementation would include device integration via Android APIs and deeper OS functionality.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
