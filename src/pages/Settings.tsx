
import { useState } from "react";
import { NavBar } from "@/components/assistant/NavBar";
import { Moon, Sun, VolumeX, Volume2, Mic, MicOff, SlidersHorizontal } from "lucide-react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [volume, setVolume] = useState(75);
  const [voiceActivation, setVoiceActivation] = useState(true);
  
  return (
    <div className="assistant-container dark assistant-gradient">
      <NavBar className="bg-background/30 backdrop-blur-sm" />
      
      <main className="flex-1 p-4">
        <div className="max-w-md mx-auto">
          <div className="assistant-card p-6 animate-fade-in">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            
            {/* Appearance */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" />
                Appearance
              </h2>
              
              <div className="flex items-center justify-between bg-secondary/50 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  <span>{darkMode ? "Dark mode" : "Light mode"}</span>
                </div>
                
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={darkMode} 
                    onChange={() => setDarkMode(!darkMode)} 
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-primary/50"></div>
                  <div className="absolute left-[2px] top-[2px] bg-white w-5 h-5 rounded-full transition peer-checked:translate-x-5"></div>
                </label>
              </div>
            </div>
            
            {/* Voice */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Mic className="w-5 h-5" />
                Voice
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-secondary/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    {voiceActivation ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                    <span>Voice activation</span>
                  </div>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={voiceActivation} 
                      onChange={() => setVoiceActivation(!voiceActivation)} 
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-primary/50"></div>
                    <div className="absolute left-[2px] top-[2px] bg-white w-5 h-5 rounded-full transition peer-checked:translate-x-5"></div>
                  </label>
                </div>
                
                <div className="bg-secondary/50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      <span>Assistant volume</span>
                    </div>
                    <span className="text-sm">{volume}%</span>
                  </div>
                  
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={volume} 
                    onChange={(e) => setVolume(parseInt(e.target.value))} 
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary" 
                  />
                </div>
              </div>
            </div>
            
            {/* Wake word configuration would go here */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Wake Word</h2>
              <p className="text-muted-foreground">
                Custom wake word configuration would be available in the full implementation.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
