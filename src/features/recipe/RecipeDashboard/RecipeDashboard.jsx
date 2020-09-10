import React, { Component } from "react";
import { Grid, Button, Segment } from "semantic-ui-react";
import RecipeList from "../RecipeList/RecipeList";
import RecipeForm from "../RecipeForm/RecipeForm";
import cuid from "cuid";

const recipes = [
  {
    id: "1",
    title: "Przepyszne Babeczki",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt.",
    createdBy: "Jan Kowalski",
    pictureURL: "https://source.unsplash.com/collection/190727/300x200",
    likedBy: [
      {
        id: "1",
        name: "Anna",
        pictureURL: "https://randomuser.me/api/portraits/women/40.jpg",
      },
      {
        id: "2",
        name: "Jolie",
        pictureURL: "https://randomuser.me/api/portraits/women/42.jpg",
      },
    ],
  },
  {
    id: "2",
    title: "Sałatka owocowa",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt.",
    createdBy: "Jan Nowak",
    pictureURL: "https://source.unsplash.com/collection/190727/300x200",
    likedBy: [
      {
        id: "a",
        name: "Anna",
        pictureURL: "https://randomuser.me/api/portraits/women/40.jpg",
      },
    ],
  },
  {
    id: "3",
    title: "Grillowany łosoś",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt.",
    createdBy: "Julia Kowalska",
    pictureURL: "https://source.unsplash.com/collection/190727/300x200",
    likedBy: [
      {
        id: "1",
        name: "Anna",
        pictureURL: "https://randomuser.me/api/portraits/women/40.jpg",
      },
      {
        id: "2",
        name: "Jolie",
        pictureURL: "https://randomuser.me/api/portraits/women/42.jpg",
      },
    ],
  },
  {
    id: "4",
    title: "Tonkotsu ramen",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt.",
    createdBy: "Katarzyna Nowak",
    pictureURL: "https://source.unsplash.com/collection/190727/300x200",
    likedBy: [
      {
        id: "1",
        name: "Anna",
        pictureURL: "https://randomuser.me/api/portraits/women/40.jpg",
      },
      {
        id: "2",
        name: "Jolie",
        pictureURL: "https://randomuser.me/api/portraits/women/42.jpg",
      },
    ],
  },
];

class RecipeDashboard extends Component {
  state = {
    recipes: recipes,
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
    this.setState(({ recipes }) => ({
      recipes: [...recipes, newRecipe],
      isOpen: false,
    }));
  };

  handleUpdateRecipe = (updatedRecipe) => {
    this.setState(({ recipes }) => ({
      recipes: recipes.map((recipe) => {
        if (recipe.id === updatedRecipe.id) {
          return { ...updatedRecipe };
        } else {
          return recipe;
        }
      }),
      isOpen: false,
      selectedRecipe: null,
    }));
  };

  handleDeleteRecipe = (id) => {
    this.setState(({ recipes }) => ({
      recipes: recipes.filter((r) => r.id !== id),
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
    const { recipes, isOpen, selectedRecipe } = this.state;

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

export default RecipeDashboard;
