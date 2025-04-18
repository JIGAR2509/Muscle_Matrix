
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Dumbbell, Salad, Weight, Activity, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features Section */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything You Need For Your Fitness Journey</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our comprehensive suite of tools to help you achieve your health and fitness goals
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <Dumbbell className="h-10 w-10 text-fitblue-500" />
                  <CardTitle className="mt-4">Personalized Workouts</CardTitle>
                  <CardDescription>
                    Access a library of exercises tailored to your fitness level, goals, and available equipment.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {["Targeted muscle groups", "Video demonstrations", "Step-by-step instructions", "Difficulty levels"].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="mr-2 h-5 w-5 text-fitgreen-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/exercises" className="w-full">
                    <Button className="w-full">
                      Explore Exercises
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <Salad className="h-10 w-10 text-fitgreen-500" />
                  <CardTitle className="mt-4">Diet Plans</CardTitle>
                  <CardDescription>
                    Discover nutrition plans designed to complement your workouts and help you reach your goals.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {["Weight loss plans", "Muscle building diets", "Balanced nutrition", "Meal suggestions"].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="mr-2 h-5 w-5 text-fitgreen-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/diet-plans" className="w-full">
                    <Button className="w-full">
                      View Diet Plans
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <Activity className="h-10 w-10 text-fitorange-500" />
                  <CardTitle className="mt-4">Progress Tracking</CardTitle>
                  <CardDescription>
                    Monitor your fitness journey with comprehensive tracking tools and visual insights.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {["Weight tracking", "Workout history", "Body measurements", "Achievement milestones"].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="mr-2 h-5 w-5 text-fitgreen-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/dashboard" className="w-full">
                    <Button className="w-full">
                      Track Progress
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        
        {/* BMI Calculator Section */}
        <section className="bg-muted py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
              <div className="flex flex-col justify-center space-y-4">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Know Where You Stand with Our BMI Calculator
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                    Understanding your body mass index (BMI) is the first step in setting realistic fitness goals and tracking your progress.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-fitblue-100">
                      <CheckCircle2 className="h-3 w-3 text-fitblue-600" />
                    </div>
                    <p className="text-muted-foreground">
                      Quick and easy BMI calculation
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-fitblue-100">
                      <CheckCircle2 className="h-3 w-3 text-fitblue-600" />
                    </div>
                    <p className="text-muted-foreground">
                      Understand what your BMI means for your health
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-fitblue-100">
                      <CheckCircle2 className="h-3 w-3 text-fitblue-600" />
                    </div>
                    <p className="text-muted-foreground">
                      Get personalized recommendations based on your results
                    </p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Link to="/bmi-calculator">
                    <Button size="lg">
                      Calculate Your BMI
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="relative flex items-center justify-center lg:justify-end">
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1554344728-77cf90d9ed26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Person measuring BMI" 
                    className="h-full w-full object-cover"
                    style={{ maxHeight: "400px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Users Say</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Stories from people who have transformed their fitness journey with FitLife Hub
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Sarah J.",
                  role: "Lost 15kg with our weight loss plan",
                  content: "FitLife Hub helped me track my progress and stay motivated. The weight loss meal plans were easy to follow and I could adapt them to my preferences.",
                  avatar: "https://randomuser.me/api/portraits/women/32.jpg"
                },
                {
                  name: "Michael T.",
                  role: "Gained muscle mass with strength training",
                  content: "The exercise library has everything I need for my muscle-building journey. I've been able to create a routine that works around my busy schedule.",
                  avatar: "https://randomuser.me/api/portraits/men/17.jpg"
                },
                {
                  name: "Elena K.",
                  role: "Maintained healthy lifestyle for 6+ months",
                  content: "The BMI calculator opened my eyes to where I stood health-wise. The dashboard keeps me accountable and I love seeing my progress over time.",
                  avatar: "https://randomuser.me/api/portraits/women/68.jpg"
                }
              ].map((testimonial, index) => (
                <div key={index} className="rounded-lg border p-6 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <blockquote className="mt-4 border-l-2 pl-4">
                    <p className="text-muted-foreground">{testimonial.content}</p>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-fitblue-600 py-12 text-white md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Start Your Fitness Journey Today
                </h2>
                <p className="mx-auto max-w-3xl text-lg text-white/80">
                  Join thousands of others who have transformed their lives with personalized workout plans, diet recommendations, and progress tracking.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/register">
                  <Button size="lg" variant="secondary" className="w-full min-[400px]:w-auto">
                    Create Free Account
                  </Button>
                </Link>
                <Link to="/bmi-calculator">
                  <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto border-white text-white hover:bg-white hover:text-fitblue-600">
                    Try BMI Calculator
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
