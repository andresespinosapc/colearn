import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Label, Icon } from 'semantic-ui-react';
import LinkNodeRating from '../components/LinkNodeRating';


const LinkNodeCard = ({ node, onClick, onRequirementsClick, onDependeesClick }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header href={node.link} target="_blank">{node.title}</Card.Header>
        <div style={{ marginTop: 5, marginBottom: 5 }}>
          <LinkNodeRating node={node} />
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
        <div className='ui three tiny buttons'>
          <Button basic color='red' onClick={() => onRequirementsClick(node.id)}>
            Requisitos
          </Button>
          <Button basic color="blue" onClick={() => onClick(node.id)}>
            <Icon name="comment outline" />
            {node._commentsMeta.count}
          </Button>
          <Button basic color='green' onClick={() => onDependeesClick(node.id)}>
            Requisito de
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}

LinkNodeCard.propTypes = {
  onRequirementsClick: PropTypes.func,
  onDependeesClick: PropTypes.func,
};

LinkNodeCard.defaultProps = {
  onRequirementsClick: () => {},
  onDependeesClick: () => {},
};

export default LinkNodeCard;