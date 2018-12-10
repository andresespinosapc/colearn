import React, { Component } from 'react';
import './App.css';
import { Container, Menu, Form } from 'semantic-ui-react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import CreateLinkNode from './routes/CreateLinkNode';
import NodesList from './routes/LinkNodesList';


class App extends Component {
  state = {
    redirectTo: null,
    searchText: '',
  };

  handleSearchSubmit = (searchText) => {
    this.setState({ redirectTo: searchText === '' ? '/' : '/search/' + searchText })
  }

  render() {
    let { redirectTo, searchText } = this.state;
    const { pathname } = this.props.location;

    if (redirectTo === pathname) redirectTo = null;

    return (
      <React.Fragment>
        <Menu stackable inverted color="violet">
          <Menu.Item>
            <div className="ui mini image">
              <img src="/logo_white.png" alt="App logo" />
            </div>
          </Menu.Item>
          <Menu.Item
            name='home'
            active={pathname === '/'}
            onClick={() => this.setState({ redirectTo: '/' })} />
          <Menu.Item
            name='Crear CoLink'
            active={pathname === '/nodes/create'}
            onClick={() => this.setState({ redirectTo: '/nodes/create' })}
          />
          {/* <Menu.Item
              name='friends'
              active={false}
              onClick={this.handleItemClick}
            /> */}
          <Menu.Menu position='right'>
            {/* <Menu.Item>
              <Query query={GET_TAGS_QUERY}>
                {({ queryLoading, error, data }) => {
                  let placeholder;
                  let options = [];
                  if (queryLoading) placeholder = 'Cargando...';
                  else if (error) placeholder = 'Error';
                  else placeholder = 'Filtra por etiquetas';

                  if (data.allTags) {
                    options = data.allTags.map(tag => ({
                      key: tag.id,
                      text: tag.title,
                      value: tag.title,
                    }));
                  }

                  return (
                    <Dropdown
                      options={options}
                      placeholder={placeholder}
                      search
                      selection
                      multiple
                      value={currentSearchTags}
                      onChange={(e, { value }) => this.setState({ currentSearchTags: value })}
                      additionLabel='Nueva etiqueta: '
                      noResultsMessage='No hay resultados'
                    />
                  );
                }}
              </Query>
            </Menu.Item> */}
            <Menu.Item>
              <Form onSubmit={() => this.handleSearchSubmit(searchText)}>
                <Form.Input
                  icon={{ name: 'search', circular: true, link: true, onClick: () => this.handleSearchSubmit(searchText) }}
                  placeholder="Buscar..."
                  value={searchText}
                  onChange={(e, { value }) => this.setState({ searchText: value })}
                />
              </Form>
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
            <Route path="/search/:query" component={NodesList} />
            <Route path="/requirements/:parentId" component={NodesList} />
            <Route path="/dependees/:childId" component={NodesList} />
            <Route path="/nodes/create" component={CreateLinkNode} />
          </Switch>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
