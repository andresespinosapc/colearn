import React from 'react';
import { Comment, Modal, Label, Header, Divider } from 'semantic-ui-react';
import LinkNodeRating from './LinkNodeRating';
import Moment from 'moment';


const getAvatarUrl = i => {
  let fileName;
  if (i % 2 === 0) {
    fileName = `woman${(i / 2) % 4 + 1}.png`;
  } else {
    fileName = `man${((i - 1) / 2) % 4 + 1}.png`;
  }

  return `/defaultAvatars/${fileName}`;
};

const LinkNodeDetails = ({ node }) => (
  <React.Fragment>
    <Modal.Header href={node.link} target="_blank">
      {node.title}
      <div>
        <LinkNodeRating node={node} />
      </div>
      <div>
        {node.tags.map(tag => (
          <Label key={tag.id} size="tiny" className="extraMargin">{tag.title}</Label>
        ))}
      </div>
    </Modal.Header>
    <Modal.Content>
      {node.description}
      <Divider />
      <Header>
        Comentarios
        </Header>
      <Comment.Group>
        {node.comments.map((comment, i) => (
          <Comment key={comment.id}>
            <Comment.Avatar src={getAvatarUrl(i)} />
            <Comment.Content>
              <Comment.Author>{comment.user.email}</Comment.Author>
              <Comment.Metadata>{Moment(comment.createdAt).format('DD/MM/YYYY')}</Comment.Metadata>
              <Comment.Text>{comment.body}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}
      </Comment.Group>
    </Modal.Content>
  </React.Fragment>
);

export default LinkNodeDetails;