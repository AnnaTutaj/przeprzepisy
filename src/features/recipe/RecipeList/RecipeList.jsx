import React, { Component } from "react";
import RecipeListItem from "./RecipeListItem";
import { Grid } from "semantic-ui-react";

class RecipeList extends Component {
  render() {
    const { recipes, selectRecipe } = this.props;
    return (
      <>
        <h2>W tym tygodniu polecamy</h2>
        <Grid>
          {recipes.map((recipe) => (
            <Grid.Column key={recipe.id} width={4}>
              <RecipeListItem
                key={recipe.id}
                recipe={recipe}
                selectRecipe={selectRecipe}
              />
            </Grid.Column>
          ))}
        </Grid>
      </>
    );
  }
}

export default RecipeList;
