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