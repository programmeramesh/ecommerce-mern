import { Store, LogOut, Menu, ShoppingCart, UserCog, Search, Heart } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import { motion, AnimatePresence } from "framer-motion";
import GlobalSearch from "./global-search";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  const isActive = (menuItem) => {
    if (menuItem.id === "home") {
      return location.pathname === "/shop/home";
    }
    if (menuItem.id === "search") {
      return location.pathname === "/shop/search";
    }
    if (menuItem.id === "products") {
      return location.pathname === "/shop/listing" && !searchParams.get("category");
    }
    return searchParams.get("category") === menuItem.id;
  };

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-2 lg:gap-1 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem, index) => (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          key={menuItem.id}
        >
          <div
            onClick={() => handleNavigate(menuItem)}
            className={`
              relative px-3 py-2 rounded-lg text-sm font-medium cursor-pointer
              transition-all duration-200 group
              ${isActive(menuItem) 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }
            `}
          >
            {menuItem.label}
            <AnimatePresence>
              {isActive(menuItem) && (
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "50%" }}
                  exit={{ width: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-blue-600 rounded-full"
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  // Keyboard shortcut for search (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpenSearchModal(true);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <div className="flex lg:items-center lg:flex-row flex-col gap-3">
        {/* Search Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
          <Button
            onClick={() => setOpenSearchModal(true)}
            variant="ghost"
            className="relative hover:bg-gray-100 transition-colors group gap-2 hidden lg:flex"
          >
            <Search className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            <span className="text-sm text-gray-600 group-hover:text-blue-600">Search</span>
            <kbd className="hidden xl:inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded group-hover:border-blue-300 group-hover:text-blue-600">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
          {/* Mobile Search Icon */}
          <Button
            onClick={() => setOpenSearchModal(true)}
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-gray-100 transition-colors group"
          >
            <Search className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            <span className="sr-only">Search</span>
          </Button>
        </motion.div>

      {/* Cart Button */}
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            onClick={() => setOpenCartSheet(true)}
            variant="ghost"
            size="icon"
            className="relative hover:bg-gray-100 transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-gray-600" />
            <AnimatePresence>
              {cartItems?.items?.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {cartItems.items.length}
                </motion.span>
              )}
            </AnimatePresence>
            <span className="sr-only">User cart</span>
          </Button>
        </motion.div>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      {/* User Avatar */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Avatar className="bg-gradient-to-br from-blue-500 to-indigo-600 cursor-pointer hover:shadow-lg transition-shadow">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold">
                {user?.userName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.userName}</p>
              <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")} className="cursor-pointer">
            <UserCog className="mr-2 h-4 w-4" />
            My Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
      
      {/* Global Search Modal */}
      <GlobalSearch 
        isOpen={openSearchModal} 
        onClose={() => setOpenSearchModal(false)} 
      />
    </>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm"
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/shop/home" className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="p-1.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg group-hover:shadow-lg group-hover:scale-105 transition-all duration-200"
          >
            <Store className="h-5 w-5 text-white" />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ShopHub
            </span>
            <span className="text-[10px] text-gray-500 -mt-1 hidden sm:block">
              Shop Smart, Live Better
            </span>
          </div>
        </Link>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <div className="flex flex-col gap-6 mt-6">
              <MenuItems />
              <div className="border-t pt-4">
                <HeaderRightContent />
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          <MenuItems />
          <div className="h-6 w-px bg-gray-200"></div>
          <HeaderRightContent />
        </div>
      </div>
    </motion.header>
  );
}

export default ShoppingHeader;
