import React, { Component } from "react";
import {
  Card,
  Dimmer,
  Header,
  Icon,
  Image,
  List,
  Loader,
} from "semantic-ui-react";
import moment from "moment";
import LazyLoad from "react-lazyload";

class ProfileInfo extends Component {
  render() {
    const { profile } = this.props;

    if (!profile || !profile[0]) {
      return (
        <Dimmer inverted active={true}>
          <Loader size='large' />
        </Dimmer>
      );
    }

    const setGenderIcon = () => {
      switch (profile[0].gender) {
        case "male":
          return "mars";
        case "female":
          return "venus";
        case "other":
          return "transgender";

        default:
          return "";
      }
    };

    const date = moment(profile[0].createdAt.seconds).format("ll");
    let genderIconName = setGenderIcon();

    // todo tłumaczenia ulubionych kategorii, teraz są keys pokazywane
    return (
      <Card>
        <LazyLoad
          height={260}
          placeholder={
            <Image className='ui card' src='/assets/dummyUser.png' wrapped ui={false} />
          }
        >
          <Image
            className='ui card'
            src={profile[0].pictureURL || "/assets/dummyUser.png"}
            wrapped
            ui={false}
          />
        </LazyLoad>
        <Card.Content>
          {genderIconName && (
            <Icon className='right floated' name={genderIconName}></Icon>
          )}
          <Card.Header content={profile[0].nick}></Card.Header>
          <Card.Meta>
            <span className='date'>{`Dołączył/a ${date}`}</span>
          </Card.Meta>
          <Card.Description>{profile[0].description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Header as='h4' content='Ulubione kategorie' />
          {profile[0].favCategories && profile[0].favCategories.length ? (
            <List bulleted>
              {profile[0].favCategories.map((category) => (
                <List.Item key={category}>{category}</List.Item>
              ))}
            </List>
          ) : (
            <span>Brak ulubionych kategorii</span>
          )}
        </Card.Content>
      </Card>
    );
  }
}

export default ProfileInfo;
