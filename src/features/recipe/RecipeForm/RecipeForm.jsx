import React, { Component } from "react";
import { Segment, Form, Button, Header, Icon } from "semantic-ui-react";

class RecipeForm extends Component {
  state = {
    title: "",
    time: 0,
    description: "",
    createdBy: "",
  };

  componentDidMount() {
    if (this.props.selectedRecipe !== null) {
      this.setState({
        ...this.props.selectedRecipe,
      });
    }
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    if (this.state.id) {
      this.props.updateRecipe(this.state);
    } else {
      this.props.createRecipe(this.state);
    }
  };

  // TODO - do usunięcia - referencja do testów bez destrukturyzacji
  // handleInputChange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value,
  //   });
  // };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { closeForm } = this.props;
    const { title, time, description, createdBy } = this.state;

    return (
      <Segment style={{ width: "50%" }}>
        <Form onSubmit={this.handleOnSubmit} autoComplete='off'>
          <Header as='h3' dividing>
            <Header.Content>
              {this.state.id ? "Edytuj przepis" : "Dodaj przepis"}
            </Header.Content>
          </Header>
          <Form.Field>
            <label>Nazwa przepisu</label>
            <input
              name='title'
              value={title}
              onChange={this.handleInputChange}
              placeholder='np. Przepyszne ciasteczka'
            />
          </Form.Field>
          <Form.Field>
            <label>Czas przygotowania w minutach</label>
            <input
              type='number'
              name='time'
              value={time}
              onChange={this.handleInputChange}
            ></input>
          </Form.Field>
          <Form.Field>
            <label>Opis</label>
            <textarea
              placeholder='Opis...'
              name='description'
              value={description}
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Autor</label>
            <input
              placeholder='Twoje imię'
              name='createdBy'
              value={createdBy}
              onChange={this.handleInputChange}
            ></input>
          </Form.Field>
          <Button primary type='submit' floated='right'>
            Zapisz
          </Button>
          <Button type='button' onClick={closeForm}>
            Anuluj
          </Button>
          {this.state.id && (
            <Button
              negative
              type='button'
              onClick={() => this.props.deleteRecipe(this.state.id)}
            >
              Usuń
            </Button>
          )}
        
        </Form>
      </Segment>
    );
  }
}

export default RecipeForm;
