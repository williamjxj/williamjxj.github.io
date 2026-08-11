import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background bg-grid">
      <Card className="mx-4 w-full max-w-lg border border-border bg-card/80 shadow-2xl shadow-black/40 backdrop-blur">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-destructive/20 animate-pulse" />
              <AlertCircle className="relative h-16 w-16 text-destructive" />
            </div>
          </div>

          <h1 className="text-gradient mb-2 text-6xl font-extrabold">404</h1>

          <h2 className="mb-4 text-xl font-semibold text-foreground">
            Page Not Found
          </h2>

          <p className="mb-8 leading-relaxed text-muted-foreground">
            Sorry, the page you are looking for doesn't exist.
            <br />
            It may have been moved or deleted.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleGoHome}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 shadow-md transition-all duration-200 hover:shadow-lg"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
