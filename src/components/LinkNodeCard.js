import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Card, Button, Label, Rating } from 'semantic-ui-react';
import { CREATE_RATING_MUTATION, UPDATE_RATING_MUTATION } from '../queries';
import { USER_ID } from '../constants';


const getUserRatingOrAvg = (node, userId) => {
  const ratingsCount = node.ratings.length;
  if (ratingsCount >= 1) {
    let ratingSum = 0;
    for (let i = 0; i < node.ratings.length; ++i) {
      const curRating = node.ratings[i];
      if (curRating.user.id === userId) {
        return { alreadyRatedId: curRating.id, rating: curRating.score };
      } else {
        ratingSum += curRating.score;
      }
    }

    return { alreadyRatedId: null, rating: ratingSum / ratingsCount };
  } else {
    return { alreadyRatedId: null, rating: 0 };
  }
}

const LinkNodeCard = ({ node, onRequirementsClick, onDependeesClick }) => {
  const userId = localStorage.getItem(USER_ID);
  const { alreadyRatedId, rating: defaultRating } = getUserRatingOrAvg(node, userId);

  return (
    <Card>
      <Card.Content>
        <Card.Header href={node.link} target="_blank">{node.title}</Card.Header>
        <div style={{ marginTop: 5, marginBottom: 5 }}>
          <Mutation mutation={alreadyRatedId ? UPDATE_RATING_MUTATION : CREATE_RATING_MUTATION}>
            {ratingMutation => (
              <Rating
                icon='star'
                defaultRating={defaultRating}
                maxRating={5}
                onRate={(e, { rating }) => {
                  const userId = localStorage.getItem(USER_ID);

                  let errors = [];
                  if (!userId) errors.push('Tienes que estar logueado');
                  if (errors.length) console.log(errors);
                  else {
                    const variables = alreadyRatedId ? {
                      id: alreadyRatedId,
                      score: rating,
                    } : {
                      nodeId: node.id,
                      userId,
                      score: rating,
                    };

                    ratingMutation({ variables });
                  }
                }}
              />
            )}
          </Mutation>
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