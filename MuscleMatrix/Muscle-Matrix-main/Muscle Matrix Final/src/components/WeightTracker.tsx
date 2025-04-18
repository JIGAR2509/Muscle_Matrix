
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";

interface WeightEntry {
  date: string;
  weight: number;
}

const WeightTracker = () => {
  const [weight, setWeight] = useState<string>("");
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([]);
  const { toast } = useToast();

  const handleAddWeight = () => {
    // Convert string to number for the weight value
    const weightValue = parseFloat(weight);
    
    // Validate input
    if (isNaN(weightValue) || weightValue <= 0) {
      toast({
        title: "Invalid weight",
        description: "Please enter a valid weight value",
        variant: "destructive",
      });
      return;
    }

    const newEntry: WeightEntry = {
      date: new Date().toISOString().split('T')[0],
      weight: weightValue,
    };

    setWeightEntries([...weightEntries, newEntry]);
    setWeight("");
    
    toast({
      title: "Weight recorded",
      description: "Your weight has been successfully recorded",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weight Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-end gap-2">
          <div className="flex-1">
            <Input
              type="number"
              placeholder="Enter weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <Button onClick={handleAddWeight}>Add</Button>
        </div>
        
        {weightEntries.length > 0 ? (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightEntries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            No weight entries yet. Start tracking your progress!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeightTracker;
