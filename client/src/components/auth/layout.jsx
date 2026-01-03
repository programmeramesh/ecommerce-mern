import { Outlet } from "react-router-dom";
import { ShoppingBag, ShoppingCart, Package, Sparkles } from "lucide-react";

function AuthLayout() {
  return (
    <>
      <style>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes zoomRotate {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(-10deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-card-in {
          animation: zoomRotate 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .form-container {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        
        <div className="max-w-md space-y-6 text-center text-primary-foreground relative z-10">
          {/* Animated Shopping Icons */}
          <div className="relative flex items-center justify-center h-48 mb-8">
            {/* Floating sparkles */}
            <Sparkles className="absolute top-0 left-8 w-6 h-6 text-yellow-400 animate-pulse" style={{ animationDelay: "0s" }} />
            <Sparkles className="absolute top-12 right-12 w-5 h-5 text-yellow-300 animate-pulse" style={{ animationDelay: "0.5s" }} />
            <Sparkles className="absolute bottom-8 left-16 w-4 h-4 text-yellow-500 animate-pulse" style={{ animationDelay: "1s" }} />
            
            {/* Main shopping bag with bounce animation */}
            <div className="relative animate-bounce">
              <ShoppingBag className="w-32 h-32 text-white" strokeWidth={1.5} />
              
              {/* Floating packages */}
              <Package 
                className="absolute -top-4 -right-8 w-12 h-12 text-blue-400 animate-pulse" 
                style={{ animationDelay: "0.3s" }}
              />
              <Package 
                className="absolute -bottom-2 -left-8 w-10 h-10 text-purple-400 animate-pulse" 
                style={{ animationDelay: "0.6s" }}
              />
            </div>
            
            {/* Shopping cart with slide animation */}
            <ShoppingCart 
              className="absolute bottom-0 right-8 w-16 h-16 text-green-400 animate-pulse" 
              strokeWidth={1.5}
              style={{ animationDelay: "0.2s" }}
            />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold tracking-tight leading-tight animate-fade-in-up">
              Shop Smart,
            </h1>
            <h2 className="text-4xl font-bold text-yellow-400 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Live Better
            </h2>
            <p className="text-lg text-gray-300 font-medium animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              Discover amazing products at unbeatable prices
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Trusted by thousands
              </span>
              <span>•</span>
              <span>Fast delivery</span>
              <span>•</span>
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 animate-gradient" />
        
        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: "4s" }} />
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-2xl form-container">
          <Outlet />
        </div>
      </div>
    </div>
    </>
  );
}

export default AuthLayout;
