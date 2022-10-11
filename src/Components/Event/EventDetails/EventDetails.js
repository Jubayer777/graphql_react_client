import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CREATE_BOOKING } from "../../../GraphQL/Mutation";
import { singleEvent, USER_BOOKINGS } from "../../../GraphQL/Query";
import eventImg from "../../../images/event.png";
import Navbar from "../../Navbar/Navbar";
import "./EventDetails.css";

const EventDetails = () => {
  const userRole = localStorage.getItem("userRole");
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [event, setEvent] = useState({});
  const { loading, error, data } = useQuery(singleEvent, {
    variables: {
      eventId: eventId,
    },
    onCompleted: (data) => {
      setEvent(data.event);
    },
    onError: (errors) => {
      if (errors.message) {
        alert(errors.message);
        setEvent({});
      }
    },
  });

  const [bookEvent] = useMutation(CREATE_BOOKING, {
    onCompleted: (data) => {
      alert("booking successful");
      navigate("/bookings");
    },
    onError: (errors) => {
      if (errors.message) {
        alert(errors.message);
      }
    },
  });
  const userId = localStorage.getItem("userId");
  const handleBooking = () => {
    if (eventId) {
      bookEvent({
        variables: { eventId },
        refetchQueries: [{ query: USER_BOOKINGS, variables: { userId } }],
      });
    } else {
      alert("Invalid information");
    }
  };

  const handleUpdate = () => {
    navigate(`/updateEvent/${eventId}`);
  };

  return (
    <>
      <Navbar />
      <h1 className="pageHeader">Event Details</h1>
      <div className="detailsContainer">
        {event && (
          <div className="detailsCard">
            <img className="eventImg" src={eventImg} />
            <div className="detailsInfoDiv">
              <h4>Title: {event.title}</h4>
              <p>Description: {event.description}</p>
              <h5>Price: {event.price}</h5>
              <p>Creator: {event.creator?.email}</p>
            </div>
            {userRole === "admin" || userRole === "superAdmin" ? (
              <button className="bookBtn" onClick={handleUpdate}>
                Update
              </button>
            ) : (
              <button className="bookBtn" onClick={handleBooking}>
                Book
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default EventDetails;
