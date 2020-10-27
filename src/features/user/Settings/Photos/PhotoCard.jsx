import React, { Component } from "react";
import { Button, Card, Dimmer, Image } from "semantic-ui-react";

class PhotoCard extends Component {
  state = {};

  handleShow = () => this.setState({ active: true });
  handleHide = () => this.setState({ active: false });

  render() {
    const { photo, deletePhoto, setProfilePhoto } = this.props;

    const { active } = this.state;

    const content = (
      <div>
        <Button
          size='small'
          primary
          compact
          style={{ marginBottom: "10px" }}
          onClick={() => setProfilePhoto(photo)}
        >
          Ustaw jako zdjęcie profilowe
        </Button>
        <Button
          size='small'
          negative
          compact
          onClick={() => deletePhoto(photo)}
        >
          Usuń
        </Button>
      </div>
    );

    return (
      <>
        <Card>
          <Dimmer.Dimmable
            as={Image}
            dimmed={active}
            dimmer={{ active, content }}
            onMouseEnter={this.handleShow}
            onMouseLeave={this.handleHide}
            size='small'
            src={photo.url}
          />
        </Card>
      </>
    );
  }
}

export default PhotoCard;
