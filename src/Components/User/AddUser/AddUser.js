import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../../GraphQL/Mutation";
import "./AddUser.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AddUser = () => {
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
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      const token = data.createUser.accessToken;
      const userRole = data.createUser.role.title;
      localStorage.setItem("token", token);
      const userId = data.createUser._id;
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
  const addUser = (e) => {
    e.preventDefault();
    const isNonEmpty = !Object.values(inputData).some(
      (x) => x === null || x === ""
    );
    if (isNonEmpty) {
      createUser({
        variables: inputData,
      });
    } else {
      alert("filed empty");
    }
  };
  return (
    <div className="createBody">
      <h2>Create user</h2>
      <form onSubmit={addUser} id="myForm">
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
          Create
        </button>
        <div>
          <Link className="userLink" to={"/login"}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
