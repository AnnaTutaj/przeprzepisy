import React, { Component } from "react";
import { List, Image, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";

class RecipeLikes extends Component {
  render() {
    const { likedBy } = this.props;
    return (
      <List.Item>
        <Popup
          content={likedBy.nick}
          key={likedBy.id}
          trigger={
            <Image
              key={likedBy.id}
              size='mini'
              circular
              src={likedBy.pictureURL || "/assets/dummyUser.png"}
              as={Link}
              to={`/uzytkownik/${likedBy.id}`}
            />
          }
        />
      </List.Item>
    );
  }
}

export default RecipeLikes;
