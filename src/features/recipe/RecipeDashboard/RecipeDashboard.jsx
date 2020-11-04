import React, { Component } from "react";
import { Grid, Segment } from "semantic-ui-react";
import { connect } from "react-redux";

import RecipeList from "../RecipeList/RecipeList";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { firestoreConnect } from "react-redux-firebase";
import { getLatestRecipes, getMostLikedRecipes } from "../recipeActions";

const mapStateToProps = (state) => ({
  latestRecipes: state.recipes.latestRecipes,
  mostLikedRecipes: state.recipes.mostLikedRecipes,
  loading: state.async.loading,
});

const mapStateToDispatch = {
  getLatestRecipes,
  getMostLikedRecipes,
};

class RecipeDashboard extends Component {
  componentDidMount() {
    this.props.getLatestRecipes();
    this.props.getMostLikedRecipes();
  }

  render() {
    const { latestRecipes, mostLikedRecipes, loading } = this.props;

    if (loading) {
      return <LoadingComponent />;
    }

    return (
      <>
        <Grid>
          <Grid.Row>
            <RecipeList
              recipes={mostLikedRecipes}
              headerText='Popularne przepisy'
            />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <h2>Najnowsze komentarze</h2>
              <Segment>
                <h3>W budowie...</h3>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <RecipeList recipes={latestRecipes} headerText='Ostatnio dodane' />
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(firestoreConnect([{ collection: "recipes" }])(RecipeDashboard));
