import { RouteProps, BrowserRouter as Router , Routes, Route } from "react-router-dom"
import { FC, Suspense, lazy } from "react";
import Layout from "../components/layout";

const Home = lazy(() => import("../pages/homepage"));
const User = lazy(()=>import("../pages/userManagement"))

const appRoutes: RouteProps[] = [
    {
      path: "/dashboard",
      element: <Home />,
    },
    {
        path: "/user",
        element: <User />,
      },
  ];

  const Navigation: FC = () => (
    <Router>
      <Layout>
        <Routes>
          {appRoutes?.map((route: RouteProps) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Suspense fallback={'loading...'}>{route.element}</Suspense>
                }
              />
            );
          })}
        </Routes>
      </Layout>
    </Router>
  );

export {
    Navigation
}