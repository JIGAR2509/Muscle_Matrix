
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BMICalculatorForm from "@/components/BMICalculatorForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BMICalculator = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container max-w-screen-xl py-8 px-4 md:py-12 md:px-6">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold leading-tight md:text-4xl">BMI Calculator</h1>
              <p className="mt-3 text-muted-foreground">
                Calculate your Body Mass Index (BMI) to determine if you're at a healthy weight
              </p>
            </div>
            
            <BMICalculatorForm />
            
            <Card>
              <CardHeader>
                <CardTitle>About BMI</CardTitle>
                <CardDescription>
                  Understanding Body Mass Index and its limitations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="mb-2 font-medium">What is BMI?</h3>
                  <p className="text-sm text-muted-foreground">
                    Body Mass Index (BMI) is a simple calculation using a person's height and weight. The formula is BMI = kg/m² where kg is weight in kilograms and m² is height in meters squared.
                  </p>
                </div>
                
                <div>
                  <h3 className="mb-2 font-medium">BMI Limitations</h3>
                  <p className="text-sm text-muted-foreground">
                    BMI is a useful measurement for most people over 18 years old, but it has some limitations:
                  </p>
                  <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                    <li>Doesn't account for muscle mass, bone density, or body composition</li>
                    <li>May not be accurate for athletes, pregnant women, elderly, or growing children</li>
                    <li>Doesn't consider where fat is stored in your body</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="mb-2 font-medium">Next Steps</h3>
                  <p className="text-sm text-muted-foreground">
                    After calculating your BMI, check out our personalized diet plans and exercise routines tailored to help you achieve your fitness goals.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BMICalculator;
