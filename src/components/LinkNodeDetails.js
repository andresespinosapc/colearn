import React from 'react';
import { Grid, Input, Dropdown, Form, Button, Message, Modal, Label, Icon, Rating } from 'semantic-ui-react';
import LinkNodeRating from './LinkNodeRating';


const LinkNodeDetails = ({ node }) => (
  <Modal open>
    <Modal.Header href={node.link} target="_blank">
      {node.title}
      <LinkNodeRating node={node} />
    </Modal.Header>
  </Modal>
);

export default LinkNodeDetails;