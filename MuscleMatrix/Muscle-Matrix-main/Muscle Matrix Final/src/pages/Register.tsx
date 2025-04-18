
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuthForm } from "@/components/UserAuthForm";
import { useAuth } from "@/context/AuthContext";

const Register = () => {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Create a wrapper function to adapt the register function to the expected signature
  const handleRegister = async (values: any) => {
    try {
      await register(values.name, values.email, values.password);
    } catch (error) {
      console.error("Registration error:", error);
      // The error will be handled by the UserAuthForm component
      throw error;
    }
  };

  return (
    <div className="container flex h-screen max-w-screen-xl flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below to create your account
          </p>
        </div>
        <UserAuthForm type="register" onSubmit={handleRegister} />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <span>Already have an account?</span>{" "}
          <Link
            to="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
