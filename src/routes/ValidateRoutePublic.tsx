import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

interface IValidateRoutePublicProps {
  children: JSX.Element;
}

const ValidateRoutePublic = ({ children }: IValidateRoutePublicProps) => {
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated());

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ValidateRoutePublic;
