import React, { Component } from "react";
import { List, Image } from "semantic-ui-react";

class RecipeLikes extends Component {
  render() {
    const { likedBy } = this.props;
    return (
      <List.Item>
        <Image as='a' size='mini' circular src={likedBy.pictureURL} />
      </List.Item>
    );
  }
}

export default RecipeLikes;
