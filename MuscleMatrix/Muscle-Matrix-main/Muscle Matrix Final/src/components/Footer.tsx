
import { Link } from "react-router-dom";
import { Dumbbell, Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link to="/" className="flex items-center gap-2">
              <Dumbbell className="h-6 w-6 text-fitblue-600" />
              <span className="text-xl font-bold">Muscle Matrix</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your all-in-one fitness companion for tracking progress, finding workout plans, and achieving your health goals.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
              </li>
              <li>
                <Link to="/bmi-calculator" className="text-muted-foreground hover:text-primary">BMI Calculator</Link>
              </li>
              <li>
                <Link to="/diet-plans" className="text-muted-foreground hover:text-primary">Diet Plans</Link>
              </li>
              <li>
                <Link to="/exercises" className="text-muted-foreground hover:text-primary">Exercises</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-primary">Log in</Link>
              </li>
              <li>
                <Link to="/register" className="text-muted-foreground hover:text-primary">Sign up</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-primary">Dashboard</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link to="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Muscle Matrix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
