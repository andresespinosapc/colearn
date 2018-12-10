import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Label } from 'semantic-ui-react';
import '../App.css';


const SelectableLinkNodeCard = ({ node, selected, onClick }) => (
  <Card onClick={onClick} className="selectable">
    <Card.Content>
      <Card.Header>
        {node.title}
        <Icon
          name={`check circle${selected ? '' : ' outline'}`}
          size="big"
          className="right floated"
          color={selected ? 'blue' : undefined}
        />
      </Card.Header>
      {/* <div style={{ marginTop: 5, marginBottom: 5 }}>
        <Rating
          icon='star'
          defaultRating={node.ratings.length && node.ratings.reduce((prev, cur) => prev + cur.score) / node.ratings.length}
          maxRating={5}
        />
      </div> */}
      <div style={{ marginTop: 5, marginBottom: 5 }}>
        {node.tags.map(tag => (
          <Label key={tag.id} size="tiny" className="extraMargin">{tag.title}</Label>
        ))}
      </div>
      <Card.Description>
        {node.description}
      </Card.Description>
    </Card.Content>
  </Card>
);

SelectableLinkNodeCard.propTypes = {
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

SelectableLinkNodeCard.defaultProps = {
  selected: false,
  onClick: () => {},
};

export default SelectableLinkNodeCard;