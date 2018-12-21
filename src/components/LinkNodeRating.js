import React from 'react';
import { Mutation } from 'react-apollo';
import { Rating } from 'semantic-ui-react';
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

const LinkNodeRating = ({ node }) => {
  const userId = localStorage.getItem(USER_ID);
  const { alreadyRatedId, rating: defaultRating } = getUserRatingOrAvg(node, userId);

  return (
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
  );
};

export default LinkNodeRating;