import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { CREATE_NODE_MUTATION } from '../queries';
import { Redirect } from 'react-router-dom';


class CreateNode extends React.Component {
  state = {
    redirect: false,
    loading: false,
    title: '',
    link: '',
    description: '',
    requiredTime: '',
  };

  handleError = (error) => {
    this.setState({ loading: false });

    console.log(error.graphQLErrors);
  }

  render() {
    const { redirect, loading, title, link, description, requiredTime } = this.state;

    if (redirect) return <Redirect to='/' />

    return (
      <Form>
        <Form.Field>
          <label>Título</label>
          <input placeholder='Título' value={title} onChange={event => this.setState({ title: event.target.value })} />
        </Form.Field>
        <Form.Field>
          <label>Link</label>
          <input placeholder='Link' value={link} onChange={event => this.setState({ link: event.target.value })} />
        </Form.Field>
        <Form.Field>
          <label>Descripción</label>
          <input placeholder='Descripción' value={description} onChange={event => this.setState({ description: event.target.value })} />
        </Form.Field>
        <Form.Field>
          <label>Tiempo requerido</label>
          <input placeholder='Tiempo requerido' value={requiredTime} onChange={event => this.setState({ requiredTime: event.target.value })} />
        </Form.Field>
        <Mutation
          mutation={CREATE_NODE_MUTATION}
          variables={{ title, link, description, requiredTime }}
          onCompleted={() => this.setState({ loading: false, redirect: true })}
          onError={this.handleError}
        >
          {postMutation => (
            <Button loading={loading} type='submit' onClick={() => {
              this.setState({ loading: true });
              postMutation();
            }}>Submit</Button>
          )}
        </Mutation>
      </Form>
    )
  }
}

export default CreateNode;