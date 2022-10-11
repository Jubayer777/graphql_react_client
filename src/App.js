import ViewEvent from "./Components/Event/ViewEvent/ViewEvent";
import ViewUsers from "./Components/User/ViewUsers/ViewUsers";
import AddEvent from "./Components/Event/AddEvent/AddEvent";
import { useEffect} from "react";
import AddUser from "./Components/User/AddUser/AddUser";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "./Components/User/Login/Login";
import EventDetails from "./Components/Event/EventDetails/EventDetails";
import { PrivateRoute } from "./Components/PrivateRouting/PrivateRoute";
import AllBookings from "./Components/Booking/AllBookings/AllBookings";
import UserBookings from "./Components/Booking/UserBookings/UserBookings";
import UpdateEvent from "./Components/Event/UpdateEvent/UpdateEvent";
import AddRole from "./Components/Role/AddRole/AddRole";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedJwt = parseJwt(token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        window.localStorage.clear();
        if (location.pathname === "/" || location.pathname === "/viewEvents") {
          navigate(location.pathname);
        } else {
          navigate("/login");
        }
      }
    }
  }, [location]);
  const userRole = localStorage.getItem("userRole");
  return (
    <div className="App">
      <Routes>
        <Route path="/signUp" element={<AddUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/viewEvents" element={<ViewEvent />} />
        <Route exact path="/" element={<ViewEvent />} />
        <Route
          path="/event/:eventId"
          element={
            <PrivateRoute>
              <EventDetails />
            </PrivateRoute>
          }
        />
        {userRole === "admin" || userRole === "superAdmin" ? (
          <>
            <Route
              path="/bookings"
              element={
                <PrivateRoute>
                  <AllBookings />
                </PrivateRoute>
              }
            />
            <Route
              path="/viewUsers"
              element={
                <PrivateRoute>
                  <ViewUsers />
                </PrivateRoute>
              }
            />
            <Route
              path="/addEvent"
              element={
                <PrivateRoute>
                  <AddEvent />
                </PrivateRoute>
              }
            />
            <Route
              path="/updateEvent/:eventId"
              element={
                <PrivateRoute>
                  <UpdateEvent />
                </PrivateRoute>
              }
            />
            {userRole === "superAdmin" && (
              <Route
                path="/addRole"
                element={
                  <PrivateRoute>
                    <AddRole />
                  </PrivateRoute>
                }
              />
            )}
          </>
        ) : (
          <Route
            path="/bookings"
            element={
              <PrivateRoute>
                <UserBookings />
              </PrivateRoute>
            }
          />
        )}
      </Routes>
    </div>
  );
}

export default App;
