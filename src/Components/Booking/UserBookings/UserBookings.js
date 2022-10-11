import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { USER_BOOKINGS } from "../../../GraphQL/Query";
import ViewBookings from "../ViewBookings/ViewBookings";

const UserBookings = () => {
  const userId = localStorage.getItem("userId");
  const [bookings, setBookings] = useState([]);
  const { loading, error, data } = useQuery(USER_BOOKINGS, {
    variables: { userId },
    onCompleted: (data) => {
      setBookings(data.bookingsByUser);
    },
    onError: (errors) => {
      if (errors.message) {
        alert(errors.message);
        setBookings([]);
      }
    },
  });
  return (
    <div>
      <ViewBookings bookings={bookings} />
    </div>
  );
};

export default UserBookings;
