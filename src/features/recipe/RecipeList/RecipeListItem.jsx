import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { Segment, Image, List, Header } from "semantic-ui-react";
import RecipeLikes from "./RecipeLikes";
import { objectToArray } from "../../../app/common/util/helpers";

class RecipeListItem extends Component {
  goToRecipe = (recipeId) => {
    this.props.history.push(`/przepisy/${recipeId}`);
  };

  render() {
    const { recipe } = this.props;
    const likedBy = recipe && recipe.likedBy && objectToArray(recipe.likedBy);

    return (
      <Segment.Group>
        <Segment>
          <Image
            className='ui fluid cur_p'
            src={recipe.pictureURL || "/assets/dummyRecipe.jpg"}
            as={Link}
            to={`/przepisy/${recipe.id}`}
          />
          <Header
            as='h2'
            className='recipe-header'
            onClick={() => this.goToRecipe(recipe.id)}
          >
            {recipe.title || ""}
          </Header>
          <small>
            Autor(ka):{" "}
            <Link to={`uzytkownik/${recipe.createdByUid}`}>
              {recipe.createdBy}
            </Link>
          </small>
          <div>{recipe.description}</div>
        </Segment>
        <Segment>
          <List horizontal>
            {likedBy &&
              likedBy.map((l) => <RecipeLikes key={l.id} likedBy={l} />)}
          </List>
        </Segment>
      </Segment.Group>
    );
  }
}

export default withRouter(RecipeListItem);
