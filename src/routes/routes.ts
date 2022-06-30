import { lazy } from "react";
import Home from "../pages/Home";
const Billing = lazy(() => import("../pages/Billing"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));

const routes = [
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "",
    Component: Home,
  },
  {
    path: "billing",
    Component: Billing,
  },
];

export default routes;
