import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound";
import routes from "../routes/routes";
import ErrorBoundary from "./ErrorBoundary";
import PrivateOutlet from "./PrivateOutlet";

const MainContents = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<h1>Loading..</h1>}>
        <Routes>
          {routes.slice(0, 2).map(({ path, Component }, index) => {
            return <Route key={index} path={path} element={<Component />} />;
          })}
          <Route path="/*" element={<PrivateOutlet />}>
            {routes.slice(2).map(({ path, Component }, index) => {
              return <Route key={index} path={path} element={<Component />} />;
            })}
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default MainContents;
