import { useMutation } from "@apollo/client";
import React from "react";
import { CANCEL_BOOKING, UPDATE_BOOKING } from "../../../GraphQL/Mutation";
import { allBookings, USER_BOOKINGS } from "../../../GraphQL/Query";
import bookingImg from "../../../images/booking.png";
import Navbar from "../../Navbar/Navbar";
import "./booking.css";

const ViewBookings = ({ bookings }) => {
  const userRole = localStorage.getItem("userRole");
  const [cancelBooking] = useMutation(CANCEL_BOOKING, {
    onCompleted: (data) => {
      alert(data.cancelBooking);
    },
    onError: (errors) => {
      if (errors.message) {
        alert(errors.message);
      }
    },
  });
  const userId = localStorage.getItem("userId");
  const handleDelete = (bookingId) => {
    cancelBooking({
      variables: {
        bookingId: bookingId,
      },
      refetchQueries:
        userRole === "admin"
          ? [{ query: allBookings }]
          : [{ query: USER_BOOKINGS, variables: { userId } }],
    });
  };

  const [updateBooking] = useMutation(UPDATE_BOOKING, {
    onCompleted: (data) => {
      alert(data.updateBooking);
    },
    onError: (errors) => {
      if (errors.message) {
        alert(errors.message);
      }
    },
  });
  const handleStatus = (e, id) => {
    const newBooking = {
      bookingId: id,
      status: e.target.value,
    };
    updateBooking({
      variables: newBooking,
      refetchQueries: [{ query: allBookings }],
    });
  };
  return (
    <>
      <Navbar />
      <h1 className="pageHeader">
        {userRole === "admin" || userRole === "superAdmin"
          ? "All Bookings"
          : "Your Bookings"}
      </h1>
      <div className="viewContainer">
        {bookings?.map((b,i) => (
          <div key={i} className="viewCard">
            <div key={b._id}>
              <img className="bookingImg" src={bookingImg} />
              <div className="viewInfoDiv">
                <h4>Event: {b.event.title}</h4>
                <p>User-email: {b.user.email}</p>
                {userRole === "admin" || userRole === "superAdmin" ? (
                  <select
                    name="status"
                    className="statusDrop"
                    onChange={(e) => handleStatus(e, b._id)}
                    defaultValue={b.status}
                  >
                    <option value="pending">pending</option>
                    <option value="onProgress">onProgress</option>
                    <option value="done">done</option>
                  </select>
                ) : (
                  <p>Status: {b.status}</p>
                )}
              </div>
            </div>
            <div className="bookingBtn">
              {(userRole === "admin" ||
                userRole === "superAdmin" ||
                (userRole === "user" && b.status === "pending")) && (
                <button className="bookBtn" onClick={() => handleDelete(b._id)}>
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {bookings.length < 1 && <p className="noFound">No item found...</p>}
    </>
  );
};

export default ViewBookings;
