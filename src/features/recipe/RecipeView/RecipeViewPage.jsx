import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import RecipeViewComments from "./RecipeViewComments";
import RecipeViewDescription from "./RecipeViewDescription";
import RecipeViewHeader from "./RecipeViewHeader";
import RecipeViewIngredients from "./RecipeViewIngredients";
import RecipeViewLikes from "./RecipeViewLikes";
import { deleteRecipe } from "../recipeActions";

const mapStateToProps = (state, ownProps) => {
  const recipeId = ownProps.match.params.id;

  let recipe = {};

  if (recipeId && state.recipes.length > 0) {
    recipe = state.recipes.filter((recipe) => recipe.id === recipeId)[0];
  }

  return {
    recipe,
  };
};

const mapDispatchToProps = {
  deleteRecipe,
};

class RecipeViewPage extends Component {
  //todo do poprawy
  handleDeleteRecipe = (recipeId) => {
    this.props.deleteRecipe(recipeId);
    this.props.history.push("/przepisy");
  };

  render() {
    const { recipe } = this.props;

    return (
      <div>
        <Grid>
          <Grid.Row stretched>
            <RecipeViewHeader
              recipe={recipe}
              deleteRecipe={this.handleDeleteRecipe}
            />
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column mobile={16} computer={8}>
              <RecipeViewIngredients recipe={recipe} />
            </Grid.Column>
            <Grid.Column mobile={16} computer={8}>
              <RecipeViewDescription recipe={recipe} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={16} computer={8}>
              <RecipeViewComments />
            </Grid.Column>
            <Grid.Column mobile={16} computer={8}>
              <RecipeViewLikes likedBy={recipe.likedBy} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeViewPage);
