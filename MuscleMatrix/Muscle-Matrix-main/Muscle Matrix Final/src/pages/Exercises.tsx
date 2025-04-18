import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter, X, Play, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExerciseCard, { ExerciseProps } from "@/components/ExerciseCard";

const getDifficultyLabel = (difficulty: string) => {
  switch (difficulty) {
    case "beginner":
      return { label: "Beginner", color: "text-green-500" };
    case "intermediate":
      return { label: "Intermediate", color: "text-yellow-500" };
    case "advanced":
      return { label: "Advanced", color: "text-red-500" };
    default:
      return { label: difficulty, color: "text-gray-500" };
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case "strength":
      return { label: "Strength", color: "text-blue-500" };
    case "cardio":
      return { label: "Cardio", color: "text-red-500" };
    case "flexibility":
      return { label: "Flexibility", color: "text-purple-500" };
    case "functional":
      return { label: "Functional", color: "text-orange-500" };
    default:
      return { label: category, color: "text-gray-500" };
  }
};

const exercises: ExerciseProps[] = [
  {
    id: "1",
    name: "Barbell Squat",
    description: "A compound exercise that primarily targets the quadriceps, hamstrings, and glutes.",
    image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1331&q=80",
    category: "strength",
    difficulty: "intermediate",
    muscles: ["Quadriceps", "Hamstrings", "Glutes", "Core"],
    equipment: ["Barbell", "Squat Rack"],
    instructions: [
      "Set up a barbell on a squat rack at approximately shoulder height.",
      "Step under the bar and position it across your upper back, squeezing your shoulder blades together to create a shelf.",
      "Grip the bar with hands wider than shoulder-width apart.",
      "Lift the bar off the rack by extending your legs and step back into position with feet shoulder-width apart.",
      "Keeping your chest up and core tight, bend at the knees and hips to lower your body until thighs are parallel to the ground or slightly lower.",
      "Drive through your heels to return to the starting position."
    ],
    sets: 3,
    reps: 8,
    videoUrl: "https://example.com/squat_video",
    tips: [
      "Keep your knees in line with your toes",
      "Maintain a neutral spine throughout the movement",
      "Breathe in as you descend and out as you ascend",
      "Focus on pushing through your heels"
    ]
  },
  {
    id: "2",
    name: "Push-Up",
    description: "A bodyweight exercise that works the chest, shoulders, triceps, and core muscles.",
    image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
    category: "strength",
    difficulty: "beginner",
    muscles: ["Chest", "Shoulders", "Triceps", "Core"],
    equipment: ["None"],
    instructions: [
      "Start in a plank position with hands slightly wider than shoulder-width apart.",
      "Keep your body in a straight line from head to heels.",
      "Lower your body until your chest nearly touches the floor.",
      "Pause, then push yourself back up to the starting position."
    ],
    sets: 3,
    reps: 12,
    tips: [
      "Keep your core engaged throughout the movement",
      "Don't let your hips sag or pike up",
      "For easier variation, perform on knees",
      "For more difficulty, elevate your feet"
    ]
  },
  {
    id: "3",
    name: "High-Intensity Interval Training (HIIT)",
    description: "A workout strategy alternating between intense bursts of activity and fixed periods of less-intense activity or rest.",
    image: "https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "cardio",
    difficulty: "intermediate",
    muscles: ["Full Body", "Cardiovascular System"],
    equipment: ["Timer", "Optional: Jump Rope, Kettlebell"],
    instructions: [
      "Choose 4-6 exercises (jumping jacks, mountain climbers, burpees, high knees).",
      "Perform each exercise at maximum effort for 30-45 seconds.",
      "Rest for 15-30 seconds between exercises.",
      "Complete the circuit 3-4 times with a 1-minute rest between rounds."
    ],
    duration: "20-30 minutes",
    tips: [
      "Focus on form even when fatigued",
      "Adjust work/rest intervals based on fitness level",
      "Stay hydrated throughout the workout",
      "Scale movements to your ability level"
    ]
  },
  {
    id: "4",
    name: "Downward-Facing Dog",
    description: "A yoga pose that stretches and strengthens the entire body, especially the shoulders, hamstrings, calves, and feet.",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "flexibility",
    difficulty: "beginner",
    muscles: ["Shoulders", "Hamstrings", "Calves", "Back"],
    equipment: ["Yoga Mat"],
    instructions: [
      "Start on your hands and knees with hands slightly in front of shoulders.",
      "Tuck your toes and lift your knees off the floor, straightening your legs as much as possible.",
      "Press through your palms and lift your hips toward the ceiling, forming an inverted V-shape.",
      "Keep your head between your arms and relax your neck.",
      "Hold for 5-10 breaths, focusing on pressing your heels toward the floor."
    ],
    duration: "30-60 seconds",
    tips: [
      "Bend your knees if your hamstrings are tight",
      "Spread your fingers wide for better support",
      "Keep your shoulders away from your ears",
      "Focus on creating length in your spine"
    ]
  },
  {
    id: "5",
    name: "Deadlift",
    description: "A compound exercise that strengthens the posterior chain, including the lower back, glutes, and hamstrings.",
    image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "strength",
    difficulty: "advanced",
    muscles: ["Lower Back", "Glutes", "Hamstrings", "Traps", "Forearms"],
    equipment: ["Barbell", "Weight Plates"],
    instructions: [
      "Stand with feet hip-width apart, barbell over mid-foot.",
      "Bend at the hips and knees to grip the bar with hands shoulder-width apart.",
      "Lower your hips with chest up and back flat.",
      "Drive through your heels, keeping the bar close to your body as you stand up.",
      "Fully extend your hips and knees at the top.",
      "Return the weight to the floor by hinging at the hips and bending the knees."
    ],
    sets: 3,
    reps: 5,
    videoUrl: "https://example.com/deadlift_video",
    tips: [
      "Keep the bar close to your body throughout the movement",
      "Maintain a neutral spine - avoid rounding or excessive arching",
      "Focus on hip hinge movement rather than squatting the weight up",
      "Use proper breathing: inhale before lifting, exhale at the top"
    ]
  },
  {
    id: "6",
    name: "Plank",
    description: "An isometric core exercise that builds strength in the abdominals, back, and shoulders.",
    image: "https://hips.hearstapps.com/hmg-prod/images/hdm119918mh15842-1545237096.png?crop=1xw:0.84375xh;center,top&resize=1200:*",
    category: "functional",
    difficulty: "beginner",
    muscles: ["Core", "Shoulders", "Back", "Glutes"],
    equipment: ["None"],
    instructions: [
      "Start in a push-up position, but with forearms on the ground.",
      "Elbows should be directly under your shoulders.",
      "Form a straight line from head to heels, engaging your core.",
      "Hold this position while breathing normally."
    ],
    duration: "30-60 seconds",
    tips: [
      "Don't let your hips sag or pike up",
      "Engage your glutes and quads for better stability",
      "Keep breathing normally throughout the hold",
      "Gaze at the floor slightly in front of you to maintain neutral neck position"
    ]
  },
];

