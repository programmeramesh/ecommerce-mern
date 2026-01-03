import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    dispatch(loginUser(formData))
      .then((data) => {
        if (data?.payload?.success) {
          toast({
            title: data?.payload?.message,
            variant: "success",
          });
        } else {
          toast({
            title: data?.payload?.message,
            variant: "destructive",
          });
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <Card className="w-full max-w-xl backdrop-blur supports-[backdrop-filter]:bg-background/80 animate-card-in shadow-xl transition-all hover:shadow-2xl">
      <CardHeader className="text-center space-y-3 pb-8 pt-8">
        <CardTitle className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Welcome back
        </CardTitle>
        <CardDescription className="text-base">
          Sign in to your account to continue shopping
        </CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <CommonForm
          formControls={loginFormControls}
          buttonText={isLoading ? "Signing In..." : "Sign In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          isBtnDisabled={isLoading}
        />
        <div className="mt-6 text-center text-base text-muted-foreground">
          Don't have an account?
          <Link className="font-semibold ml-2 text-primary hover:underline transition-colors" to="/auth/register">
            Register
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default AuthLogin;
