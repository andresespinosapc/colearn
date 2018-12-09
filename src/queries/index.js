import gql from 'graphql-tag';


export const GET_LINKNODES_QUERY = gql`
  {
    allLinkNodes {
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

export const CREATE_LINKNODE_MUTATION = gql`
  mutation createLinkNodeMutation(
    $title: String!
    $link: String!
    $description: String
    $requiredTime: Int
  ) {
    createLinkNode(
      title: $title
      link: $link
      description: $description
      requiredTime: $requiredTime
    ) {
      id
    }
  }
`;