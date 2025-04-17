
import { Settings, Home, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface NavBarProps {
  className?: string;
}

export function NavBar({ className }: NavBarProps) {
  return (
    <nav className={cn("flex justify-between items-center px-4 py-3", className)}>
      <Link to="/" className="font-medium text-lg">
        Mindful
      </Link>
      
      <div className="flex gap-4">
        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
          <Home className="w-5 h-5" />
        </Link>
        <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
          <Info className="w-5 h-5" />
        </Link>
        <Link to="/settings" className="text-muted-foreground hover:text-foreground transition-colors">
          <Settings className="w-5 h-5" />
        </Link>
      </div>
    </nav>
  );
}
