import React, { Component } from "react";
import RecipeListItem from "./RecipeListItem";
import { Grid, Header } from "semantic-ui-react";

class RecipeList extends Component {
  render() {
    const { recipes } = this.props;
    return (
      <>
        <Grid>
          <Grid.Column width={16}>
            <Header as='h2'>W tym tygodniu polecamy</Header>
          </Grid.Column>
          {recipes &&
            recipes.map((recipe) => (
              <Grid.Column key={recipe.id} mobile={16} tablet={8} computer={4}>
                <RecipeListItem key={recipe.id} recipe={recipe} />
              </Grid.Column>
            ))}
        </Grid>
      </>
    );
  }
}

export default RecipeList;
