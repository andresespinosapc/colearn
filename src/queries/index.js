import gql from 'graphql-tag';


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
        score
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
    $tagsIds: [ID!]
    $tags: [LinkNodetagsTag!]
  ) {
    createLinkNode(
      title: $title
      link: $link
      description: $description
      requiredTime: $requiredTime
      tagsIds: $tagsIds
      tags: $tags
    ) {
      id
      title
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