
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-wedding-cream/30">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-wedding-deep-purple">404</h1>
          <p className="text-xl text-gray-600 mt-2">Page not found</p>
        </div>
        <p className="text-gray-500 mb-6">
          We couldn't find the page you were looking for at {location.pathname}
        </p>
        <Button 
          className="gold-button"
          asChild
        >
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            <span>Return to Home</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
