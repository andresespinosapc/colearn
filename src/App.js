import React, { Component } from 'react';
import './App.css';
import { Card, Button, Label, Container, Rating, Menu, Input } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import CreateNode from './routes/CreateNode';
import NodesList from './routes/NodesList';

class App extends Component {
  state = {
    redirectTo: 'home',
  };

  render() {
    const { redirectTo } = this.state;

    return (
      <Router>
        <div>
          <Menu inverted color="violet">
            <Menu.Item
              name='home'
              active={redirectTo === 'home'}
              onClick={() => this.setState({ redirectTo: 'home' })} />
            <Menu.Item
              name='Crear nodo'
              active={redirectTo === 'createNode'}
              onClick={() => this.setState({ redirectTo: 'createNode' })}
            />
            <Menu.Item
              name='friends'
              active={false}
              onClick={this.handleItemClick}
            />
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
            {redirectTo === 'createNode' && <Redirect push to='/nodes/create' />}
            {redirectTo === 'home' && <Redirect push to='/' />}
            <Route exact path="/" component={NodesList} />
            <Route path="/nodes/create" component={CreateNode} />
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
