import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Segment, Card, Container, Loader } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { GET_LINKNODES_QUERY, GET_LINKNODES_VAR_QUERY, GET_LINKNODE_QUERY } from '../queries';
import LinkNodeCard from '../components/LinkNodeCard';
import LinkNodeDetails from '../components/LinkNodeDetails';
import algoliasearch from 'algoliasearch';


class NodesList extends React.Component {
  static propTypes = {
    LinkNodeComponent: PropTypes.func,
    onLinkNodeSelect: PropTypes.func,
    selectedLinkNodes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    })),
  }

  static defaultProps = {
    LinkNodeComponent: LinkNodeCard,
    onLinkNodeSelect: null,
    selectedLinkNodes: [],
  }

  state = {
    lastQuery: '',
    queryStatus: null,
    queryData: null,
    selectedLinkNodeId: null,
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

  linkNodesQueryCallback = ({ loading, error, data }) => {
    if (loading) return <Loader active inline='centered' />;
    else if (error) return <p>{error}</p>;

    return this.renderCardGroup(data.allLinkNodes);
  }

  renderCardGroup = (nodes) => {
    const { onLinkNodeSelect, LinkNodeComponent, selectedLinkNodes, history } = this.props;

    if (nodes.length === 0) {
      return (
        <Segment>
          Nada que mostrar
        </Segment>
      )
    }

    return (
      <React.Fragment>
        <Card.Group centered>
          {nodes.map(node => (
            <LinkNodeComponent
              key={node.id}
              node={node}
              selected={selectedLinkNodes.findIndex(x => x.id === node.id) !== -1}
              onClick={onLinkNodeSelect ? (
                () => this.handleClickNode(node.id, node.title)
              ) : (
                () => this.setState({ selectedLinkNodeId: node.id })
              )}
              onRequirementsClick={parentId => history.push(`/requirements/${parentId}`)}
              onDependeesClick={childId => history.push(`/dependees/${childId}`)}
            />
          ))}
        </Card.Group>
      </React.Fragment>
    );
  };

  render() {
    const { queryStatus, queryData, selectedLinkNodeId } = this.state;
    const { parentId, childId } = this.props.match.params;

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
          filter ? (
            <Query query={GET_LINKNODES_VAR_QUERY} variables={{ filter }}>
              {this.linkNodesQueryCallback}
            </Query>
          ) : (
            <Query query={GET_LINKNODES_QUERY}>
              {this.linkNodesQueryCallback}
            </Query>
          )
        )}
        {selectedLinkNodeId !== null && (
          <Query
            query={GET_LINKNODE_QUERY}
            variables={{ id: selectedLinkNodeId }}
          >
            {({ loading, error, data }) => {
              if (error) console.log(error);

              return (
                <Modal open onClose={() => this.setState({ selectedLinkNodeId: null })}>
                  {loading ? (
                    <Loader />
                  ) : (
                    <LinkNodeDetails node={data.LinkNode} loading={loading} />
                  )}
                </Modal>
              );
            }}
          </Query>
        )}
      </Container>
    );
  }
}

export default NodesList;