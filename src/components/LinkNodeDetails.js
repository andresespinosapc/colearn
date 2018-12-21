import React from 'react';
import { Form, Button, Comment, Modal, Label, Header, Divider } from 'semantic-ui-react';
import LinkNodeRating from './LinkNodeRating';
import Moment from 'moment';
import { Mutation } from 'react-apollo';
import { CREATE_COMMENT_MUTATION, GET_LINKNODE_QUERY } from '../queries';
import { USER_ID } from '../constants';


const getAvatarUrl = i => {
  let fileName;
  if (i % 2 === 0) {
    fileName = `woman${(i / 2) % 4 + 1}.png`;
  } else {
    fileName = `man${((i - 1) / 2) % 4 + 1}.png`;
  }

  return `/defaultAvatars/${fileName}`;
};

class LinkNodeDetails extends React.Component {
  state = {
    commentText: '',
    creatingComment: false,
  }

  render() {
    const { node } = this.props;
    const { commentText, creatingComment } = this.state;

    const userId = localStorage.getItem(USER_ID);

    return (
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
          <Mutation
            mutation={CREATE_COMMENT_MUTATION}
            variables={{
              linkNodeId: node.id,
              userId,
              body: commentText,
            }}
            update={(store, { data: { createComment } }) => {
              const data = store.readQuery({ query: GET_LINKNODE_QUERY, variables: { id: node.id } })

              data.LinkNode = {
                ...data.LinkNode,
                comments: [...data.LinkNode.comments, {
                  __typename: 'Comment',
                  id: createComment.id,
                  likes: 0,
                  user: {
                    __typename: 'User',
                    email: 'You',
                  },
                  createdAt: Date.now(),
                  body: commentText,
                }],
              };

              store.writeQuery({ query: GET_LINKNODE_QUERY, variables: { id: node.id }, data })
            }}
            onCompleted={() => {
              this.setState({ creatingComment: false, commentText: '' });
            }}
            // onError={this.handleError}
          >
            {createCommentMutation => (
              <Form reply onSubmit={() => {
                this.setState({ creatingComment: true });
                createCommentMutation();
              }}>
                <Form.TextArea value={commentText} onChange={(e, { value }) => this.setState({ commentText: value })} />
                <Button loading={creatingComment} content='Comentar' labelPosition='left' icon='edit' primary />
              </Form>
            )}
          </Mutation>
        </Modal.Content>
      </React.Fragment>
    );
  }
}

export default LinkNodeDetails;