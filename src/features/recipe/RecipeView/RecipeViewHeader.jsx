import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
  Statistic,
} from "semantic-ui-react";


class RecipeViewHeader extends Component {
  render() {
    const { recipe, deleteRecipe } = this.props;

    return (
      <>
        <Grid.Column mobile={16} computer={8}>
          <Segment>
            <Header as='h1'>{recipe.title}</Header>
            <Header as='h3' style={{ paddingTop: "50px" }}>
              Autor(ka): <strong>{recipe.createdBy}</strong>
            </Header>
            <Statistic.Group size='mini' style={{ paddingTop: "50px" }}>
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
          </Segment>
        </Grid.Column>
        <Grid.Column mobile={16} computer={8}>
          <Image src={recipe.pictureURL} fluid />
        </Grid.Column>
      </>
    );
  }
}

export default RecipeViewHeader;
