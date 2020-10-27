import React, { Component } from "react";
import { Card, Dimmer, Image, Label } from "semantic-ui-react";

class ProfilePhotoCard extends Component {
  state = {};

  handleShow = () => this.setState({ active: true });
  handleHide = () => this.setState({ active: false });

  render() {
    const { profile } = this.props;

    const { active } = this.state;

    const content = (
      <div>
        <Label size='large' primary>
          Zdjęcie jest ustawione jako profilowe
        </Label>
      </div>
    );
    return (
      <>
        <Card>
          <Dimmer.Dimmable
            label={{ as: "a", corner: "right", icon: "star", color: "yellow"}}
            as={Image}
            dimmed={active}
            dimmer={{ active, content }}
            onMouseEnter={this.handleShow}
            onMouseLeave={this.handleHide}
            size='small'
            src={profile.pictureURL || "/assets/dummyUser.png"}
          />
        </Card>
      </>
    );
  }
}

export default ProfilePhotoCard;
