// Add the missing getCategoryLabel function at the top of the file
const getCategoryLabel = (category: string) => {
  switch (category) {
    case "weight-loss":
      return { label: "Weight Loss", color: "text-green-500" };
    case "muscle-gain":
      return { label: "Muscle Gain", color: "text-blue-500" };
    case "maintenance":
      return { label: "Maintenance", color: "text-yellow-500" };
    case "vegetarian":
      return { label: "Vegetarian", color: "text-purple-500" };
    case "vegan":
      return { label: "Vegan", color: "text-pink-500" };
    default:
      return { label: category, color: "text-gray-500" };
  }
};

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter, X, Check } from "lucide-react";
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

// Sample diet plan data
const dietPlans = [
  {
    id: "1",
    name: "Balanced Weight Loss Plan",
    description: "A diet plan designed to help you lose weight in a healthy and sustainable way.",
    image: "https://www.eatingwell.com/thmb/V1xhHlrulrc7ZmIZhxdfufsT7w4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/EW-Crunchy-Berry-Bowl-hero-1x1-2163_preview_maxWidth_4000_maxHeight_4000_ppi_300_quality_100-b4e44c8959184e899512eceac93232f3.jpg",
    category: "weight-loss",
    duration: "4 weeks",
    calories: "1500-1800",
    protein: "30%",
    carbs: "40%",
    fat: "30%",
    mealPlan: [
      {
        meal: "Breakfast",
        description: "Oatmeal with berries and nuts"
      },
      {
        meal: "Lunch",
        description: "Grilled chicken salad with mixed greens"
      },
      {
        meal: "Dinner",
        description: "Baked salmon with roasted vegetables"
      },
      {
        meal: "Snacks",
        description: "Apple slices with almond butter, Greek yogurt with fruit"
      }
    ],
    tips: [
      "Drink plenty of water throughout the day",
      "Get enough sleep to support your metabolism",
      "Incorporate regular exercise into your routine",
      "Avoid processed foods and sugary drinks"
    ]
  },
  {
    id: "2",
    name: "High-Protein Muscle Gain Plan",
    description: "A diet plan focused on building lean muscle mass with a high protein intake.",
    image: "https://t3.ftcdn.net/jpg/08/43/98/74/360_F_843987425_br83dnrQq8eOzvuOE10PNfdeg8TVvznf.jpg",
    category: "muscle-gain",
    duration: "4 weeks",
    calories: "2500-3000",
    protein: "40%",
    carbs: "30%",
    fat: "30%",
    mealPlan: [
      {
        meal: "Breakfast",
        description: "Protein smoothie with spinach, banana, and protein powder"
      },
      {
        meal: "Lunch",
        description: "Lean beef with brown rice and steamed broccoli"
      },
      {
        meal: "Dinner",
        description: "Grilled chicken breast with sweet potato and green beans"
      },
      {
        meal: "Snacks",
        description: "Hard-boiled eggs, cottage cheese, protein bar"
      }
    ],
    tips: [
      "Eat every 2-3 hours to keep your metabolism high",
      "Focus on compound exercises to build muscle",
      "Ensure you're getting enough rest for muscle recovery",
      "Track your progress and adjust your intake as needed"
    ]
  },
  {
    id: "3",
    name: "Healthy Maintenance Plan",
    description: "A balanced diet plan to maintain your current weight and support overall health.",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    category: "maintenance",
    duration: "Ongoing",
    calories: "2000-2500",
    protein: "25%",
    carbs: "45%",
    fat: "30%",
    mealPlan: [
      {
        meal: "Breakfast",
        description: "Whole grain toast with avocado and egg"
      },
      {
        meal: "Lunch",
        description: "Quinoa salad with chickpeas, cucumber, and tomatoes"
      },
      {
        meal: "Dinner",
        description: "Lentil soup with a side of whole grain bread"
      },
      {
        meal: "Snacks",
        description: "Mixed nuts, fruit, yogurt"
      }
    ],
    tips: [
      "Eat a variety of foods to ensure you're getting all the nutrients you need",
      "Listen to your body's hunger cues",
      "Stay active to maintain a healthy weight",
      "Limit your intake of processed foods and added sugars"
    ]
  },
  {
    id: "4",
    name: "Vegetarian Diet Plan",
    description: "A plant-based diet plan that excludes meat, poultry, and fish.",
    image: "https://www.privatedoc.com/img/wl-skip-meals.jpg",
    category: "vegetarian",
    duration: "Ongoing",
    calories: "1800-2200",
    protein: "20%",
    carbs: "50%",
    fat: "30%",
    mealPlan: [
      {
        meal: "Breakfast",
        description: "Tofu scramble with spinach and whole wheat toast"
      },
      {
        meal: "Lunch",
        description: "Black bean burgers on whole grain buns with a side salad"
      },
      {
        meal: "Dinner",
        description: "Vegetable curry with brown rice"
      },
      {
        meal: "Snacks",
        description: "Edamame, hummus with vegetables, fruit"
      }
    ],
    tips: [
      "Ensure you're getting enough protein from plant-based sources",
      "Include a variety of vegetables, fruits, and whole grains in your diet",
      "Consider supplementing with vitamin B12",
      "Read labels carefully to avoid hidden animal products"
    ]
  },
  {
    id: "5",
    name: "Vegan Diet Plan",
    description: "A plant-based diet plan that excludes all animal products, including meat, dairy, and eggs.",
    image: "https://runningonrealfood.com/wp-content/uploads/2018/09/vegan-coconut-yogurt-chia-pudding-running-on-real-food-2.jpg",
    category: "vegan",
    duration: "Ongoing",
    calories: "1800-2200",
    protein: "20%",
    carbs: "50%",
    fat: "30%",
    mealPlan: [
      {
        meal: "Breakfast",
        description: "Chia seed pudding with berries and almond milk"
      },
      {
        meal: "Lunch",
        description: "Lentil soup with a side of whole grain bread"
      },
      {
        meal: "Dinner",
        description: "Tofu stir-fry with mixed vegetables and brown rice"
      },
      {
        meal: "Snacks",
        description: "Trail mix, avocado toast, fruit"
      }
    ],
    tips: [
      "Ensure you're getting enough vitamin B12, iron, and omega-3 fatty acids",
      "Include a variety of plant-based foods in your diet",
      "Read labels carefully to avoid hidden animal products",
      "Consider consulting with a registered dietitian to ensure you're meeting your nutritional needs"
    ]
  },
];

