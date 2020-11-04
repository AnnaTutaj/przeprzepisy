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
import LazyLoad from "react-lazyload";

const UserPhotos = ({ photos }) => {
  if (!photos) {
    return (
      <Segment style={{ height: "200px" }}>
        <Dimmer inverted active={true}>
          <Loader size='large' />
        </Dimmer>
      </Segment>
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
                <LazyLoad
                  height={190}
                  placeholder={<Image src='/assets/dummyImage.png' />}
                >
                  <Image src={photo.url} />
                </LazyLoad>
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
          <Header
            as='h4'
            textAlign='center'
            content='Użytkownik nie dodał żadnych zdjęć'
          ></Header>
        </Segment>
      )}
    </React.Fragment>
  );
};

export default UserPhotos;
