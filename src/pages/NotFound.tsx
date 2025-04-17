
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { NavBar } from "@/components/assistant/NavBar";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="assistant-container dark assistant-gradient">
      <NavBar className="bg-background/30 backdrop-blur-sm" />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="assistant-card p-6 max-w-md w-full text-center animate-fade-in">
          <div className="mb-4 flex justify-center">
            <div className="bg-destructive/10 p-3 rounded-full">
              <AlertTriangle className="h-10 w-10 text-destructive" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">404</h1>
          <p className="text-muted-foreground mb-6">
            Sorry, the page you're looking for doesn't exist
          </p>
          
          <Link 
            to="/" 
            className="assistant-button px-6 py-2 inline-block"
          >
            Return Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
