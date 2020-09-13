import React, { Component } from "react";
import { Grid, Button, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import cuid from "cuid";

import { createRecipe, updateRecipe, deleteRecipe } from "../recipeActions";
import RecipeList from "../RecipeList/RecipeList";
import RecipeForm from "../RecipeForm/RecipeForm";

const mapStateToProps = (state) => ({
  recipes: state.recipes,
});

const mapDispatchToProps = {
  createRecipe, 
  updateRecipe,
  deleteRecipe
}

class RecipeDashboard extends Component {
  state = {
    isOpen: false,
    selectedRecipe: null,
  };

  handleFormOpen = () => {
    this.setState({
      selectedRecipe: null,
      isOpen: true,
    });
  };

  handleFormClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  handleCreateRecipe = (newRecipe) => {
    newRecipe.id = cuid();
    newRecipe.pictureURL = "/assets/dummyRecipe.jpg";
    this.props.createRecipe(newRecipe);
    this.setState(({ recipes }) => ({
      isOpen: false,
    }));
  };

  handleUpdateRecipe = (updatedRecipe) => {
    this.props.updateRecipe(updatedRecipe);

    this.setState(({ recipes }) => ({
      isOpen: false,
      selectedRecipe: null,
    }));
  };

  handleDeleteRecipe = (id) => {
    this.props.deleteRecipe(id);

    this.setState(({ recipes }) => ({
      isOpen: false,
      selectedRecipe: null,
    }));
  };

  handleSelectRecipe = (e) => {
    this.setState({
      selectedRecipe: e,
      isOpen: true,
    });
  };

  render() {
    const { isOpen, selectedRecipe } = this.state;
    const { recipes } = this.props;

    return (
      <>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Button
                primary
                content='Dodaj przepis'
                onClick={this.handleFormOpen}
              />
              {/* Tymczasowe do testów, żeby nie komplikować z parent-child */}
              {isOpen && (
                <RecipeForm
                  key={selectedRecipe ? selectedRecipe.id : 0}
                  updateRecipe={this.handleUpdateRecipe}
                  selectedRecipe={selectedRecipe}
                  createRecipe={this.handleCreateRecipe}
                  deleteRecipe={this.handleDeleteRecipe}
                  closeForm={this.handleFormClose}
                />
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <RecipeList
              recipes={recipes}
              selectRecipe={this.handleSelectRecipe}
            />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <h2>Najnowsze komentarze</h2>
              <Segment>
                <h3>W budowie...</h3>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <h2>Ostatnio dodane</h2>
              <Segment>
                <h3>W budowie...</h3>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDashboard);
