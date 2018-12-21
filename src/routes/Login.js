import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { AUTH_TOKEN, USER_ID } from '../constants';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '../queries';
import { Mutation } from 'react-apollo';


class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    errorMessages: [],
    loading: false,
  }

  render() {
    const { login, email, password, errorMessages, loading } = this.state;

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
          <Form.Input label='Email' placeholder='Email' value={email} onChange={event => this.setState({ email: event.target.value })} />
          <Form.Input type='password' label='Contraseña' placeholder='Contraseña' value={password} onChange={event => this.setState({ password: event.target.value })} />
          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, password }}
            onCompleted={data => this._confirm(data)}
          >
            {postMutation => (
              <React.Fragment>
                <Button color="green" loading={loading} type='submit' onClick={() => {
                  let errors = [];
                  if (!email.length) errors.push('Tienes que poner un email');
                  if (!password.length) errors.push('Tienes que poner tu contraseña');
                  if (errors.length) this.setState({ errorMessages: errors });
                  else {
                    this.setState({ loading: true });
                    postMutation();
                  }
                }}>{login ? 'Entrar' : 'Registrarme'}</Button>
                <Button color="red" onClick={() => this.setState({ login: !login })}>
                  {login ? 'No tengo cuenta' : 'Ya tengo cuenta'}
                </Button>
              </React.Fragment>
            )}
          </Mutation>
        </Form>
      </React.Fragment>
    );
  }

  _confirm = async data => {
    const { login } = this.state;

    const { token, user: { id } } = login ? data.signinUser : data.createUser;
    this._saveUserData(token, id);
    this.props.history.push(`/`);
  }

  _saveUserData = (token, userId) => {
    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem(USER_ID, userId);
  }
}

export default Login;