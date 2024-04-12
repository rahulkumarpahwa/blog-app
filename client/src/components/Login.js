import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="m-10 p-10">
      <h2 className="font-bold text-3xl text-center">Login</h2>
      <div className="flex justify-center items-center flex-col mt-6 font-semibold">
        <form action="" method="get">
          <div className="my-4">
            <input
              className="border-slate-400 border-2 rounded-sm px-2 w-80 py-1"
              placeholder="Enter Username*"
              type="text"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <input
              className="border-slate-400 border-2 rounded-sm px-2 w-80 py-1"
              placeholder="Enter Password*"
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <button
            className="border-2 w-80 my-4 text-slate-400 hover:text-black hover:border-black border-slate-400 rounded-sm px-2 py-1"
            onClick={(e) => {
              if (username === "" || password === "") {
                e.preventDefault();
              } else {
              }
            }}
          >
            Login
          </button>
        </form>
        <Link
          to="/register"
          className="border-2 w-80 text-center text-slate-400 hover:text-black hover:border-black border-slate-400 rounded-sm px-2 py-1"
        >
          Go to Register &#8594;
        </Link>
      </div>
    </div>
  );
};

export default Login;
