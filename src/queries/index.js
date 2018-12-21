import gql from 'graphql-tag';


export const LOGIN_MUTATION = gql`
  mutation loginMutation(
    $email: String!
    $password: String!
  ) {
    signinUser(
      email: {
        email: $email
        password: $password
      }
    ) {
      token
      user {
        id
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signupMutation(
    $email: String!
    $password: String!
  ) {
    createUser(
      authProvider: {
        email: {
          email: $email
          password: $password
        }
      }
    ) {
      id
    }
  }
`;

export const GET_LINKNODES_VAR_QUERY = gql`
  query allLinkNodesFilter (
    $filter: LinkNodeFilter
  ) {
    allLinkNodes(
      filter: $filter
    ) {
      id
      title
      description
      link
      tags {
        id
        title
      }
      ratings {
        id
        score
        user {
          id
        }
      }
    }
  }
`;

export const GET_LINKNODES_QUERY = gql`
  {
    allLinkNodes {
      id
      title
      description
      link
      tags {
        id
        title
      }
      ratings {
        id
        score
        user {
          id
        }
      }
    }
  }
`;

export const GET_TAGS_QUERY = gql`
  {
    allTags {
      id
      title
    }
  }
`;

export const CREATE_LINKNODE_MUTATION = gql`
  mutation createLinkNodeMutation(
    $title: String!
    $link: String!
    $description: String
    $requiredTime: Int
    $childrenIds: [ID!]
    $tagsIds: [ID!]
    $tags: [LinkNodetagsTag!]
  ) {
    createLinkNode(
      title: $title
      link: $link
      description: $description
      requiredTime: $requiredTime
      childrenIds: $childrenIds
      tagsIds: $tagsIds
      tags: $tags
    ) {
      id
      title
      link
      description
      tags {
        id
        title
      }
      ratings {
        score
      }
    }
  }
`;

export const CREATE_RATING_MUTATION = gql`
  mutation createRatingMutation(
    $nodeId: ID!
    $userId: ID!
    $score: Int!
  ) {
    createRating(
      nodeId: $nodeId
      userId: $userId
      score: $score
    ) {
      id
    }
  }
`;

export const UPDATE_RATING_MUTATION = gql`
  mutation updateRatingMutation(
    $id: ID!
    $score: Int!
  ) {
    updateRating(
      id: $id
      score: $score
    ) {
      id
    }
  }
`;