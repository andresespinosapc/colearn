import React from 'react';
import { Card, Button, Label, Container, Rating, Loader } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { GET_LINKNODES_QUERY } from '../queries';


class NodesList extends React.Component {
  render() {
    return (
      <Container>
        <Query query={GET_LINKNODES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <Loader active inline='centered' />;
            else if (error) return <p>{error}</p>;

            const nodes = data.allLinkNodes;

            return (
              <Card.Group>
                {nodes.map(node => (
                  <Card key={node.id} href={node.link} target="_blank">
                    <Card.Content>
                      <Card.Header>{node.title}</Card.Header>
                      <div style={{ marginTop: 5, marginBottom: 5 }}>
                        <Rating
                          icon='star'
                          defaultRating={node.ratings.length && node.ratings.reduce((prev, cur) => prev + cur.score) / node.ratings.length}
                          maxRating={5}
                        />
                      </div>
                      <div style={{ marginTop: 5, marginBottom: 5 }}>
                        {node.tags.map(tag => (
                          <Label key={tag.id} size="tiny" className="extraMargin">{tag.title}</Label>
                        ))}
                      </div>
                      <Card.Description>
                        {node.description}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <div className='ui two buttons'>
                        <Button basic color='red'>
                          Requisitos
                        </Button>
                        <Button basic color='green'>
                          Requisito de
                        </Button>
                      </div>
                    </Card.Content>
                  </Card>  
                ))}
              </Card.Group>
            )
          }}
        </Query>
      </Container>
    );
  }
}

export default NodesList;