const Exercises = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeDifficulty, setActiveDifficulty] = useState<string>("all");
  const [selectedExercise, setSelectedExercise] = useState<ExerciseProps | null>(null);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          exercise.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          exercise.muscles.some(muscle => muscle.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeCategory === "all" || exercise.category === activeCategory;
    
    const matchesDifficulty = activeDifficulty === "all" || exercise.difficulty === activeDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleSelectExercise = (exercise: ExerciseProps) => {
    setSelectedExercise(exercise);
  };

  const handleAddToDashboard = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login or register to save this exercise to your dashboard.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Exercise added to dashboard",
      description: `${selectedExercise?.name} has been added to your workout plan.`,
    });
    
    setSelectedExercise(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container max-w-screen-xl py-8 px-4 md:py-12 md:px-6">
          <div className="mx-auto max-w-5xl space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold leading-tight md:text-4xl">Exercise Library</h1>
              <p className="mt-3 text-muted-foreground">
                Browse our collection of exercises for all fitness levels
              </p>
            </div>
            
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search exercises..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center">
                  <Filter className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filters:</span>
                </div>
                
                <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full sm:w-auto">
                  <TabsList>
                    <TabsTrigger value="all">All Types</TabsTrigger>
                    <TabsTrigger value="strength">Strength</TabsTrigger>
                    <TabsTrigger value="cardio">Cardio</TabsTrigger>
                    <TabsTrigger value="flexibility">Flexibility</TabsTrigger>
                    <TabsTrigger value="functional">Functional</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <Tabs value={activeDifficulty} onValueChange={setActiveDifficulty} className="w-full sm:w-auto">
                  <TabsList>
                    <TabsTrigger value="all">All Levels</TabsTrigger>
                    <TabsTrigger value="beginner">Beginner</TabsTrigger>
                    <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            {searchTerm && (
              <div className="flex items-center justify-between rounded-lg bg-muted p-2">
                <span className="text-sm">
                  {filteredExercises.length} {filteredExercises.length === 1 ? "result" : "results"} for "{searchTerm}"
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchTerm("")}
                  className="h-8 px-2"
                >
                  <X className="mr-1 h-4 w-4" />
                  Clear
                </Button>
              </div>
            )}
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredExercises.length > 0 ? (
                filteredExercises.map((exercise) => (
                  <ExerciseCard 
                    key={exercise.id} 
                    exercise={exercise}
                    onSelect={handleSelectExercise}
                  />
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <h3 className="mb-2 text-xl font-medium">No exercises found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters to find what you're looking for
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <Dialog open={!!selectedExercise} onOpenChange={(open) => !open && setSelectedExercise(null)}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
              {selectedExercise && (
                <>
                  <DialogHeader>
                    <div className="flex items-start justify-between">
                      <DialogTitle>{selectedExercise.name}</DialogTitle>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className={`${getDifficultyLabel(selectedExercise.difficulty).color}`}>
                          {getDifficultyLabel(selectedExercise.difficulty).label}
                        </Badge>
                        <Badge variant="outline" className={`${getCategoryLabel(selectedExercise.category).color}`}>
                          {getCategoryLabel(selectedExercise.category).label}
                        </Badge>
                      </div>
                    </div>
                    <DialogDescription>{selectedExercise.description}</DialogDescription>
                  </DialogHeader>
                  
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    <img 
                      src={selectedExercise.image} 
                      alt={selectedExercise.name} 
                      className="h-full w-full object-cover"
                    />
                    {selectedExercise.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <a 
                          href={selectedExercise.videoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex h-16 w-16 items-center justify-center rounded-full bg-white/70 backdrop-blur transition-transform hover:scale-110"
                        >
                          <Play className="h-6 w-6 text-foreground" />
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <div className="flex-1 rounded-lg border p-3">
                        <h4 className="mb-1 text-sm font-medium">Muscles Targeted</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedExercise.muscles.map((muscle, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {muscle}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex-1 rounded-lg border p-3">
                        <h4 className="mb-1 text-sm font-medium">Equipment Needed</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedExercise.equipment.map((item, index) => (
                            <Badge key={index} variant="outline" className="text-xs text-muted-foreground">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {(selectedExercise.sets && selectedExercise.reps) && (
                      <div className="rounded-lg bg-muted p-3 text-center">
                        <p className="text-lg font-medium">
                          {selectedExercise.sets} sets × {selectedExercise.reps} reps
                        </p>
                      </div>
                    )}
                    
                    {selectedExercise.duration && (
                      <div className="rounded-lg bg-muted p-3 text-center">
                        <p className="text-lg font-medium">
                          Duration: {selectedExercise.duration}
                        </p>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="mb-2 font-medium">Instructions</h4>
                      <ol className="list-inside list-decimal space-y-2">
                        {selectedExercise.instructions.map((instruction, index) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            <span>{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    <div>
                      <h4 className="mb-2 font-medium">Tips</h4>
                      <ul className="space-y-2">
                        {selectedExercise.tips.map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                            <span className="text-sm text-muted-foreground">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setSelectedExercise(null)}>
                      Close
                    </Button>
                    <Button onClick={handleAddToDashboard}>
                      {isAuthenticated ? "Add to Workout Plan" : "Log in to Save"}
                    </Button>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Exercises;
