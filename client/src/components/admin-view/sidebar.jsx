import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
  Users,
  Settings,
  TrendingUp,
  Package,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
    color: "text-blue-500",
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <Package />,
    color: "text-green-500",
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
    color: "text-orange-500",
  },
  {
    id: "analytics",
    label: "Analytics",
    path: "/admin/analytics",
    icon: <TrendingUp />,
    color: "text-purple-500",
  },
  {
    id: "customers",
    label: "Customers",
    path: "/admin/customers",
    icon: <Users />,
    color: "text-pink-500",
  },
  {
    id: "settings",
    label: "Settings",
    path: "/admin/settings",
    icon: <Settings />,
    color: "text-gray-500",
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="mt-8 flex-col flex gap-1">
      {adminSidebarMenuItems.map((menuItem) => {
        const isActive = location.pathname === menuItem.path;
        return (
          <div
            key={menuItem.id}
            onClick={() => {
              navigate(menuItem.path);
              setOpen ? setOpen(false) : null;
            }}
            className={`
              flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 
              transition-all duration-200 ease-in-out group relative
              ${isActive 
                ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-400 shadow-sm border-l-4 border-blue-500 dark:border-blue-400' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
              }
            `}
          >
            <div className={`${isActive ? menuItem.color : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'} transition-colors duration-200`}>
              {menuItem.icon}
            </div>
            <span className={`font-medium text-sm ${isActive ? 'text-blue-700 dark:text-blue-400' : ''}`}>
              {menuItem.label}
            </span>
            {isActive && (
              <div className="absolute right-2 w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse"></div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 bg-white dark:bg-gray-900">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b border-gray-100 dark:border-gray-800 pb-6">
              <SheetTitle className="flex items-center gap-3 mt-6 mb-2">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                  <ChartNoAxesCombined size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ShopHub Admin</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Power your business</p>
                </div>
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 px-2">
              <MenuItems setOpen={setOpen} />
            </div>
            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Need help?</p>
                <button className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-72 flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 lg:flex shadow-sm transition-colors">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <div
            onClick={() => navigate("/admin/dashboard")}
            className="flex cursor-pointer items-center gap-3 group"
          >
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-200">
              <ChartNoAxesCombined size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-200">
                ShopHub Admin
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Power your business</p>
            </div>
          </div>
        </div>
        <div className="flex-1 px-4 py-2">
          <MenuItems />
        </div>
        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Need help?</p>
            <button className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
              Contact Support
            </button>
          </div>
        </div>
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
