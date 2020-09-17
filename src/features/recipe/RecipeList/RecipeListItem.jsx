import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Segment, Image, List } from "semantic-ui-react";
import RecipeLikes from "./RecipeLikes";

class RecipeListItem extends Component {
  render() {
    const { recipe} = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Image
            className='ui fluid cur_p'
            src={recipe.pictureURL}
            as={Link} to={`/przepisy/${recipe.id}`}
          />
          <h2 className='recipe-header'>{recipe.title || ""}</h2>
          <small>Autor(ka) {recipe.createdBy}</small>
          <div>{recipe.description}</div>
        </Segment>
        <Segment>
          <List horizontal>
            {recipe.likedBy &&
              recipe.likedBy.map((likedBy) => (
                <RecipeLikes key={likedBy.id} likedBy={likedBy} />
              ))}
          </List>
        </Segment>
      </Segment.Group>
    );
  }
}

export default RecipeListItem;