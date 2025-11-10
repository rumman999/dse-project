import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate()

  async function handleLogin() {
    try {
      const response = await axios.post(
        "http://localhost:5003/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      console.log(response.data);
      localStorage.setItem('token', response.data.token);

      navigate('/')

    } catch (error) {
      console.log("Login Failed", error);
      if (error.response) {
        setMessage(`${error.response.data.message}`);
      } else {
        setMessage("Network error. Please try again.");
      }
    }
  }

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-xl mt-40 p-4 font-bold">BiniyogAI</h1>
      </div>
      <div className="flex justify-center items-center">
        <div className="card bg-base-100 shadow-xl w-96">
          <div className="card-body">
            <h2 className="card-title">Login</h2>
            <div className="form-control">
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">
                  Login to your account:
                </legend>

                <div className="form-control">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <div className="form-control">
                  <label className="label">Password</label>
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                {message && (
                  <div className="text-center p-2">
                    <p className="text-error">{message}</p>
                  </div>
                )}
                <button className="btn btn-neutral mt-4" onClick={handleLogin}>
                  Login
                </button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
