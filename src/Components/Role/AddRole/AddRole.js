import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_ROLE } from "../../../GraphQL/Mutation";
import Navbar from "../../Navbar/Navbar";
import ViewRole from "../ViewRole/ViewRole";

const AddRole = () => {
  const [createRole] = useMutation(CREATE_ROLE, {
    onCompleted: (data) => {
      alert("Role created successfully");
    },
    onError: (errors) => {
      if (errors.message) {
        alert(errors.message);
      }
    },
  });
  const [roleName, setRoleName] = useState("");
  const handleChange = (e) => {
    setRoleName(e.target.value);
  };
  const handleRole = () => {
    if (roleName) {
      createRole({
        variables: { roleName },
      });
      setRoleName("");
    } else alert("filed empty");
  };

  return (
    <>
      <Navbar />
      <div className="createBody">
        <h2>Create Role</h2>
        <form onSubmit={handleRole} id="myForm">
          <div className="inputSection">
            <label className="inputLabel">RoleName</label>
            <input
              className="inputField"
              type="text"
              name="roleName"
              onInput={handleChange}
            />
          </div>
          <button className="btn" type="submit">
            Create
          </button>
        </form>
      </div>
      <ViewRole />
    </>
  );
};

export default AddRole;
