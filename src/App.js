import React, { Component } from 'react';
import './App.css';
import { Container, Menu, Input, Icon } from 'semantic-ui-react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import CreateLinkNode from './routes/CreateLinkNode';
import NodesList from './routes/LinkNodesList';

class App extends Component {
  state = {
    redirectTo: null,
  };

  render() {
    let { redirectTo } = this.state;
    const { pathname } = this.props.location;

    if (redirectTo === pathname) redirectTo = null;

    return (
      <React.Fragment>
        <Menu stackable inverted color="violet">
          <Menu.Item>
            <div class="ui mini image">
              <img src="/logo_white.png" />
            </div>
          </Menu.Item>
          <Menu.Item
            name='home'
            active={pathname === '/'}
            onClick={() => this.setState({ redirectTo: '/' })} />
          <Menu.Item
            name='Crear nodo'
            active={pathname === '/nodes/create'}
            onClick={() => this.setState({ redirectTo: '/nodes/create' })}
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
          {redirectTo !== null && <Redirect push to={redirectTo} />}
          <Switch>
            <Route exact path="/" component={NodesList} />
            <Route path="/nodes/create" component={CreateLinkNode} />
          </Switch>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
