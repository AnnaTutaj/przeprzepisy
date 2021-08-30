import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Button, Grid, Header, Segment } from "semantic-ui-react";
import RecipeViewComments from "./RecipeViewComments";
import RecipeViewDescription from "./RecipeViewDescription";
import RecipeViewHeader from "./RecipeViewHeader";
import RecipeViewIngredients from "./RecipeViewIngredients";
import RecipeViewLikes from "./RecipeViewLikes";
import {
  deleteRecipe,
  hideRecipeToggle,
  addRecipeComment,
} from "../recipeActions";
import { withFirestore, firebaseConnect, isEmpty } from "react-redux-firebase";
import {
  objectToArray,
  createDataTree,
} from "../../../app/common/util/helpers";
import { addFavRecipe, removeFavRecipe } from "../../user/userActions";
import { openModal } from "../../modals/modalActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import NotFound from "../../../app/layout/NotFound";

const mapStateToProps = (state, ownProps) => {
  const recipeId = ownProps.match.params.id;

  let recipe = {};

  if (
    state.firestore.ordered.recipes &&
    state.firestore.ordered.recipes.length > 0
  ) {
    recipe =
      state.firestore.ordered.recipes.filter(
        (recipe) => recipe.id === recipeId
      )[0] || {};
  }

  return {
    recipe,
    auth: state.firebase.auth,
    requesting: state.firestore.status.requesting,
    recipeChat:
      !isEmpty(state.firebase.data.recipe_chat) &&
      objectToArray(state.firebase.data.recipe_chat[recipeId]),
  };
};

const mapDispatchToProps = {
  deleteRecipe,
  hideRecipeToggle,
  addFavRecipe,
  removeFavRecipe,
  addRecipeComment,
  openModal,
};

class RecipeViewPage extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`recipes/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`recipes/${match.params.id}`);
  }

  //todo do poprawy
  handleDeleteRecipe = (recipeId) => {
    this.props.deleteRecipe(recipeId);
    this.props.history.push("/przepisy");
  };

  handleHideRecipeToggle = (hide, recipeId) => {
    this.props.hideRecipeToggle(hide, recipeId);
  };

  render() {
    const {
      recipe,
      auth,
      addFavRecipe,
      removeFavRecipe,
      addRecipeComment,
      recipeChat,
      openModal,
      requesting,
      match,
    } = this.props;
    const likedBy = recipe && recipe.likedBy && objectToArray(recipe.likedBy);
    const chatTree = !isEmpty(recipeChat) && createDataTree(recipeChat);
    const authenticated = auth.isLoaded && !auth.isEmpty;
    const loadingRecipe = requesting[`recipes/${match.params.id}`];

    if (loadingRecipe) {
      return <LoadingComponent />;
    }

    if (Object.keys(recipe).length === 0) {
      return <NotFound />;
    }

    return (
      <div>
        <Grid>
          <Grid.Row stretched>
            <RecipeViewHeader
              auth={auth}
              recipe={recipe}
              deleteRecipe={this.handleDeleteRecipe}
              hideRecipeToggle={this.handleHideRecipeToggle}
              likedBy={likedBy}
              addFavRecipe={addFavRecipe}
              removeFavRecipe={removeFavRecipe}
              authenticated={authenticated}
              openModal={openModal}
            />
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column mobile={16} computer={8}>
              <RecipeViewIngredients recipe={recipe} />
            </Grid.Column>
            <Grid.Column mobile={16} computer={8}>
              <RecipeViewDescription recipe={recipe} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            {authenticated ? (
              <Grid.Column mobile={16} computer={8}>
                <RecipeViewComments
                  addRecipeComment={addRecipeComment}
                  recipeId={recipe.id}
                  recipeChat={chatTree}
                />
              </Grid.Column>
            ) : (
              <Grid.Column mobile={16} computer={8}>
                <Segment>
                  <Header as='h3' dividing>
                    Podziel się swoją opinią
                  </Header>
                  <p>
                    Komentarze widoczne są tylko dla zalogowanych użytkowników.
                  </p>
                  <Button primary onClick={() => openModal("UnauthModal")}>
                    Dołącz do nas!
                  </Button>
                </Segment>
              </Grid.Column>
            )}
            <Grid.Column mobile={16} computer={8}>
              <RecipeViewLikes likedBy={likedBy} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default compose(
  withFirestore,
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect((props) => [`recipe_chat/${props.match.params.id}`])
)(RecipeViewPage);
