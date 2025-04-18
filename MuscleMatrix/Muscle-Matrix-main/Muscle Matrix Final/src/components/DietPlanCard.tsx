
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface DietPlanProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: "weight-loss" | "weight-gain" | "maintenance" | "muscle-building";
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  benefits: string[];
  meals: {
    time: string;
    name: string;
    description: string;
  }[];
}

interface DietPlanCardProps {
  plan: DietPlanProps;
  onSelect: (plan: DietPlanProps) => void;
}

const getCategoryLabel = (category: DietPlanProps["category"]) => {
  switch (category) {
    case "weight-loss":
      return { label: "Weight Loss", color: "bg-fitorange-100 text-fitorange-800" };
    case "weight-gain":
      return { label: "Weight Gain", color: "bg-fitblue-100 text-fitblue-800" };
    case "maintenance":
      return { label: "Maintenance", color: "bg-fitgreen-100 text-fitgreen-800" };
    case "muscle-building":
      return { label: "Muscle Building", color: "bg-purple-100 text-purple-800" };
  }
};

const DietPlanCard = ({ plan, onSelect }: DietPlanCardProps) => {
  const category = getCategoryLabel(plan.category);
  
  return (
    <Card className="h-full card-hover">
      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
        <img 
          src={plan.image} 
          alt={plan.title} 
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <Badge variant="outline" className={`mb-2 ${category.color}`}>{category.label}</Badge>
            <CardTitle className="line-clamp-1">{plan.title}</CardTitle>
          </div>
        </div>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-4 gap-2 rounded-lg bg-muted p-2 text-center text-xs">
          <div>
            <p className="font-semibold">{plan.calories}</p>
            <p className="text-muted-foreground">kcal</p>
          </div>
          <div>
            <p className="font-semibold">{plan.protein}g</p>
            <p className="text-muted-foreground">Protein</p>
          </div>
          <div>
            <p className="font-semibold">{plan.carbs}g</p>
            <p className="text-muted-foreground">Carbs</p>
          </div>
          <div>
            <p className="font-semibold">{plan.fats}g</p>
            <p className="text-muted-foreground">Fats</p>
          </div>
        </div>
        
        <h4 className="mb-1 text-sm font-medium">Benefits:</h4>
        <ul className="mb-4 space-y-1">
          {plan.benefits.slice(0, 3).map((benefit, index) => (
            <li key={index} className="flex items-start text-sm">
              <Check className="mr-2 h-4 w-4 text-fitgreen-500" />
              <span className="text-muted-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
        
        <h4 className="mb-1 text-sm font-medium">Sample Meals:</h4>
        <ul className="space-y-2">
          {plan.meals.slice(0, 2).map((meal, index) => (
            <li key={index} className="text-sm">
              <span className="font-medium">{meal.time}:</span>{" "}
              <span className="text-muted-foreground">{meal.name}</span>
            </li>
          ))}
          {plan.meals.length > 2 && (
            <li className="text-xs text-muted-foreground">+ {plan.meals.length - 2} more meals</li>
          )}
        </ul>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onSelect(plan)} className="w-full">
          View Full Plan
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DietPlanCard;
