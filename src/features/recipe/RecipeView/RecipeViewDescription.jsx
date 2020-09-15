import React from "react";
import { Header, Segment } from "semantic-ui-react";

const RecipeViewDescription = ({ recipe }) => {
  return (
    <Segment.Group>
      <Segment>
        <Header as='h1'>Sposób przygotowania</Header>
        <div>{recipe.description}</div>
      </Segment>
    </Segment.Group>
  );
};

export default RecipeViewDescription;
