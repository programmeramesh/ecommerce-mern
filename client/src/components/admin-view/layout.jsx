import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";
import AdminFooter from "./footer";
import { useState } from "react";

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* admin sidebar */}
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <AdminHeader setOpen={setOpenSidebar} />
        <main className="flex-1 flex-col flex bg-gray-50 dark:bg-gray-950 p-4 md:p-6 overflow-auto transition-colors">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
        {/* admin footer */}
        <AdminFooter />
      </div>
    </div>
  );
}

export default AdminLayout;
