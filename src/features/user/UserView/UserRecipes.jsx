import React from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import RecipeListScrolled from "../../recipe/RecipeList/RecipeListScrolled";

const UserRecipes = ({ recipes, moreRecipes, getNextRecipes, loading }) => {
  if (!recipes) {
    return (
      <Segment style={{ height: "200px" }}>
        <Dimmer inverted active={true}>
          <Loader size='large' />
        </Dimmer>
      </Segment>
    );
  }

  return (
    <Segment>
      <RecipeListScrolled
        headerText='Autor(ka) przepisów'
        headerSize='h3'
        recipes={recipes}
        loading={loading}
        getNextRecipes={getNextRecipes}
        moreRecipes={moreRecipes}
      />
    </Segment>
  );
};

export default UserRecipes;
