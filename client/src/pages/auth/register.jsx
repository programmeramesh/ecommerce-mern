import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <Card className="w-full max-w-xl backdrop-blur supports-[backdrop-filter]:bg-background/80 animate-card-in shadow-xl transition-all hover:shadow-2xl">
      <CardHeader className="text-center space-y-3 pb-8 pt-8">
        <CardTitle className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Create new account
        </CardTitle>
        <CardDescription className="text-base">
          Join us today and start shopping
        </CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
        <div className="mt-6 text-center text-base text-muted-foreground">
          Already have an account?
          <Link className="font-semibold ml-2 text-primary hover:underline transition-colors" to="/auth/login">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default AuthRegister;
