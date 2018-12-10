import React from 'react';
import { Card, Button, Label, Rating } from 'semantic-ui-react';


const LinkNodeCard = ({ node }) => (
  <Card href={node.link} target="_blank">
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
);

export default LinkNodeCard;