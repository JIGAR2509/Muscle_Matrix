
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dumbbell, Salad, Heart } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-background py-12 md:py-16 lg:py-20">
      {/* Background gradient element */}
      <div className="absolute -top-24 -left-24 h-[500px] w-[500px] rounded-full bg-fitblue-100/30 blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 h-[500px] w-[500px] rounded-full bg-fitgreen-100/30 blur-3xl"></div>
      
      <div className="container relative px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Transform Your Body, <span className="gradient-heading">Transform Your Life</span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Personalized workout plans, diet recommendations, and progress tracking all in one place.
              </p>
            </div>
            
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Link to="/register">
                <Button size="lg" className="w-full min-[400px]:w-auto">Get Started</Button>
              </Link>
              <Link to="/bmi-calculator">
                <Button variant="outline" size="lg" className="w-full min-[400px]:w-auto">
                  Calculate BMI
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-fitblue-100">
                  <Dumbbell className="h-5 w-5 text-fitblue-600" />
                </div>
                <p className="text-sm font-medium">Customized Workout Plans</p>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-fitgreen-100">
                  <Salad className="h-5 w-5 text-fitgreen-600" />
                </div>
                <p className="text-sm font-medium">Personalized Diet Plans</p>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-fitorange-100">
                  <Heart className="h-5 w-5 text-fitorange-600" />
                </div>
                <p className="text-sm font-medium">Progress Tracking</p>
              </div>
            </div>
          </div>
          
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative h-[400px] w-full max-w-[500px] overflow-hidden rounded-lg bg-gradient-to-br from-fitblue-100 to-fitgreen-100 shadow-lg">
              <img 
                src="https://t3.ftcdn.net/jpg/02/75/74/82/360_F_275748265_EidGmJFkafvvvFxFKpI0NL7SpRo4tskx.jpg" 
                alt="Person working out with a fitness tracker" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
