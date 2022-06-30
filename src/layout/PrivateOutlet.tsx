import { Suspense } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateOutlet = () => {
  //   const { admin } = useAdmin();
  const admin = { email: "admin@gmail.com" };
  const { pathname } = useLocation();

  return admin.email ? (
    <Suspense fallback={null}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/login" replace state={{ pathname }} />
  );
};

export default PrivateOutlet;
