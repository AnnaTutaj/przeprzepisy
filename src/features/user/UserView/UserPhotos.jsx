import React from "react";
import {
  Card,
  Dimmer,
  Header,
  Icon,
  Image,
  Loader,
  Segment,
} from "semantic-ui-react";

const UserPhotos = ({ photos }) => {
  if (!photos) {
    return (
      <Dimmer inverted active={true}>
        <Loader size='large' />
      </Dimmer>
    );
  }

  return (
    <React.Fragment>
      {photos.length ? (
        <Segment>
          <Header as='h3' content={`Zdjęcia użytkownika (${photos.length})`} />
          <Card.Group itemsPerRow={4}>
            {photos.map((photo) => (
              <Card key={photo.id}>
                <Image src={photo.url} />
              </Card>
            ))}
          </Card.Group>
        </Segment>
      ) : (
        <Segment>
          <Header as='h2' icon textAlign='center'>
            <Icon name='picture' />
            <Header.Content>Zdjęcia użytkownika</Header.Content>
          </Header>
          <Header as='h4' textAlign='center' content='Użytkownik nie dodał żadnych zdjęć'></Header>
        </Segment>
      )}
    </React.Fragment>
  );
};

export default UserPhotos;
