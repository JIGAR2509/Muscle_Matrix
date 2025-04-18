
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Dumbbell, Salad, Weight, ArrowRight, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WeightTracker from "@/components/WeightTracker";

// Mock Progress Data
const progressData = {
  streakDays: 12,
  workoutsCompleted: 24,
  minutesExercised: 840,
  caloriesBurned: 4200,
};

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-8 px-4 md:py-12 md:px-6">
        <div className="container max-w-screen-xl">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
              <p className="text-muted-foreground">
                Track your progress, view your plans, and manage your fitness journey
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
          
          {/* Dashboard Overview Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Streak</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{progressData.streakDays} days</div>
                <p className="text-xs text-muted-foreground">Keep it going!</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Workouts</CardTitle>
                <Dumbbell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{progressData.workoutsCompleted}</div>
                <p className="text-xs text-muted-foreground">Total workouts completed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Minutes</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{progressData.minutesExercised}</div>
                <p className="text-xs text-muted-foreground">Total minutes exercised</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Calories Burned</CardTitle>
                <Weight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{progressData.caloriesBurned}</div>
                <p className="text-xs text-muted-foreground">Total calories burned</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="overview" className="mt-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="workout-plans">Workout Plans</TabsTrigger>
              <TabsTrigger value="diet-plans">Diet Plans</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Today's Plan */}
                <Card className="col-span-full lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Today's Plan</CardTitle>
                    <CardDescription>Your scheduled activities for today</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-fitblue-100">
                            <Dumbbell className="h-5 w-5 text-fitblue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Upper Body Strength</p>
                            <p className="text-sm text-muted-foreground">45 minutes · 5 exercises</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="h-8">
                          Start
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-fitgreen-100">
                            <Salad className="h-5 w-5 text-fitgreen-600" />
                          </div>
                          <div>
                            <p className="font-medium">High Protein Meal Plan</p>
                            <p className="text-sm text-muted-foreground">1800 calories · 5 meals</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="h-8">
                          View
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-center pt-2">
                      <Button variant="link">View Full Schedule</Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* BMI Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your BMI</CardTitle>
                    <CardDescription>Body Mass Index</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg bg-muted p-4 text-center">
                      <p className="text-sm font-medium text-muted-foreground">Current BMI</p>
                      <h3 className="mt-2 text-4xl font-bold">23.5</h3>
                      <p className="mt-1 font-medium text-fitgreen-500">
                        Normal weight
                      </p>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => navigate("/bmi-calculator")}>
                      Recalculate BMI
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              {/* Weight Tracker */}
              <WeightTracker />
            </TabsContent>
            
            {/* Workout Plans Tab */}
            <TabsContent value="workout-plans" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Your Workout Plans</h2>
                  <p className="text-muted-foreground">Manage and track your exercise routines</p>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="current">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter plans" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current Plans</SelectItem>
                      <SelectItem value="completed">Completed Plans</SelectItem>
                      <SelectItem value="all">All Plans</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={() => navigate("/exercises")}>
                    Browse Exercises
                  </Button>
                </div>
              </div>
              
              <Card>
                <CardContent className="p-6">
                  <div className="rounded-lg border p-4 text-center">
                    <Dumbbell className="mx-auto h-8 w-8 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium">No workout plans yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Start by browsing our exercise library and adding exercises to your plan
                    </p>
                    <Button className="mt-4" onClick={() => navigate("/exercises")}>
                      Browse Exercises
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Diet Plans Tab */}
            <TabsContent value="diet-plans" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Your Diet Plans</h2>
                  <p className="text-muted-foreground">Manage and track your meal plans</p>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="current">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter plans" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current Plans</SelectItem>
                      <SelectItem value="past">Past Plans</SelectItem>
                      <SelectItem value="all">All Plans</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={() => navigate("/diet-plans")}>
                    Browse Diet Plans
                  </Button>
                </div>
              </div>
              
              <Card>
                <CardContent className="p-6">
                  <div className="rounded-lg border p-4 text-center">
                    <Salad className="mx-auto h-8 w-8 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium">No diet plans yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Start by browsing our diet plans and adding one to your dashboard
                    </p>
                    <Button className="mt-4" onClick={() => navigate("/diet-plans")}>
                      Browse Diet Plans
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Progress Tab */}
            <TabsContent value="progress" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Your Progress</h2>
                  <p className="text-muted-foreground">Track your fitness journey over time</p>
                </div>
                <Select defaultValue="30days">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 90 days</SelectItem>
                    <SelectItem value="alltime">All time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <WeightTracker />
              
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Workout Consistency</CardTitle>
                    <CardDescription>Your weekly workout frequency</CardDescription>
                  </CardHeader>
                  <CardContent className="h-72 w-full">
                    <div className="flex h-full items-center justify-center">
                      <p className="text-muted-foreground">
                        Complete more workouts to see your consistency data
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Nutritional Intake</CardTitle>
                    <CardDescription>Your average daily nutrients</CardDescription>
                  </CardHeader>
                  <CardContent className="h-72 w-full">
                    <div className="flex h-full items-center justify-center">
                      <p className="text-muted-foreground">
                        Add more diet plans to see your nutritional data
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
