import React from 'react';
import { Grid, Input, Dropdown, Form, Button, Message, Modal, Label, Icon } from 'semantic-ui-react';
import { Mutation, Query } from 'react-apollo';
import { CREATE_LINKNODE_MUTATION, GET_TAGS_QUERY, GET_LINKNODES_QUERY } from '../queries';
import { Redirect } from 'react-router-dom';
import LinkNodesList from '../routes/LinkNodesList';
import SelectableLinkNodeCard from '../components/SelectableLinkNodeCard';


class CreateLinkNode extends React.Component {
  state = {
    errorMessages: [],
    redirect: false,
    loading: false,
    title: '',
    link: '',
    description: '',
    requiredTime: '',
    requirements: [],
    addedTags: [],
    currentTags: [],
    searchText: '',
    modalOpen: false,
  };

  handleError = (error) => {
    this.setState({ loading: false });

    console.log(error.graphQLErrors);
  }

  handleAddTag = (e, { value }) => {
    this.setState(prevState => ({ addedTags: [...prevState.addedTags, value] }));
  }

  handleChangeTag = (e, { value }) => this.setState({ currentTags: value })

  handleLinkNodeSelect = (selectedNodes) => {
    this.setState({ requirements: selectedNodes });
  }

  removeRequirement = (requirementId) => {
    const { requirements } = this.state;

    const newRequirements = [...requirements];
    const requirementIndex = requirements.findIndex(req => req.id === requirementId);
    if (requirementIndex !== -1) {
      newRequirements.splice(requirementIndex, 1);
      this.setState({ requirements: newRequirements });
    }
  }

  render() {
    const {
      errorMessages,
      redirect,
      loading,
      title,
      link,
      description,
      requiredTime,
      requirements,
      addedTags,
      currentTags,
      searchText,
      modalOpen,
    } = this.state;

    if (redirect) return <Redirect push to='/' />

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
        <Query query={GET_TAGS_QUERY}>
          {({ queryLoading, error, data }) => {
            let placeholder;
            if (queryLoading) placeholder = 'Cargando...';
            else if (error) placeholder = 'Error';
            else placeholder = 'Agrega etiquetas para ayudar a encontrar tu link';

            let options = addedTags.map(addedTag => ({
              text: addedTag,
              value: addedTag,
            }));
            if (data.allTags) {
              options = [...options, ...data.allTags.map(tag => ({
                key: tag.id,
                text: tag.title,
                value: tag.title,
              }))];
            }

            return (
              <Form>
                <Form.Input label='Título' placeholder='Título' value={title} onChange={event => this.setState({ title: event.target.value })} />
                <Form.Field>
                  <label>Link</label>
                  <Input label='http://' placeholder='Link' value={link} onChange={event => this.setState({ link: event.target.value })} />
                </Form.Field>
                <Form.TextArea label='Descripción' placeholder='Descripción' value={description} onChange={event => this.setState({ description: event.target.value })} />
                <Form.Field>
                  <label>Etiquetas</label>
                  <Dropdown
                    options={options}
                    placeholder={placeholder}
                    search
                    selection
                    fluid
                    multiple
                    allowAdditions
                    value={currentTags}
                    onAddItem={this.handleAddTag}
                    onChange={this.handleChangeTag}
                    additionLabel='Nueva etiqueta: '
                    noResultsMessage='No hay resultados'
                  />
                </Form.Field>
                <Form.Input label='Tiempo requerido' placeholder='Tiempo requerido' value={requiredTime} onChange={event => this.setState({ requiredTime: event.target.value })} />
                <Form.Field>
                  <div>
                    <Button color="red" onClick={() => this.setState({ modalOpen: true })}>Agregar requisitos</Button>
                    {requirements.map(requirement => (
                      <Label key={requirement.id}>{requirement.title}<Icon name="delete" onClick={() => this.removeRequirement(requirement.id)} /></Label>
                    ))}
                  </div>
                  <Modal open={modalOpen}>
                    <Modal.Header>
                      Agregar requisitos
                      <Button
                        color="red"
                        className="right floated"
                        onClick={() => this.setState({ modalOpen: false })}
                      >
                        Terminar
                      </Button>
                    </Modal.Header>
                    <Modal.Content>
                      <Grid divided="vertically">
                        <Grid.Row centered>
                          <Input
                            icon={{ name: 'search', circular: true, link: true, onClick: () => this.handleSearchSubmit(searchText) }}
                            placeholder="Buscar..."
                            value={searchText}
                            onChange={(e, { value }) => this.setState({ searchText: value })}
                          />
                        </Grid.Row>
                        <Grid.Row>
                          <LinkNodesList
                            match={{ params: { query: searchText } }}
                            LinkNodeComponent={SelectableLinkNodeCard}
                            onLinkNodeSelect={this.handleLinkNodeSelect}
                            selectedLinkNodes={requirements}
                          />
                        </Grid.Row>
                      </Grid>
                    </Modal.Content>
                  </Modal>
                </Form.Field>
                <Mutation
                  mutation={CREATE_LINKNODE_MUTATION}
                  variables={{
                    title,
                    link: 'http://' + link,
                    description: description.length === 0 ? null : description,
                    requiredTime: requiredTime.length === 0 ? null : +requiredTime,
                    tagsIds: options
                      .filter(item => addedTags.indexOf(item.text) === -1 && currentTags.indexOf(item.text) === 1)
                      .map(item => item.key),
                    tags: addedTags.map(tag => ({ title: tag })),
                    childrenIds: requirements.map(requirement => requirement.id),
                  }}
                  update={(store, { data: { createLinkNode }}) => {
                    const data = store.readQuery({ query: GET_LINKNODES_QUERY })

                    data.allLinkNodes = [...data.allLinkNodes, createLinkNode];

                    store.writeQuery({ query: GET_LINKNODES_QUERY, data })
                  }}
                  onCompleted={() => this.setState({ loading: false, redirect: true })}
                  onError={this.handleError}
                >
                  {postMutation => (
                    <Button color="green" loading={loading} type='submit' onClick={() => {
                      let errors = [];
                      if (!title.length) errors.push('Tienes que ponerle un título');
                      if (!link.length) errors.push('Tienes que poner un link');
                      if (isNaN(+requiredTime)) errors.push('El tiempo requerido tiene que ser un número');
                      if (errors.length) this.setState({ errorMessages: errors });
                      else {
                        this.setState({ loading: true });
                        postMutation();
                      }
                    }}>Crear</Button>
                  )}
                </Mutation>
              </Form>
            )
          }}
        </Query>
      </React.Fragment>
    )
  }
}

export default CreateLinkNode;