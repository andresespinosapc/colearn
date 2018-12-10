import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Card, Container, Loader } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { GET_LINKNODES_QUERY } from '../queries';
import LinkNodeCard from '../components/LinkNodeCard';
import algoliasearch from 'algoliasearch';
import { Redirect } from 'react-router-dom';


class NodesList extends React.Component {
  static propTypes = {
    tagsFilter: PropTypes.arrayOf(PropTypes.string),
    LinkNodeComponent: PropTypes.func,
    onLinkNodeSelect: PropTypes.func,
    selectedLinkNodes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    })),
  }

  static defaultProps = {
    tagsFilter: [],
    LinkNodeComponent: LinkNodeCard,
    onLinkNodeSelect: () => {},
    selectedLinkNodes: [],
  }

  state = {
    lastQuery: '',
    queryStatus: null,
    queryData: null,
    redirectTo: null,
  };

  componentDidUpdate() {
    const { lastQuery, queryStatus } = this.state;
    const { query } = this.props.match.params;

    if (query && query !== lastQuery) {
      this.loadQuery(query);
    } else if (!query && queryStatus !== null) {
      this.setState({ queryStatus: null });
    }
  }

  loadQuery = (query) => {
    this.setState({ queryStatus: 'loading', lastQuery: query });

    const client = algoliasearch('MR8OI2ZT39', '80a15276a810c978c53b6d4d3e20e87b');
    const index = client.initIndex('searchLinkNodes');

    index.search({ query }, (e, content) => {
      if (e) this.setState({ queryStatus: 'error' });
      else this.setState({ queryStatus: 'ready', queryData: content.hits });
    });
  }

  handleClickNode = (nodeId, nodeTitle) => {
    const { onLinkNodeSelect, selectedLinkNodes } = this.props;

    const clickedIndex = selectedLinkNodes.findIndex(node => node.id === nodeId);
    let newSelectedLinkNodes;
    if (clickedIndex === -1) {
      newSelectedLinkNodes = [...selectedLinkNodes, { id: nodeId, title: nodeTitle }];
    } else {
      newSelectedLinkNodes = [...selectedLinkNodes];
      newSelectedLinkNodes.splice(clickedIndex, 1);
    }

    onLinkNodeSelect(newSelectedLinkNodes);
  }

  renderCardGroup = (nodes) => {
    const { LinkNodeComponent, selectedLinkNodes } = this.props;

    if (nodes.length === 0) {
      return (
        <Segment>
          Nada que mostrar
        </Segment>
      )
    }

    return (
      <Card.Group centered>
        {nodes.map(node => (
          <LinkNodeComponent
            key={node.id}
            node={node}
            selected={selectedLinkNodes.findIndex(x => x.id === node.id) !== -1}
            onClick={() => this.handleClickNode(node.id, node.title)}
            onRequirementsClick={parentId => this.setState({ redirectTo: `/requirements/${parentId}` })}
            onDependeesClick={childId => this.setState({ redirectTo: `/dependees/${childId}` })}
          />
        ))}
      </Card.Group>
    );
  };

  render() {
    let { redirectTo } = this.state;
    const { queryStatus, queryData } = this.state;
    const { tagsFilter, LinkNodeComponent } = this.props;
    const { parentId, childId } = this.props.match.params;
    const { pathname } = this.props.location;

    if (redirectTo === pathname) redirectTo = null;
    if (redirectTo !== null) return <Redirect push to={redirectTo} />;

    let filter;
    if (parentId) {
      filter = {
        parents_some: {
          id: parentId
        }
      };
    } else if (childId) {
      filter = {
        children_some: {
          id: childId
        }
      };
    }

    return (
      <Container>
        {(queryStatus === 'loading') && <Loader active inline='centered' />}
        {(queryStatus === 'error') && <p>Error</p>}
        {(queryStatus === 'ready') && this.renderCardGroup(queryData)}
        {(queryStatus === null) && (
          <Query query={GET_LINKNODES_QUERY} variables={filter ? { filter } : undefined}>
            {({ loading, error, data }) => {
              if (loading) return <Loader active inline='centered' />;
              else if (error) return <p>{error}</p>;

              let nodes;
              if (tagsFilter.length > 0) nodes = data.allLinkNodes.filter(linkNode => tagsFilter.every(tagFilter => linkNode.tags.findIndex(tag => tagFilter === tag.title) !== -1));
              else nodes = data.allLinkNodes;

              return this.renderCardGroup(nodes);
            }}
          </Query>
        )}
      </Container>
    );
  }
}

export default NodesList;