const DietPlans = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const filteredPlans = dietPlans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || plan.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handleAddToDashboard = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login or register to save this diet plan to your dashboard.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would call an API to save the diet plan to the user's profile
    toast({
      title: "Diet plan added to dashboard",
      description: `${selectedPlan.name} has been added to your dashboard.`,
    });

    setSelectedPlan(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container max-w-screen-xl py-8 px-4 md:py-12 md:px-6">
          <div className="mx-auto max-w-5xl space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold leading-tight md:text-4xl">Diet Plans</h1>
              <p className="mt-3 text-muted-foreground">
                Browse our collection of diet plans for various needs
              </p>
            </div>

            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search diet plans..."
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
                    <TabsTrigger value="weight-loss">Weight Loss</TabsTrigger>
                    <TabsTrigger value="muscle-gain">Muscle Gain</TabsTrigger>
                    <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                    <TabsTrigger value="vegetarian">Vegetarian</TabsTrigger>
                    <TabsTrigger value="vegan">Vegan</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {searchTerm && (
              <div className="flex items-center justify-between rounded-lg bg-muted p-2">
                <span className="text-sm">
                  {filteredPlans.length} {filteredPlans.length === 1 ? "result" : "results"} for "{searchTerm}"
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
              {filteredPlans.length > 0 ? (
                filteredPlans.map((plan) => (
                  <div key={plan.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="relative aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={plan.image}
                        alt={plan.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="text-lg font-semibold">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className={`${getCategoryLabel(plan.category).color}`}>
                          {getCategoryLabel(plan.category).label}
                        </Badge>
                      </div>
                      <Button variant="secondary" size="sm" onClick={() => handleSelectPlan(plan)}>
                        View Details
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <h3 className="mb-2 text-xl font-medium">No diet plans found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters to find what you're looking for
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Diet Plan Detail Dialog */}
          <Dialog open={!!selectedPlan} onOpenChange={(open) => !open && setSelectedPlan(null)}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
              {selectedPlan && (
                <>
                  <DialogHeader>
                    <div className="flex items-start justify-between">
                      <DialogTitle>{selectedPlan.name}</DialogTitle>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className={`${getCategoryLabel(selectedPlan.category).color}`}>
                          {getCategoryLabel(selectedPlan.category).label}
                        </Badge>
                      </div>
                    </div>
                    <DialogDescription>{selectedPlan.description}</DialogDescription>
                  </DialogHeader>

                  <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    <img
                      src={selectedPlan.image}
                      alt={selectedPlan.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-lg bg-muted p-3 text-center">
                      <p className="text-lg font-medium">
                        Duration: {selectedPlan.duration}
                      </p>
                      <p className="text-lg font-medium">
                        Calories: {selectedPlan.calories}
                      </p>
                      <p className="text-lg font-medium">
                        Protein: {selectedPlan.protein}, Carbs: {selectedPlan.carbs}, Fat: {selectedPlan.fat}
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-2 font-medium">Meal Plan</h4>
                      <ul className="list-inside list-disc space-y-2">
                        {selectedPlan.mealPlan.map((meal, index) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            <span className="font-medium">{meal.meal}:</span> {meal.description}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-2 font-medium">Tips</h4>
                      <ul className="space-y-2">
                        {selectedPlan?.tips.map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                            <span className="text-sm text-muted-foreground">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setSelectedPlan(null)}>
                      Close
                    </Button>
                    <Button onClick={handleAddToDashboard}>
                      {isAuthenticated ? "Add to Dashboard" : "Log in to Save"}
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

export default DietPlans;
