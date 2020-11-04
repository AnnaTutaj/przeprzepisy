import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Grid } from "semantic-ui-react";
import ProfileInfo from "./ProfileInfo";
import UserPhotos from "./UserPhotos";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import UserRecipes from "./UserRecipes";
import { getUserRecipes, clearUserRecipes } from "../../recipe/recipeActions";

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
    requesting: state.firestore.status.requesting,
    recipes: state.recipes.userRecipes,
    loading: state.async.loading,
  };
};

const mapDispatchToProps = {
  getUserRecipes,
  clearUserRecipes,
};

class UserViewPage extends Component {
  state = {
    moreRecipes: false,
    loadingInitial: true,
    loadedRecipes: [],
  };

  getNextRecipes = async () => {
    const { recipes, userId } = this.props;
    let lastFetchedRecipe =
      recipes && recipes.length && recipes[recipes.length - 1];
    let next = await this.props.getUserRecipes(userId, lastFetchedRecipe);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreRecipes: false,
      });
    }
  };

  async componentDidMount() {
    let next = await this.props.getUserRecipes(this.props.userId);

    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreRecipes: true,
        loadingInitial: false,
      });
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.recipes !== prevProps.recipes) {
      this.setState({
        loadedRecipes: [...this.state.loadedRecipes, ...this.props.recipes],
      });
    }
  };

  async componentWillUnmount() {
    this.props.clearUserRecipes();
  }

  render() {
    const { profile, photos, loading } = this.props;
    const { moreRecipes, loadedRecipes } = this.state;

    if (this.state.loadingInitial) {
      return <LoadingComponent />;
    }

    return (
      <Grid>
        <Grid.Column width={4}>
          <ProfileInfo profile={profile} />
        </Grid.Column>
        <Grid.Column width={12}>
          <UserPhotos photos={photos} />
          <UserRecipes
            recipes={loadedRecipes}
            moreRecipes={moreRecipes}
            getNextRecipes={this.getNextRecipes}
            loading={loading}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((userId) => userDataFetch(userId))
)(UserViewPage);
