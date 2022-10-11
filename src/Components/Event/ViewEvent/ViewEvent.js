import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { allEvents } from "../../../GraphQL/Query";
import eventImg from "../../../images/event.png";
import "./viewEvent.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import { DELETE_EVENT } from "../../../GraphQL/Mutation";

const ViewEvent = () => {
  const userRole = localStorage.getItem("userRole");
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const { loading, error, data } = useQuery(allEvents, {
    onCompleted: (data) => {
      setEvents(data.events);
    },
    onError: (errors) => {
      if (errors.message) {
        alert(errors.message);
        setEvents([]);
      }
    },
  });
  const handleDetails = (id) => {
    navigate(`/event/${id}`);
  };

  const [deleteEvent] = useMutation(DELETE_EVENT, {
    onCompleted: (data) => {
      alert(data.deleteEvent);
    },
    onError: (errors) => {
      if (errors.message) {
        alert(errors.message);
      }
    },
  });

  const handleDelete = (eventId) => {
    deleteEvent({
      variables: {
        eventId: eventId,
      },
      refetchQueries: [{ query: allEvents }],
    });
  };
  return (
    <>
      <Navbar />
      <h1 className="pageHeader">All Events</h1>
      <div className="viewContainer">
        {events?.map((e) => (
          <div key={e._id} className="viewCard">
            <img className="eventImg" src={eventImg} />
            <div className="viewInfoDiv">
              <h4>Title: {e.title}</h4>
              <p>Description: {e.description}</p>
              <h5>Price: {e.price}</h5>
              <p>Creator: {e.creator.email}</p>
              <div className="eventBtnDiv">
                <button onClick={() => handleDetails(e._id)} className="btn">
                  Details
                </button>
                {(userRole === "admin" || userRole === "superAdmin") && (
                  <button onClick={() => handleDelete(e._id)} className="btn">
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {events.length < 1 && <p className="noFound">No item found...</p>}
    </>
  );
};

export default ViewEvent;
