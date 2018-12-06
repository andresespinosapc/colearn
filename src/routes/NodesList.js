import React from 'react';
import { Card, Button, Label, Container, Rating, Menu, Input } from 'semantic-ui-react';


class NodesList extends React.Component {
  render() {
    return (
      <Container>
        <Card>
          <Card.Content>
            <Card.Header>Insight Timer</Card.Header>
            <div style={{ marginTop: 5, marginBottom: 5 }}>
              <Rating icon='star' defaultRating={4} maxRating={5} />
            </div>
            <div style={{ marginTop: 5, marginBottom: 5 }}>
              <Label size="tiny" className="extraMargin">app</Label>
              <Label size="tiny">meditacion</Label>
            </div>
            <Card.Description>
              Aplicación que tiene hartas meditaciones buenas
                </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='red'>
                Requisitos
                </Button>
              <Button basic color='green'>
                Siguiente
                </Button>
            </div>
          </Card.Content>
        </Card>
      </Container>
    );
  }
}

export default NodesList;