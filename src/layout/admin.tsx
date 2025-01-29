import { Link } from "react-router-dom";
import { Navbar } from "./navbar";
import { FloatButton } from "../components/FloatButton";
import { useAuthStore } from "../stores/authStore";
import { roleRoutes } from "../routes/ValidateRoutePrivate";
import IconDashboard from "../assets/icons/IconDashboard";
import IconUsers from "../assets/icons/IconUsers";
import IconRecords from "../assets/icons/iconRecords";
import IconHistory from "../assets/icons/IconHistory";
import IconUpload from "../assets/icons/IconUpload";
import IconCheckin from "../assets/icons/IconCheckin";

type Props = {
  children: any;
};

export const sidebarRoutes = [
  {
    to: "/dashboard",
    icon: <IconDashboard />,
    text: "Dashboard",
  },
  {
    to: "/users",
    icon: <IconUsers />,
    text: "Users",
  },
  {
    to: "/records",
    icon: <IconRecords />,
    text: "Records",
  },
  {
    to: "/upload",
    icon: <IconUpload />,
    text: "Upload",
  },
  {
    to: "/history",
    icon: <IconHistory />,
    text: "History",
  },
  {
    to: "/entry",
    icon: <IconCheckin />,
    text: "Entry register",
  }
];
export default function AdminLayout({ children }: Props) {
  const rol = useAuthStore((state) => state.rol as keyof typeof roleRoutes);
  return (
    <>
      <div>
        <Navbar />
        <aside
          id="logo-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 lg:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pt-1 pb-4 overflow-y-auto bg-white">
            <ul className="space-y-2 font-medium gap-6">
              {sidebarRoutes.map((route, index) => {
                if (roleRoutes[rol].includes(route.to)) {
                  return (
                    <li key={index}>
                      <Link
                        to={route.to}
                        className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                      >
                        {route.icon}
                        <span className="ml-3 font-bold text-secondary">
                          {route.text}
                        </span>
                      </Link>
                    </li>
                  );
                }
              })}
              {/* Log Out */}
              <li>
                <Link
                  to="/logout"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                >
                  <svg
                    className="w-6 h-6 text-primary"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 15"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="M1 7.5h11m0 0L8 3.786M12 7.5l-4 3.714M12 1h3c.53 0 1.04.196 1.414.544.375.348.586.82.586 1.313v9.286c0 .492-.21.965-.586 1.313A2.081 2.081 0 0 1 15 14h-3"
                    />
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap font-bold text-secondary">
                    Log Out
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
        <div className="p-4 lg:ml-64">
          <div
            className="p-4 rounded-lg mt-14"
            style={{
              minHeight: "calc(100vh - 22rem)",
              position: "relative",
            }}
          >
            {children}
          </div>
        </div>
      </div>
      <FloatButton />
    </>
  );
}
