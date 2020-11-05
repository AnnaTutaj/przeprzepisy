import React, { Fragment } from "react";
import { Dimmer, Header, Icon, Loader, Segment } from "semantic-ui-react";
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
    <Fragment>
      {recipes && recipes.length ? (
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
      ) : (
        <Segment>
          <Header as='h2' icon textAlign='center'>
            <Icon name='book' />
            <Header.Content>Przepisy użytkownika</Header.Content>
          </Header>
          <Header
            as='h4'
            textAlign='center'
            content='Użytkownik nie dodał żadnego przepisu'
          ></Header>
        </Segment>
      )}
    </Fragment>
  );
};

export default UserRecipes;
