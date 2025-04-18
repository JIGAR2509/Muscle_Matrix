
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Weight, Ruler, Info } from "lucide-react";

const formSchema = z.object({
  weight: z.coerce.number().positive({ message: "Weight must be positive" }),
  height: z.coerce.number().positive({ message: "Height must be positive" }),
  weightUnit: z.enum(["kg", "lb"]),
  heightUnit: z.enum(["cm", "in"]),
  gender: z.enum(["male", "female"]),
  age: z.coerce.number().int().positive().min(2).max(120),
});

type FormValues = z.infer<typeof formSchema>;

const calculateBMI = (values: FormValues) => {
  // Convert to metric if needed
  let weightInKg = values.weight;
  let heightInM = values.height / 100;
  
  if (values.weightUnit === "lb") {
    weightInKg = values.weight * 0.453592;
  }
  
  if (values.heightUnit === "in") {
    heightInM = values.height * 0.0254;
  }
  
  // Calculate BMI
  const bmi = weightInKg / (heightInM * heightInM);
  return parseFloat(bmi.toFixed(1));
};

const getBMICategory = (bmi: number) => {
  if (bmi < 18.5) return { category: "Underweight", description: "You are underweight. Consider a weight gain plan.", color: "text-fitorange-500" };
  if (bmi < 25) return { category: "Normal weight", description: "Your weight is in the healthy range.", color: "text-fitgreen-500" };
  if (bmi < 30) return { category: "Overweight", description: "You are overweight. Consider a weight loss plan.", color: "text-fitorange-500" };
  return { category: "Obesity", description: "You have obesity. Consider consulting a healthcare professional.", color: "text-red-500" };
};

const BMICalculatorForm = () => {
  const [bmiResult, setBmiResult] = useState<number | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: 70,
      height: 170,
      weightUnit: "kg",
      heightUnit: "cm",
      gender: "male",
      age: 30,
    },
  });

  function onSubmit(values: FormValues) {
    const bmi = calculateBMI(values);
    setBmiResult(bmi);
  }

  const bmiCategory = bmiResult ? getBMICategory(bmiResult) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Calculate Your BMI</CardTitle>
          <CardDescription>
            Enter your details to calculate your Body Mass Index
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <FormLabel htmlFor="male" className="font-normal">
                            Male
                          </FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <FormLabel htmlFor="female" className="font-normal">
                            Female
                          </FormLabel>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight</FormLabel>
                      <div className="flex items-center gap-2">
                        <Weight className="h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input type="number" step="0.1" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="weightUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="kg">Kilograms (kg)</SelectItem>
                          <SelectItem value="lb">Pounds (lb)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height</FormLabel>
                      <div className="flex items-center gap-2">
                        <Ruler className="h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input type="number" step="0.1" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="heightUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="cm">Centimeters (cm)</SelectItem>
                          <SelectItem value="in">Inches (in)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Button type="submit" className="w-full">Calculate BMI</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Your BMI Result</CardTitle>
          <CardDescription>
            Understand what your BMI means and get recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {bmiResult ? (
            <div className="space-y-6">
              <div className="rounded-lg bg-muted p-4 text-center">
                <p className="text-sm font-medium text-muted-foreground">Your BMI</p>
                <h3 className="mt-2 text-4xl font-bold">{bmiResult}</h3>
                <p className={`mt-1 font-medium ${bmiCategory?.color}`}>
                  {bmiCategory?.category}
                </p>
              </div>
              
              <div>
                <h4 className="mb-2 font-medium">What this means:</h4>
                <p className="text-sm text-muted-foreground">
                  {bmiCategory?.description}
                </p>
              </div>
              
              <div className="rounded-lg border p-4">
                <div className="flex items-start space-x-2">
                  <Info className="mt-0.5 h-4 w-4 text-fitblue-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">BMI Categories</p>
                    <ul className="text-xs text-muted-foreground">
                      <li>Underweight: Less than 18.5</li>
                      <li>Normal weight: 18.5 - 24.9</li>
                      <li>Overweight: 25 - 29.9</li>
                      <li>Obesity: 30 or greater</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 text-fitorange-500" />
                  <div>
                    <p className="text-sm font-medium">Important Note</p>
                    <p className="text-xs text-muted-foreground">
                      BMI is a screening tool but not a diagnostic of body fatness or health. Consult with a healthcare provider for a complete assessment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-[350px] flex-col items-center justify-center">
              <div className="mb-4 rounded-full bg-muted p-6">
                <Weight className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-1 text-xl font-medium">No calculation yet</h3>
              <p className="text-center text-sm text-muted-foreground">
                Fill in your details and click 'Calculate BMI' to see your results here
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BMICalculatorForm;
