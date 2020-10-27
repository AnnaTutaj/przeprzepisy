import React, { Component } from "react";
import { Card, Header } from "semantic-ui-react";
import PhotoCard from "./PhotoCard";
import ProfilePhotoCard from "./ProfilePhotoCard";

class UserPhotos extends Component {
  render() {
    const { photos, profile, deletePhoto, setProfilePhoto } = this.props;

    let filteredPhotos;
    if (photos) {
      filteredPhotos = photos.filter((photo) => {
        return photo.url !== profile.pictureURL;
      });
    }

    return (
      <React.Fragment>
        <Header as='h3' content='Twoje zdjęcia' />
        <Card.Group itemsPerRow={5}>
          <ProfilePhotoCard profile={profile} />
          {filteredPhotos &&
            filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                deletePhoto={deletePhoto}
                setProfilePhoto={setProfilePhoto}
              />
            ))}
        </Card.Group>
      </React.Fragment>
    );
  }
}

export default UserPhotos;
