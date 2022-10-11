import { gql } from "@apollo/client";
export const CREATE_USER = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(userInput: { email: $email, password: $password }) {
      _id
      accessToken
      email
      role {
        title
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId)
  }
`;

export const CREATE_EVENT = gql`
  mutation createEvent(
    $title: String!
    $description: String!
    $price: Float!
    $date: String!
  ) {
    createEvent(
      eventInput: {
        title: $title
        description: $description
        price: $price
        date: $date
      }
    ) {
      title
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation updateEvent(
    $title: String
    $description: String
    $price: Float
    $date: String
    $eventId: ID!
  ) {
    updateEvent(
      eventInput: {
        title: $title
        description: $description
        price: $price
        date: $date
        eventId: $eventId
      }
    ) {
      title
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation deleteEvent($eventId: ID!) {
    deleteEvent(eventId: $eventId)
  }
`;

export const CREATE_BOOKING = gql`
  mutation bookEvent($eventId: ID!) {
    bookEvent(eventId: $eventId) {
      _id
    }
  }
`;

export const CANCEL_BOOKING = gql`
  mutation cancelBooking($bookingId: ID!) {
    cancelBooking(bookingId: $bookingId)
  }
`;

export const UPDATE_BOOKING = gql`
  mutation updateBooking($bookingId: ID!, $status: String!) {
    updateBooking(bookingInput: { bookingId: $bookingId, status: $status })
  }
`;

export const CREATE_ROLE = gql`
  mutation createRole($roleName: String!) {
    createRole(roleName: $roleName) {
      _id
      title
    }
  }
`;

export const UPDATE_USER_ROLE = gql`
  mutation updateUserRole($userId: ID!, $roleId: ID!) {
    updateUserRole(userRoleInput: { userId: $userId, roleId: $roleId })
  }
`;
