
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuthForm } from "@/components/UserAuthForm";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Create a wrapper function to adapt the login function to the expected signature
  const handleLogin = async (values: any) => {
    try {
      await login(values.email, values.password);
    } catch (error) {
      console.error("Login error:", error);
      // The error will be handled by the UserAuthForm component
      throw error;
    }
  };

  return (
    <div className="container flex h-screen max-w-screen-xl flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password to sign in to your account
          </p>
        </div>
        <UserAuthForm type="login" onSubmit={handleLogin} />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <span>Don't have an account?</span>{" "}
          <Link
            to="/register"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
