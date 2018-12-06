import gql from 'graphql-tag';


export const GET_NODES_QUERY = gql`
  {
    allNodes {
      id
      title
      description
      tags {
        title
      }
      ratings {
        score
      }
    }
  }
`;

export const CREATE_NODE_MUTATION = gql`
  mutation createNodeMutation(
    $title: String!
    $link: String!
    $description: String
    $requiredTime: Int
  ) {
    createNode(
      title: $title
      link: $link
      description: $description
      requiredTime: $requiredTime
    ) {
      id
    }
  }
`;