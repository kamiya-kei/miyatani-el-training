import { gql } from '@apollo/client';

const TASK_FRAGMENT = gql`
  fragment TaskFragment on Task {
    id
    title
    description
    deadline
    done {
      id
      text
    }
    priorityNumber
    createdAt
  }
`;

export const GQL_TASKS = gql`
  ${TASK_FRAGMENT}
  query tasks(
    $page: Int
    $word: String
    $doneIds: [ID!]
    $sortType: String
    $isAsc: Boolean
    $target: String
  ) {
    tasks(
      page: $page
      word: $word
      doneIds: $doneIds
      sortType: $sortType
      isAsc: $isAsc
      target: $target
    ) {
      tasks {
        ...TaskFragment
      }
      count
      maxPage
    }
  }
`;

export const GQL_TASK = gql`
  ${TASK_FRAGMENT}
  query task($id: ID!) {
    task(id: $id) {
      ...TaskFragment
    }
  }
`;

export const GQL_CREATE_TASK = gql`
  ${TASK_FRAGMENT}
  mutation createTask(
    $title: String!
    $description: String
    $deadline: String
    $doneId: ID
    $priorityNumber: Int
  ) {
    createTask(
      input: {
        title: $title
        description: $description
        deadline: $deadline
        doneId: $doneId
        priorityNumber: $priorityNumber
      }
    ) {
      task {
        ...TaskFragment
      }
    }
  }
`;

export const GQL_UPDATE_TASK = gql`
  ${TASK_FRAGMENT}
  mutation updateTask(
    $id: ID!
    $title: String
    $description: String
    $deadline: String
    $doneId: ID
    $priorityNumber: Int
  ) {
    updateTask(
      input: {
        id: $id
        title: $title
        description: $description
        deadline: $deadline
        doneId: $doneId
        priorityNumber: $priorityNumber
      }
    ) {
      task {
        ...TaskFragment
      }
    }
  }
`;

export const GQL_DELETE_TASK = gql`
  ${TASK_FRAGMENT}
  mutation deleteTask($id: ID!) {
    deleteTask(input: { id: $id }) {
      task {
        ...TaskFragment
      }
    }
  }
`;

const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    name
    createdAt
  }
`;

export const GQL_USER_SIGNED_IN = gql`
  ${USER_FRAGMENT}
  {
    userSignedIn {
      ...UserFragment
    }
  }
`;

export const GQL_SIGN_IN = gql`
  ${USER_FRAGMENT}
  mutation signIn($name: String!, $password: String!) {
    signIn(input: { name: $name, password: $password }) {
      user {
        ...UserFragment
      }
    }
  }
`;

export const GQL_SIGN_OUT = gql`
  ${USER_FRAGMENT}
  mutation {
    signOut(input: {}) {
      user {
        ...UserFragment
      }
    }
  }
`;

export const GQL_CREATE_USER = gql`
  ${USER_FRAGMENT}
  mutation createUser(
    $name: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    createUser(
      input: {
        name: $name
        password: $password
        passwordConfirmation: $passwordConfirmation
      }
    ) {
      user {
        ...UserFragment
      }
    }
  }
`;

export const GQL_DELETE_USER = gql`
  ${USER_FRAGMENT}
  mutation {
    deleteUser(input: {}) {
      user {
        ...UserFragment
      }
    }
  }
`;

// for admin -------------------------------

export const GQL_USER = gql`
  ${USER_FRAGMENT}
  query user($id: ID!) {
    user(id: $id) {
      ...UserFragment
    }
  }
`;

export const GQL_USERS = gql`
  ${USER_FRAGMENT}
  {
    users {
      ...UserFragment
      tasksCount
    }
  }
`;

export const GQL_ADMIN_CREATE_USERS = gql`
  ${USER_FRAGMENT}
  mutation adminCreateUser(
    $name: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    adminCreateUser(
      input: {
        name: $name
        password: $password
        passwordConfirmation: $passwordConfirmation
      }
    ) {
      user {
        ...UserFragment
      }
    }
  }
`;

export const GQL_ADMIN_UPDATE_USER = gql`
  ${USER_FRAGMENT}
  mutation adminUpdateUser(
    $id: ID!
    $name: String
    $password: String
    $passwordConfirmation: String
  ) {
    adminUpdateUser(
      input: {
        id: $id
        name: $name
        password: $password
        passwordConfirmation: $passwordConfirmation
      }
    ) {
      user {
        ...UserFragment
      }
    }
  }
`;

export const GQL_ADMIN_DELETE_USER = gql`
  ${USER_FRAGMENT}
  mutation adminDeleteUser($id: ID!) {
    adminDeleteUser(input: { id: $id }) {
      user {
        ...UserFragment
      }
    }
  }
`;
