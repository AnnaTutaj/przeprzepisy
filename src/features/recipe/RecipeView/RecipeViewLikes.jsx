import React from "react";
import { Header, Image, Segment } from "semantic-ui-react";

const RecipeViewLikes = ({ likedBy }) => {
  return (
    <>
      <Segment>
        <Header as='h3'>Najnowsze polubienia</Header>
        <Image.Group size='mini'>
          {likedBy &&
            likedBy.map((user) => (
              <Image key={user.id} src={user.pictureURL} />
            ))}
        </Image.Group>
      </Segment>
    </>
  );
};

export default RecipeViewLikes;
