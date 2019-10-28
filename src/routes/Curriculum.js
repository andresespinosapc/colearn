import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Loader, List } from 'semantic-ui-react';
import { GET_CURRICULUM_QUERY } from '../queries';


class Curriculum extends React.Component {
  render() {
    const { curriculumId } = this.props.match.params;

    return (
      <Query
        query={GET_CURRICULUM_QUERY}
        variables={{ id: curriculumId }}
      >
        {({ loading, error, data }) => {
          if (error) console.log(error);
          if (loading) return <Loader active inline='centered' />;

          return (
            <List divided relaxed>
              {data.Curriculum.linkNodes.map(node => (
                <List.Item key={node.id}>
                  <List.Content>
                    <List.Header href={node.link} target="_blank">{node.title}</List.Header>
                    <List.Description>{node.description}</List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          )
        }}
      </Query>
    )
  }
}

export default Curriculum;
