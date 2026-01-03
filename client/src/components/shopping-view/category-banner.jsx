import { motion } from "framer-motion";
import { Tag, TrendingUp, Percent, Sparkles } from "lucide-react";
import { Button } from "../ui/button";

// Category-specific banner configurations
const categoryBanners = {
  electronics: {
    title: "Electronics Sale",
    subtitle: "Latest Tech at Unbeatable Prices",
    offer: "Up to 50% OFF",
    description: "Shop smartphones, laptops, and gadgets",
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    bgPattern: "from-blue-900/20 to-indigo-900/20",
    icon: Sparkles,
    features: ["Free Shipping", "1 Year Warranty", "Easy Returns"],
  },
  grocery: {
    title: "Fresh Groceries",
    subtitle: "Farm Fresh Delivered Daily",
    offer: "20% OFF",
    description: "On your first grocery order",
    gradient: "from-green-600 via-emerald-600 to-teal-600",
    bgPattern: "from-green-900/20 to-emerald-900/20",
    icon: Tag,
    features: ["Same Day Delivery", "Fresh Guarantee", "Best Prices"],
  },
  "dry-fruits": {
    title: "Premium Dry Fruits",
    subtitle: "Healthy & Nutritious Snacks",
    offer: "Buy 2 Get 1 FREE",
    description: "Premium quality dry fruits and nuts",
    gradient: "from-amber-600 via-orange-600 to-yellow-600",
    bgPattern: "from-amber-900/20 to-orange-900/20",
    icon: Percent,
    features: ["100% Natural", "Premium Quality", "Best Prices"],
  },
  men: {
    title: "Men's Fashion",
    subtitle: "Style That Speaks",
    offer: "Flat 40% OFF",
    description: "On trending men's clothing",
    gradient: "from-slate-700 via-gray-700 to-zinc-700",
    bgPattern: "from-slate-900/20 to-gray-900/20",
    icon: TrendingUp,
    features: ["Latest Trends", "Premium Brands", "Free Shipping"],
  },
  women: {
    title: "Women's Collection",
    subtitle: "Elegance Redefined",
    offer: "Up to 60% OFF",
    description: "Exclusive women's fashion deals",
    gradient: "from-pink-600 via-rose-600 to-red-600",
    bgPattern: "from-pink-900/20 to-rose-900/20",
    icon: Sparkles,
    features: ["New Arrivals", "Designer Wear", "Express Delivery"],
  },
  kids: {
    title: "Kids Paradise",
    subtitle: "Fun & Comfortable",
    offer: "Buy 3 Get 1 FREE",
    description: "Adorable outfits for your little ones",
    gradient: "from-cyan-600 via-sky-600 to-blue-600",
    bgPattern: "from-cyan-900/20 to-sky-900/20",
    icon: Sparkles,
    features: ["Soft Fabrics", "Vibrant Colors", "Safe Materials"],
  },
  accessories: {
    title: "Accessories Hub",
    subtitle: "Complete Your Look",
    offer: "30% OFF",
    description: "On all fashion accessories",
    gradient: "from-violet-600 via-purple-600 to-fuchsia-600",
    bgPattern: "from-violet-900/20 to-purple-900/20",
    icon: Tag,
    features: ["Trendy Designs", "Premium Quality", "Best Deals"],
  },
  footwear: {
    title: "Footwear Collection",
    subtitle: "Step Into Style",
    offer: "Flat 45% OFF",
    description: "Comfort meets fashion",
    gradient: "from-orange-600 via-red-600 to-pink-600",
    bgPattern: "from-orange-900/20 to-red-900/20",
    icon: TrendingUp,
    features: ["All Sizes", "Comfort Fit", "Durable"],
  },
  "home-kitchen": {
    title: "Home & Kitchen",
    subtitle: "Make Your House a Home",
    offer: "Up to 55% OFF",
    description: "Essential home & kitchen items",
    gradient: "from-teal-600 via-cyan-600 to-blue-600",
    bgPattern: "from-teal-900/20 to-cyan-900/20",
    icon: Sparkles,
    features: ["Quality Products", "Best Brands", "Fast Delivery"],
  },
  beauty: {
    title: "Beauty & Care",
    subtitle: "Glow Naturally",
    offer: "40% OFF",
    description: "Premium beauty products",
    gradient: "from-rose-600 via-pink-600 to-fuchsia-600",
    bgPattern: "from-rose-900/20 to-pink-900/20",
    icon: Sparkles,
    features: ["Organic", "Dermatologist Tested", "Cruelty Free"],
  },
  sports: {
    title: "Sports & Fitness",
    subtitle: "Fuel Your Passion",
    offer: "35% OFF",
    description: "Premium sports equipment",
    gradient: "from-lime-600 via-green-600 to-emerald-600",
    bgPattern: "from-lime-900/20 to-green-900/20",
    icon: TrendingUp,
    features: ["Pro Quality", "Durable", "Best Prices"],
  },
  books: {
    title: "Books & More",
    subtitle: "Knowledge is Power",
    offer: "Buy 2 Get 1 FREE",
    description: "Bestsellers and classics",
    gradient: "from-indigo-600 via-blue-600 to-cyan-600",
    bgPattern: "from-indigo-900/20 to-blue-900/20",
    icon: Tag,
    features: ["Wide Collection", "Fast Delivery", "Best Prices"],
  },
};

// Default banner for products without category
const defaultBanner = {
  title: "Special Offers",
  subtitle: "Amazing Deals Await",
  offer: "Up to 50% OFF",
  description: "On selected products",
  gradient: "from-blue-600 via-purple-600 to-pink-600",
  bgPattern: "from-blue-900/20 to-purple-900/20",
  icon: Tag,
  features: ["Free Shipping", "Easy Returns", "Best Prices"],
};

function CategoryBanner({ category, onShopNow }) {
  const banner = categoryBanners[category] || defaultBanner;
  const Icon = banner.icon;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl mb-8 shadow-2xl">
      {/* Background with gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${banner.bgPattern}`} />
        
        {/* Animated background patterns */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            {/* Icon */}
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <Icon className="w-12 h-12 md:w-16 md:h-16" />
            </motion.div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
              {banner.title}
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl mb-4 text-white/90">
              {banner.subtitle}
            </p>

            {/* Description */}
            <p className="text-base md:text-lg mb-6 text-white/80">
              {banner.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-3 mb-6">
              {banner.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                >
                  ✓ {feature}
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onShopNow}
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 font-bold text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Shop Now
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="ml-2"
                >
                  →
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Offer Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center items-center"
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-white/30 rounded-full blur-3xl animate-pulse" />
              
              {/* Offer circle */}
              <div className="relative bg-white rounded-full p-8 md:p-12 shadow-2xl">
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Percent className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 bg-gradient-to-r ${banner.gradient} bg-clip-text text-transparent`} />
                  </motion.div>
                  <div className={`text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r ${banner.gradient} bg-clip-text text-transparent mb-2`}>
                    {banner.offer}
                  </div>
                  <div className="text-gray-600 font-semibold text-sm md:text-base">
                    Limited Time Only
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-2 -right-2 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="white"
            fillOpacity="0.1"
          />
        </svg>
      </div>
    </div>
  );
}

export default CategoryBanner;
