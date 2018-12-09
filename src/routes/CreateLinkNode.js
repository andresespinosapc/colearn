import React from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { CREATE_LINKNODE_MUTATION } from '../queries';
import { Redirect } from 'react-router-dom';


class CreateLinkNode extends React.Component {
  state = {
    errorMessages: [],
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
    const { errorMessages, redirect, loading, title, link, description, requiredTime } = this.state;

    if (redirect) return <Redirect to='/' />

    return (
      <React.Fragment>
        {errorMessages.length > 0 && (
          <Message
            error
            onDismiss={() => this.setState({ errorMessages: [] })}
            header="Hubo errores en la creación del nodo"
            list={errorMessages}
          />
        )}
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
            mutation={CREATE_LINKNODE_MUTATION}
            variables={{
              title,
              link,
              description: description.length === 0 ? null : description,
              requiredTime: requiredTime.length === 0 ? null: +requiredTime }}
            onCompleted={() => this.setState({ loading: false, redirect: true })}
            onError={this.handleError}
          >
            {postMutation => (
              <Button loading={loading} type='submit' onClick={() => {
                let errors = [];
                if (!title.length) errors.push('Tienes que ponerle un título');
                if (!link.length) errors.push('Tienes que poner un link');
                if (isNaN(+requiredTime)) errors.push('El tiempo requerido tiene que ser un número');
                if (errors.length) this.setState({ errorMessages: errors });
                else {
                  this.setState({ loading: true });
                  postMutation();
                }
              }}>Submit</Button>
            )}
          </Mutation>
        </Form>
      </React.Fragment>
    )
  }
}

export default CreateLinkNode;