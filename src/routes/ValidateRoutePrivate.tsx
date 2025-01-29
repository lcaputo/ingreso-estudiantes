import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { RoleEnumByType } from "../enums/eUserRole";
import { useEffect, useState } from "react";
interface IValidRoutePrivate {
  children: JSX.Element;
}

export const roleRoutes: { [key in RoleEnumByType]: string[] } = {
  [RoleEnumByType.SUPER_USER]: [
    "/dashboard",
    "/users",
    "/records",
    "/history",
    "/upload",
    "/entry",
    "/guest",
    "/entry_success",
    "/success",
    "/exit",
  ],
  [RoleEnumByType.ADMINISTRADOR]: [
    "/dashboard",
    "/users",
    "/records",
    "/history",
    "/upload",
    "/entry",
    "/guest",
    "/entry_success",
    "/success",
    "/exit",
  ],
  [RoleEnumByType.AUDITOR]: ["/dashboard", "/records", "/history"],
  [RoleEnumByType.PUESTO_DE_SERVICIO]: [
    "/entry",
    "/guest",
    "/entry_success",
    "/success",
    "/exit",
  ],
};

const ValidateRoutePrivate = ({ children }: IValidRoutePrivate) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const rol = useAuthStore((state) => state.rol as keyof typeof roleRoutes);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setRedirectPath("/login");
    } else if (
      roleRoutes[rol] &&
      !roleRoutes[rol].includes(location.pathname)
    ) {
      setRedirectPath(roleRoutes[rol][0]);
    } else {
      setRedirectPath(null);
    }
  }, [isAuthenticated, rol, location.pathname]);
  if (redirectPath) {
    return <Navigate to={redirectPath} />;
  }

  return children;
};

export default ValidateRoutePrivate;
