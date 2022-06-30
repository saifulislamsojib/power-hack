import { Suspense } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateOutlet = () => {
  const { auth } = useAuth();
  const { pathname } = useLocation();

  return auth?.email ? (
    <Suspense fallback={null}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/login" replace state={{ pathname }} />
  );
};

export default PrivateOutlet;
