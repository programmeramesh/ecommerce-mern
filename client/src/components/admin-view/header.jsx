import { AlignJustify, LogOut, Search, User, Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import { useTheme } from "@/contexts/ThemeContext";
import NotificationsDropdown from "./notifications-dropdown";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useSelector((state) => state.auth);

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
      <div className="flex items-center gap-4">
        <Button 
          onClick={() => setOpen(true)} 
          className="lg:hidden sm:block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 bg-transparent text-gray-600 dark:text-gray-300 border-none shadow-none"
        >
          <AlignJustify size={20} />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        
        <div className="hidden md:flex items-center bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-2 w-96 transition-colors">
          <Search size={18} className="text-gray-400 dark:text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Search products, orders, customers..."
            className="bg-transparent border-none outline-none flex-1 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={toggleTheme}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 bg-transparent text-gray-600 dark:text-gray-300 border-none shadow-none transition-colors"
          title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </Button>

        <NotificationsDropdown />

        <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {user?.userName || "Admin User"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
          </div>
          
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
            <User size={18} className="text-white" />
          </div>

          <Button
            onClick={handleLogout}
            className="inline-flex gap-2 items-center rounded-xl px-4 py-2 text-sm font-medium bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
