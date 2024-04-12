import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = async () => {
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ email, username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(response);
    if (response.status != 200) {
      alert("Registration Failed!");
    } else {
      alert("Registration Successful!");
    }
  };

  return (
    <div className="m-10 p-10">
      <h2 className="font-bold text-3xl text-center">Register</h2>
      <div className="flex justify-center items-center flex-col mt-6 font-semibold">
        <div className="my-4">
          <input
            className="border-slate-400 border-2 rounded-sm px-2 w-80 py-1"
            placeholder="Enter Email*"
            type="text"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div>
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
        <div className="my-4">
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
          className="border-2 w-80  text-slate-400 hover:text-black hover:border-black border-slate-400 rounded-sm px-2 py-1"
          onClick={(e) => {
            if (username === "" || password === "" || email === "") {
              e.preventDefault();
            } else {
              submitForm();
            }
          }}
        >
          Register
        </button>
        <Link
          to="/login"
          className="border-2 w-80 my-4 text-center text-slate-400 hover:text-black hover:border-black border-slate-400 rounded-sm px-2 py-1"
        >
          Go to Login &#8594;
        </Link>
      </div>
    </div>
  );
};

export default Register;
