import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { allRoles, allUsers } from "../../../GraphQL/Query";
import "./ViewUsers.css";
import userAvatar from "../../../images/userAvatar.png";
import { DELETE_USER, UPDATE_USER_ROLE } from "../../../GraphQL/Mutation";
import Navbar from "../../Navbar/Navbar";

const ViewUsers = () => {
  const userRole = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId");
  const [users, setUsers] = useState([]);
  const { loading, error, data } = useQuery(allUsers, {
    onCompleted: (data) => {
      setUsers(data.users);
    },
    onError: (errors) => {
      if (errors.message) {
        alert(errors.message);
        setUsers([]);
      }
    },
  });

  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: (data) => {
      alert(data.deleteEvent);
    },
    onError: (errors) => {
      if (errors.message) {
        alert(errors.message);
      }
    },
  });

  const handleDelete = (userId) => {
    deleteUser({
      variables: {
        userId: userId,
      },
      refetchQueries: [{ query: allUsers }],
    });
  };

  const [roles, setRoles] = useState([]);
  const { load, err, data2 } = useQuery(allRoles, {
    onCompleted: (data) => {
      setRoles(data.roles);
    },
    onError: (errors) => {
      if (errors.message) {
        alert(errors.message);
        setRoles([]);
      }
    },
  });

  const [updateUserRole] = useMutation(UPDATE_USER_ROLE, {
    onCompleted: (data) => {
      alert(data.updateUserRole);
    },
    onError: (errors) => {
      if (errors.message) {
        alert(errors.message);
      }
    },
  });

  const handleRole = (e, id) => {
    const newRoleInput = {
      userId: id,
      roleId: e.target.value,
    };
    updateUserRole({
      variables: newRoleInput,
      refetchQueries: [{ query: allUsers }, { query: allRoles }],
    });
  };
  return (
    <>
      <Navbar />
      <div className="viewContainer">
        {users?.map((u,i) => (
          <div key={i} className="viewCard">
            <div key={u._id} className="">
              <img className="userAvatar" src={userAvatar} />
              <div className="viewInfoDiv">
                <h4>Email: {u.email}</h4>
                {userRole === "superAdmin" && userId !== u._id ? (
                  <select
                    name="status"
                    className="statusDrop"
                    onChange={(e) => handleRole(e, u._id)}
                  >
                    {roles?.map((r) => (
                      <option key={r._id} value={r._id} selected={u.role._id === r._id}>
                        {r.title}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>Role: {u.role.title}</p>
                )}
                {u.createdEvents.map((e, i) => (
                  <div key={i}>
                    <h5 className="eventsList">
                      Events-{i + 1}:{e.title}h
                    </h5>
                  </div>
                ))}
              </div>
            </div>
            <div className="userBtnDiv">
              {(u.role.title == "user" ||
                (userRole === "superAdmin" && u._id !== userId)) && (
                <button className="btn" onClick={() => handleDelete(u._id)}>
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewUsers;
