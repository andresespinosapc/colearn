import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Label, Rating } from 'semantic-ui-react';


const LinkNodeCard = ({ node, onRequirementsClick, onDependeesClick }) => (
  <Card>
    <Card.Content>
      <Card.Header href={node.link} target="_blank">{node.title}</Card.Header>
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
        <Button basic color='red' onClick={() => onRequirementsClick(node.id)}>
          Requisitos
        </Button>
        <Button basic color='green' onClick={() => onDependeesClick(node.id)}>
          Requisito de
        </Button>
      </div>
    </Card.Content>
  </Card>
);

LinkNodeCard.propTypes = {
  onRequirementsClick: PropTypes.func,
  onDependeesClick: PropTypes.func,
};

LinkNodeCard.defaultProps = {
  onRequirementsClick: () => {},
  onDependeesClick: () => {},
};

export default LinkNodeCard;