
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary mb-4">
          <AlertCircle className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-3">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Ops! Página não encontrada
        </p>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <a href="/">Voltar para a Página Inicial</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
