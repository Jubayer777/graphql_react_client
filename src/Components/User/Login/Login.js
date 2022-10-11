import { useLazyQuery} from "@apollo/client";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../../../GraphQL/Query";

const Login = () => {
  const location = useLocation();
  const origin = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };
  const [loginUser, { loading, error, data }] = useLazyQuery(LOGIN_USER, {
    onCompleted: (data) => {
      const token = data.loginUser.accessToken;
      const userId = data.loginUser._id;
      const userRole = data.loginUser.role.title;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userRole", userRole);
      navigate(origin);
    },
    onError: (errors) => {
      if (errors.message) {
        alert(errors.message);
        setInputData({
          email: "",
          password: "",
        });
        document.getElementById("myForm").reset();
      }
    },
  });
  const loginHandler = async (e) => {
    e.preventDefault();
    const isNonEmpty = !Object.values(inputData).some(
      (x) => x === null || x === ""
    );
    if (isNonEmpty) {
      await loginUser({
        variables: inputData,
        updateQuery() {},
      });
    } else {
      alert("filed empty");
    }
  };
  return (
    <div className="createBody">
      <h2>Login user</h2>
      <form onSubmit={loginHandler} id="myForm">
        <div className="inputSection">
          <label className="inputLabel">Email</label>
          <input
            className="inputField"
            type="email"
            name="email"
            onInput={handleChange}
          />
        </div>
        <div className="inputSection">
          <label className="inputLabel">Password</label>
          <input
            className="inputField"
            type="password"
            name="password"
            onInput={handleChange}
          />
        </div>
        <button className="btn" type="submit">
          Login
        </button>
        <div>
          <Link className="userLink" to={"/signUp"}>
            Create New
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
