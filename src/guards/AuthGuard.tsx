import { Navigate, Outlet } from 'react-router-dom';

export function AuthGuard({
  isAllowed,
  children,
  redirectTo = "/user",
}: IRouteGuard) {
  if (isAllowed) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
}
