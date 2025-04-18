
import { Play } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface ExerciseProps {
  id: string;
  name: string;
  description: string;
  image: string;
  category: "strength" | "cardio" | "flexibility" | "balance" | "functional";
  difficulty: "beginner" | "intermediate" | "advanced";
  muscles: string[];
  equipment: string[];
  instructions: string[];
  sets?: number;
  reps?: number;
  duration?: string;
  videoUrl?: string;
  tips: string[];
}

interface ExerciseCardProps {
  exercise: ExerciseProps;
  onSelect: (exercise: ExerciseProps) => void;
}

const getDifficultyLabel = (difficulty: ExerciseProps["difficulty"]) => {
  switch (difficulty) {
    case "beginner":
      return { label: "Beginner", color: "bg-fitgreen-100 text-fitgreen-800" };
    case "intermediate":
      return { label: "Intermediate", color: "bg-fitblue-100 text-fitblue-800" };
    case "advanced":
      return { label: "Advanced", color: "bg-fitorange-100 text-fitorange-800" };
  }
};

const getCategoryLabel = (category: ExerciseProps["category"]) => {
  switch (category) {
    case "strength":
      return { label: "Strength", color: "bg-indigo-100 text-indigo-800" };
    case "cardio":
      return { label: "Cardio", color: "bg-red-100 text-red-800" };
    case "flexibility":
      return { label: "Flexibility", color: "bg-blue-100 text-blue-800" };
    case "balance":
      return { label: "Balance", color: "bg-purple-100 text-purple-800" };
    case "functional":
      return { label: "Functional", color: "bg-emerald-100 text-emerald-800" };
  }
};

const ExerciseCard = ({ exercise, onSelect }: ExerciseCardProps) => {
  const difficulty = getDifficultyLabel(exercise.difficulty);
  const category = getCategoryLabel(exercise.category);
  
  return (
    <Card className="h-full card-hover">
      <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
        <img 
          src={exercise.image} 
          alt={exercise.name} 
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {exercise.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/70 backdrop-blur">
              <Play className="h-5 w-5 text-foreground" />
            </div>
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-2 flex flex-wrap gap-1">
              <Badge variant="outline" className={`${difficulty.color}`}>{difficulty.label}</Badge>
              <Badge variant="outline" className={`${category.color}`}>{category.label}</Badge>
            </div>
            <CardTitle className="line-clamp-1">{exercise.name}</CardTitle>
          </div>
        </div>
        <CardDescription className="line-clamp-2">{exercise.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <h4 className="mb-1 text-sm font-medium">Muscles Targeted:</h4>
            <div className="flex flex-wrap gap-1">
              {exercise.muscles.map((muscle, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {muscle}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="mb-1 text-sm font-medium">Equipment Needed:</h4>
            <div className="flex flex-wrap gap-1">
              {exercise.equipment.map((item, index) => (
                <Badge key={index} variant="outline" className="text-xs text-muted-foreground">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
          
          {(exercise.sets && exercise.reps) && (
            <div className="rounded-md bg-muted p-2 text-center text-sm">
              <span className="font-medium">{exercise.sets} sets</span> × <span className="font-medium">{exercise.reps} reps</span>
            </div>
          )}
          
          {exercise.duration && (
            <div className="rounded-md bg-muted p-2 text-center text-sm">
              <span className="font-medium">Duration: {exercise.duration}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onSelect(exercise)} className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExerciseCard;
