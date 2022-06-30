import { Suspense } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";

const PrivateOutlet = () => {
  const { auth } = useAuth();
  const { pathname } = useLocation();

  return auth?.email ? (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/login" replace state={{ pathname }} />
  );
};

export default PrivateOutlet;
