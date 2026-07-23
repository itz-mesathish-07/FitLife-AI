import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation, RouteComponentProps } from "wouter";

interface Props extends RouteComponentProps {
  children?: ReactNode;
}

export default function ProtectedRoute(props: Props) {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return <>{props.children}</>;
}
