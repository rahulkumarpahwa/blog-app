import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between bg-slate-100 p-4 text-xl font-bold shadow-lg">
      <div>
        <Link to="/">My Blog</Link>
      </div>
      <div>
        <ul className="flex justify-evenly font-semibold">
          <li className="mx-4 hover:underline underline-offset-8">
            <Link to="/login">Login</Link>
          </li>
          <li className="mx-4 hover:underline underline-offset-8">
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
