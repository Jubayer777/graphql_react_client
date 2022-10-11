import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { allBookings } from "../../../GraphQL/Query";
import ViewBookings from "../ViewBookings/ViewBookings";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { loading, error, data } = useQuery(allBookings, {
    onCompleted: (data) => {
      setBookings(data.bookings);
    },
    onError: (errors) => {
      if (errors.message) {
        // alert(errors.message);
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

export default AllBookings;
