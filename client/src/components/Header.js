import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../utils/UserContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    checkLog();
  }, []);

  const checkLog = async () => {
    const response = await fetch("http://localhost:4000/profile", {
      credentials: "include",
    });
    const json = await response.json();
    setUserInfo(json.username);
  };

  const logout = async () => {
    const response = await fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include",
    });
    setUserInfo(null);
  };

  return (
    <div className="flex justify-between bg-slate-100 p-4 text-xl font-bold shadow-lg">
      <div>
        <Link to="/">My Blog</Link>
      </div>
      <div>
        <ul className=" font-semibold">
          {userInfo != null ? (
            <div className="flex justify-evenly">
              <li className="mx-4 hover:underline underline-offset-8">
                <Link to="/create">Create New Post</Link>
              </li>
              <li className="mx-4 hover:underline underline-offset-8">
                <Link onClick={logout}>Logout</Link>
              </li>
              <li className="mx-4 hover:underline underline-offset-8">
                {userInfo}
              </li>
            </div>
          ) : (
            <div className="flex justify-evenly">
              {" "}
              <li className="mx-4 hover:underline underline-offset-8">
                <Link to="/login">Login</Link>
              </li>
              <li className="mx-4 hover:underline underline-offset-8">
                <Link to="/register">Register</Link>
              </li>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
