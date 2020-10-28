import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Grid } from "semantic-ui-react";
import ProfileInfo from "./ProfileInfo";
import UserPhotos from "./UserPhotos";

const userDataFetch = ({ userId }) => {
  return [
    {
      collection: "users",
      doc: userId,
      subcollections: [{ collection: "photos" }],
      storeAs: "userPhotos",
    },
    {
      collection: "users",
      doc: userId,
      storeAs: "userProfile",
    },
  ];
};

const mapStateToProps = (state, ownProps) => {
  const userId = ownProps.match.params.id;

  return {
    userId,
    profile: state.firestore.ordered.userProfile,
    photos: state.firestore.ordered.userPhotos,
  };
};

class UserViewPage extends Component {
  render() {
    const { profile, photos } = this.props;

    return (
      <Grid>
        <Grid.Column width={4}>
          <ProfileInfo profile={profile} />
        </Grid.Column>
        <Grid.Column width={12}>
          <UserPhotos photos={photos} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((userId) => userDataFetch(userId))
)(UserViewPage);
