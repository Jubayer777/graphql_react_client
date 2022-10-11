import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_EVENT, UPDATE_EVENT } from "../../../GraphQL/Mutation";
import { allEvents } from "../../../GraphQL/Query";

const EventForm = ({ event }) => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    price: 0,
    date: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "price") {
      setInputData({
        ...inputData,
        [e.target.name]: parseFloat(e.target.value),
      });
    } else {
      setInputData({
        ...inputData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const [createEvent] = useMutation(CREATE_EVENT, {
    onCompleted: (data) => {
      navigate("/viewEvents");
    },
    onError: (errors) => {
      if (errors.message) {
        alert(errors.message);
        setInputData({
          title: "",
          description: "",
          price: 0,
          date: "",
        });
        document.getElementById("myForm").reset();
      }
    },
  });
  const addEvent = (e) => {
    e.preventDefault();
    const isNonEmpty = !Object.values(inputData).some(
      (x) => x === null || x === ""
    );
    if (isNonEmpty) {
      createEvent({
        variables: inputData,
        refetchQueries: [{ query: allEvents }],
      });
    } else {
      alert("filed empty");
    }
  };

  const [updateEvent] = useMutation(UPDATE_EVENT, {
    onCompleted: (data) => {
      alert("updated successfully");
      navigate("/viewEvents");
    },
    onError: (errors) => {
      if (errors.message) {
        alert(errors.message);
        setInputData({
          title: "",
          description: "",
          price: 0,
          date: "",
        });
      }
    },
  });

  const updateHandler = (e) => {
    e.preventDefault();
    const newEvent = {};
    if (inputData.title) {
      newEvent.title = inputData.title;
    }
    if (inputData.description) {
      newEvent.description = inputData.description;
    }
    if (inputData.date) {
      newEvent.date = inputData.date;
    }
    if (inputData.price) {
      newEvent.price = inputData.price;
    }
    newEvent.eventId = event._id;
    updateEvent({
      variables: newEvent,
      refetchQueries: [{ query: allEvents }],
    });
  };
  return (
    <div className="createBody">
      {event ? <h2>Update Event</h2> : <h2>Create Event</h2>}
      <form onSubmit={event ? updateHandler : addEvent} id="myForm">
        <div className="inputSection">
          <label className="inputLabel">Title</label>
          <input
            className="inputField"
            defaultValue={event?.title}
            type="text"
            name="title"
            onInput={handleChange}
          />
        </div>
        <div className="inputSection">
          <label className="inputLabel">Description</label>
          <textarea
            className="inputField"
            defaultValue={event?.description}
            style={{ height: "100px" }}
            type="text"
            name="description"
            onInput={handleChange}
          />
        </div>
        <div className="inputSection">
          <label className="inputLabel">Price</label>
          <input
            className="inputField"
            type="text"
            defaultValue={event?.price}
            name="price"
            onInput={handleChange}
          />
        </div>
        <div className="inputSection">
          <label className="inputLabel">Date</label>
          <input
            className="inputField"
            defaultValue={event?.date}
            name="date"
            type="date"
            onInput={handleChange}
          />
        </div>
        <button className="btn" type="submit">
          {event ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
