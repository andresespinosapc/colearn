import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Segment, Container, Loader, Card } from 'semantic-ui-react';
import { GET_CURRICULA_QUERY } from '../queries';


class CurriculaList extends React.Component {
  renderCardGroup = (curricula) => {
    if (curricula.length === 0) {
      return (
        <Segment>
          Nada que mostrar
        </Segment>
      )
    }

    return (
      <React.Fragment>
        <Card.Group centered>
          {curricula.map(curriculum => (
            <Card key={curriculum.id}>
              <Card.Content>
                <Card.Header href={`curriculum/${curriculum.id}`}>{curriculum.title}</Card.Header>
                <Card.Description>{curriculum.description}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </React.Fragment>
    );
  };

  render() {
    return (
      <Container>
        <Query query={GET_CURRICULA_QUERY}>
          {({ loading, error, data }) => {
            if (error) console.log(error);
            if (loading) return <Loader active inline='centered' />;

            return this.renderCardGroup(data.allCurricula);
          }}
        </Query>
      </Container>
    )
  }
}

export default CurriculaList;