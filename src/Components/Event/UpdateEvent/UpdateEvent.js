import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { singleEvent } from "../../../GraphQL/Query";
import Navbar from "../../Navbar/Navbar";
import EventForm from "../EventForm/EventForm";

const UpdateEvent = () => {
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
  return (
    <div>
      <Navbar />
      <EventForm event={event} />
    </div>
  );
};

export default UpdateEvent;
