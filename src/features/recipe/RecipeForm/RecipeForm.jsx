import cuid from "cuid";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment, Form, Button, Header } from "semantic-ui-react";
import { createRecipe, updateRecipe } from "../recipeActions";

const mapStateToProps = (state, ownProps) => {
  const recipeId = ownProps.match.params.id;

  let recipe = {
    title: "",
    time: 0,
    description: "",
    createdBy: "",
    peopleCount: "",
  };

  if (recipeId && state.recipes.length > 0) {
    recipe = state.recipes.filter((recipe) => recipe.id === recipeId)[0];
  }

  return {
    recipe,
  };
};

const mapDispatchToProps = {
  createRecipe,
  updateRecipe,
};

class RecipeForm extends Component {
  state = { ...this.props.recipe };

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
      this.props.history.push(`/przepisy/${this.state.id}`);
    } else {
      const newRecipe = {
        ...this.state,
        id: cuid(),
        pictureURL: "/assets/dummyRecipe.jpg",
      };
      this.props.createRecipe(newRecipe);
      this.props.history.push("/przepisy");
    }
  };

  handleCancelForm = () => {
    if (this.state.id) {
      this.props.history.push(`/przepisy/${this.state.id}`);
    } else {
      this.props.history.push("/przepisy");
    }
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { title, time, description, createdBy, peopleCount } = this.state;

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
            <label>Liczba osób</label>
            <input
              type='number'
              name='peopleCount'
              value={peopleCount}
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
          <Button type='button' onClick={this.handleCancelForm}>
            Anuluj
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeForm);
