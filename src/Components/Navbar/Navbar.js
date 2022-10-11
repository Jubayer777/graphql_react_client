import React from "react";
import "./Navbar.css";
import companyImg from "../../images/company.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    window.localStorage.clear();
    if (location.pathname === "/" || location.pathname === "/viewEvents") {
      navigate(location.pathname);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="navbar">
      <div className="left_nav">
        <img className="companyLogo" src={companyImg} />
      </div>
      <div className="right_nav">
        <Link className="nav_link" to={"/viewEvents"}>
          Events
        </Link>
        <Link className="nav_link" to={"/bookings"}>
          Bookings
        </Link>
        {(userRole === "admin" || userRole === "superAdmin") && (
          <>
            <Link className="nav_link" to={"/viewUsers"}>
              Users
            </Link>
            <Link className="nav_link" to={"/addEvent"}>
              AddEvent
            </Link>
          </>
        )}
        {userRole === "superAdmin" && (
          <Link className="nav_link" to={"/addRole"}>
            AddRole
          </Link>
        )}
        {!token ? (
          <Link className="nav_link" to={"/login"}>
            Login
          </Link>
        ) : (
          <button className="nav_btn" onClick={handleLogout}>
            LogOut
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
