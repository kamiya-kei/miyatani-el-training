import { gql } from '@apollo/client';

const TASK_FRAGMENT = gql`
  fragment TaskFragment on Task {
    id
    title
    description
    priorityNumber
    done {
      id
      text
    }
    labels {
      id
      name
    }
    deadline
    createdAt
  }
`;

export const GQL_TASKS = gql`
  ${TASK_FRAGMENT}
  query tasks(
    $userId: ID
    $page: Int
    $word: String
    $doneIds: [ID!]
    $sortType: String
    $isAsc: Boolean
    $target: String
  ) {
    tasks(
      userId: $userId
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
    $labelIds: [ID!]
  ) {
    createTask(
      input: {
        title: $title
        description: $description
        deadline: $deadline
        doneId: $doneId
        priorityNumber: $priorityNumber
        labelIds: $labelIds
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
    $labelIds: [ID!]
  ) {
    updateTask(
      input: {
        id: $id
        title: $title
        description: $description
        deadline: $deadline
        doneId: $doneId
        priorityNumber: $priorityNumber
        labelIds: $labelIds
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
    role {
      id
      text
    }
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
    $roleId: ID!
  ) {
    adminCreateUser(
      input: {
        name: $name
        password: $password
        passwordConfirmation: $passwordConfirmation
        roleId: $roleId
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
    $roleId: ID
  ) {
    adminUpdateUser(
      input: {
        id: $id
        name: $name
        password: $password
        passwordConfirmation: $passwordConfirmation
        roleId: $roleId
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

const LABEL_FRAGMENT = gql`
  fragment LabelFragment on Label {
    id
    name
  }
`;

export const GQL_LABELS = gql`
  ${LABEL_FRAGMENT}
  query labels {
    labels {
      ...LabelFragment
    }
  }
`;

export const GQL_CREATE_LABEL = gql`
  ${LABEL_FRAGMENT}
  mutation createLabel($name: String!) {
    createLabel(input: { name: $name }) {
      labels {
        ...LabelFragment
      }
    }
  }
`;

export const GQL_UPDATE_LABEL = gql`
  ${LABEL_FRAGMENT}
  mutation updateLabel($id: ID!, $name: String!) {
    updateLabel(input: { id: $id, name: $name }) {
      labels {
        ...LabelFragment
      }
    }
  }
`;

export const GQL_DELETE_LABEL = gql`
  ${LABEL_FRAGMENT}
  mutation deleteLabel($id: ID!) {
    deleteLabel(input: { id: $id }) {
      labels {
        ...LabelFragment
      }
    }
  }
`;
