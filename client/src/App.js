import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Login from "./components/Login";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="">
      <Header />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Body /> },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/register",
        element: <h1>Register</h1>,
      },
      // { path: "/contact", element: <Contact /> },
      // {
      //   path: "/grocery",
      //   element: (
      //     <Suspense fallback={<h1>Loading!!!</h1>}>
      //       <Grocery />
      //     </Suspense>
      //   ),
      // },
      // { path: "/restaurants/:resId", element: <RestaurantMenu /> },
    ],
    // errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
