import React, { Component } from 'react';
import './App.css';
import { Container, Menu, Input } from 'semantic-ui-react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import CreateLinkNode from './routes/CreateLinkNode';
import NodesList from './routes/LinkNodesList';

class App extends Component {
  state = {
    redirectTo: 'home',
  };

  render() {
    const { redirectTo } = this.state;
    const { pathname } = this.props.location;

    return (
      <React.Fragment>
        <Menu stackable inverted color="violet">
          <Menu.Item
            name='home'
            active={pathname === '/'}
            onClick={() => this.setState({ redirectTo: 'home' })} />
          <Menu.Item
            name='Crear nodo'
            active={pathname === '/nodes/create'}
            onClick={() => this.setState({ redirectTo: 'CreateLinkNode' })}
          />
          {/* <Menu.Item
              name='friends'
              active={false}
              onClick={this.handleItemClick}
            /> */}
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item
              name='logout'
              active={false}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>

        <Container>
          {redirectTo === 'CreateLinkNode' && <Redirect push to='/nodes/create' />}
          {redirectTo === 'home' && <Redirect push to='/' />}
          <Route exact path="/" component={NodesList} />
          <Route path="/nodes/create" component={CreateLinkNode} />
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
