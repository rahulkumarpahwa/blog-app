import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Login from "./components/Login";
import Register from "./components/Register";
import UserContext from "../utils/UserContext";
import Create from "./components/Create";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const App = () => {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <UserContext.Provider value={{userInfo, setUserInfo}}>
      <div className="">
        <Header />
        <Outlet />
      </div>
    </UserContext.Provider>
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
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      { path: "/create", element: <Create /> },
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
