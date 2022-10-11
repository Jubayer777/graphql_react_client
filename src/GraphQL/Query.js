import { gql } from "@apollo/client";
export const allEvents = gql`
  query {
    events {
      _id
      title
      description
      price
      creator {
        email
      }
    }
  }
`;
export const singleEvent = gql`
  query event($eventId: ID!) {
    event(eventId: $eventId) {
      _id
      title
      description
      price
      date
      creator {
        email
      }
    }
  }
`;
export const LOGIN_USER = gql`
  query loginUser($email: String!, $password: String!) {
    loginUser(userInput: { email: $email, password: $password }) {
      _id
      accessToken
      email
      role {
        title
      }
    }
  }
`;
export const allUsers = gql`
  query {
    users {
      _id
      email
      role {
        _id
        title
      }
      createdEvents {
        title
      }
    }
  }
`;

export const allBookings = gql`
  query {
    bookings {
      _id
      status
      event {
        title
      }
      user {
        email
      }
    }
  }
`;

export const USER_BOOKINGS = gql`
  query bookingsByUser($userId: ID!) {
    bookingsByUser(userId: $userId) {
      _id
      status
      event {
        title
        description
        price
      }
      user {
        email
      }
    }
  }
`;

export const allRoles = gql`
  query {
    roles {
      _id
      title
      users {
        _id
        email
      }
    }
  }
`;
