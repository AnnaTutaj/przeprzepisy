import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
  Statistic,
  Label,
} from "semantic-ui-react";

class RecipeViewHeader extends Component {
  render() {
    const {
      recipe,
      deleteRecipe,
      hideRecipeToggle,
      auth,
      likedBy,
      addFavRecipe,
      removeFavRecipe,
      authenticated,
      openModal
    } = this.props;
    const isCreatedByCurrentUser = recipe.createdByUid === auth.uid;
    const isLikedByCurrentUser =
      likedBy && likedBy.some((u) => u.id === auth.uid);

    return (
      <>
        <Grid.Column mobile={16} computer={8}>
          <Segment>
            {recipe.hide && (
              <Label
                attached='top'
                color='red'
                content='Ten przepis jest ukryty'
              />
            )}
            <Header as='h1'>{recipe.title}</Header>
            <Header as='h3' style={{ paddingTop: "50px" }}>
              Autor(ka):{" "}
              <Link to={`/uzytkownik/${recipe.createdByUid}`}>
                {recipe.createdBy}
              </Link>
            </Header>
            <Statistic.Group
              size='mini'
              style={{ paddingTop: "50px", paddingBottom: "50px" }}
            >
              <Statistic>
                <Statistic.Value>
                  <Icon name='clock outline' />
                </Statistic.Value>
                <Statistic.Label>{recipe.time} min</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  <Icon name='user outline' />
                </Statistic.Value>
                <Statistic.Label>{recipe.peopleCount} os</Statistic.Label>
              </Statistic>
            </Statistic.Group>
            {isCreatedByCurrentUser ? (
              <Fragment>
                <Button
                  as={Link}
                  primary
                  floated='right'
                  to={`/edytuj-przepis/${recipe.id}`}
                >
                  Edytuj
                </Button>
                <Button
                  negative
                  floated='right'
                  type='button'
                  onClick={() => deleteRecipe(recipe.id)}
                >
                  Usuń
                </Button>
                <Button
                  content={recipe.hide ? "Pokaż" : "Ukryj"}
                  type='button'
                  onClick={() => hideRecipeToggle(!recipe.hide, recipe.id)}
                ></Button>
              </Fragment>
            ) : (
              <Fragment>
                {!isLikedByCurrentUser ? (
                  <Button
                    basic
                    color='red'
                    type='button'
                    onClick={() => authenticated ? addFavRecipe(recipe) : openModal('UnauthModal')}
                  >
                    <Icon name='heart' />
                    Dodaj do ulubionych
                  </Button>
                ) : (
                  <Button
                    basic
                    type='button'
                    onClick={() => removeFavRecipe(recipe)}
                  >
                    <Icon name='heart outline' color='red' />
                    Usuń z ulubionych
                  </Button>
                )}
              </Fragment>
            )}
          </Segment>
        </Grid.Column>
        <Grid.Column mobile={16} computer={8}>
          <Image src={recipe.pictureURL || "/assets/dummyRecipe.jpg"} fluid />
        </Grid.Column>
      </>
    );
  }
}

export default RecipeViewHeader;
