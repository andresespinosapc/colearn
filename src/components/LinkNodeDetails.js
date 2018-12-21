import React from 'react';
import { Grid, Input, Dropdown, Form, Button, Message, Modal, Label, Icon, Rating } from 'semantic-ui-react';


const LinkNodeDetails = ({ node }) => (
  <Modal open>
    <Modal.Header href={node.link} target="_blank">{node.title}</Modal.Header>
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
  </Modal>
);

export default LinkNodeDetails;