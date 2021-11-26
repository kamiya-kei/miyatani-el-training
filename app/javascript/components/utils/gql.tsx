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

export const GQL_USER_SIGNED_IN = gql`
  {
    userSignedIn {
      id
      name
    }
  }
`;

export const GQL_SIGN_IN = gql`
  mutation signIn($name: String!, $password: String!) {
    signIn(input: { name: $name, password: $password }) {
      user {
        id
        name
      }
    }
  }
`;

export const GQL_SIGN_OUT = gql`
  mutation {
    signOut(input: {}) {
      user {
        id
        name
      }
    }
  }
`;

export const GQL_CREATE_USER = gql`
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
        id
        name
      }
    }
  }
`;

export const GQL_DELETE_USER = gql`
  mutation {
    deleteUser(input: {}) {
      user {
        id
        name
      }
    }
  }
`;
