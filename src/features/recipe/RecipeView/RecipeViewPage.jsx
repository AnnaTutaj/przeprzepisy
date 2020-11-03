import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import RecipeViewComments from "./RecipeViewComments";
import RecipeViewDescription from "./RecipeViewDescription";
import RecipeViewHeader from "./RecipeViewHeader";
import RecipeViewIngredients from "./RecipeViewIngredients";
import RecipeViewLikes from "./RecipeViewLikes";
import { deleteRecipe, hideRecipeToggle } from "../recipeActions";
import { withFirestore } from "react-redux-firebase";
import { objectToArray } from "../../../app/common/util/helpers";
import { addFavRecipe, removeFavRecipe } from "../../user/userActions";

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
  };
};

const mapDispatchToProps = {
  deleteRecipe,
  hideRecipeToggle,
  addFavRecipe,
  removeFavRecipe
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
    const { recipe, auth, addFavRecipe, removeFavRecipe } = this.props;
    const likedBy = recipe && recipe.likedBy && objectToArray(recipe.likedBy);

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
            <Grid.Column mobile={16} computer={8}>
              <RecipeViewComments />
            </Grid.Column>
            <Grid.Column mobile={16} computer={8}>
              <RecipeViewLikes likedBy={likedBy} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default withFirestore(
  connect(mapStateToProps, mapDispatchToProps)(RecipeViewPage)
);
