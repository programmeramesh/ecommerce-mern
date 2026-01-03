import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { User, Package, MapPin, Heart, Settings as SettingsIcon } from "lucide-react";
import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";
import ProfileInfo from "@/components/shopping-view/profile-info";
import Wishlist from "@/components/shopping-view/wishlist";
import Settings from "@/components/shopping-view/settings";

function ShoppingAccount() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-[200px] md:h-[300px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-90" />
        <img
          src={accImg}
          className="h-full w-full object-cover object-center mix-blend-overlay"
          alt="Account banner"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-2">My Account</h1>
            <p className="text-lg md:text-xl text-white/90">
              Manage your profile, orders, and preferences
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <Tabs defaultValue="profile" className="w-full">
            {/* Enhanced Tabs List */}
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="profile"
                className="flex items-center gap-2 px-6 py-4 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="flex items-center gap-2 px-6 py-4 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
              >
                <Package className="w-4 h-4" />
                <span className="hidden sm:inline">Orders</span>
              </TabsTrigger>
              <TabsTrigger
                value="wishlist"
                className="flex items-center gap-2 px-6 py-4 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
              >
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Wishlist</span>
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className="flex items-center gap-2 px-6 py-4 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
              >
                <MapPin className="w-4 h-4" />
                <span className="hidden sm:inline">Addresses</span>
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="flex items-center gap-2 px-6 py-4 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
              >
                <SettingsIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab Contents */}
            <div className="p-6">
              <TabsContent value="profile" className="mt-0">
                <ProfileInfo />
              </TabsContent>
              <TabsContent value="orders" className="mt-0">
                <ShoppingOrders />
              </TabsContent>
              <TabsContent value="wishlist" className="mt-0">
                <Wishlist />
              </TabsContent>
              <TabsContent value="address" className="mt-0">
                <Address />
              </TabsContent>
              <TabsContent value="settings" className="mt-0">
                <Settings />
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
