import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Loader } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { GET_LINKNODES_QUERY } from '../queries';
import LinkNodeCard from '../components/LinkNodeCard';
import algoliasearch from 'algoliasearch';


class NodesList extends React.Component {
  static propTypes = {
    tagsFilter: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    tagsFilter: [],
  }

  state = {
    lastQuery: '',
    queryStatus: null,
    queryData: null,
  };

  componentDidUpdate() {
    const { lastQuery } = this.state;
    const { query } = this.props.match.params;

    if (query && query !== lastQuery) {
      this.loadQuery(query);
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

  render() {
    const { queryStatus, queryData } = this.state;
    const { tagsFilter } = this.props;

    return (
      <Container>
        {(queryStatus === 'loading') && <Loader active inline='centered' />}
        {(queryStatus === 'error') && <p>Error</p>}
        {(queryStatus === 'ready') && (
          <Card.Group>
            {queryData.map(node => <LinkNodeCard key={node.id} node={node} />)}
          </Card.Group>
        )}
        {(queryStatus === null) && (
          <Query query={GET_LINKNODES_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <Loader active inline='centered' />;
              else if (error) return <p>{error}</p>;

              let nodes;
              if (tagsFilter.length > 0) nodes = data.allLinkNodes.filter(linkNode => tagsFilter.every(tagFilter => linkNode.tags.findIndex(tag => tagFilter === tag.title) !== -1));
              else nodes = data.allLinkNodes;

              return (
                <Card.Group>
                  {nodes.map(node => <LinkNodeCard key={node.id} node={node} />)}
                </Card.Group>
              )
            }}
          </Query>
        )}
      </Container>
    );
  }
}

export default NodesList;