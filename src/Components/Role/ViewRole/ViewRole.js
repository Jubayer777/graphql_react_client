import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { allRoles } from "../../../GraphQL/Query";
import "./ViewRole.css";

const ViewRole = () => {
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
  return (
    <div className="roleDiv">
      {roles?.map((r, i) => (
        <p key={i} className="roleList">
          {i + 1}: {r.title}
        </p>
      ))}
    </div>
  );
};

export default ViewRole;
