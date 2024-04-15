import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Login from "./components/Login";
import Register from "./components/Register";
import UserContext from "../utils/UserContext";
import Create from "./components/Create";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ShowPost from "./components/ShowPost";
import Edit from "./components/Edit";
import About from "./components/About";

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
      { path: "/post/:id", element: <ShowPost /> },
      { path: "/edit/:id", element: <Edit /> },
      { path: "/about", element: <About /> },
    ],
    // errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
