import React, { Component } from "react";
import { Grid, Segment } from "semantic-ui-react";
import { connect } from "react-redux";

import RecipeList from "../RecipeList/RecipeList";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import RecipeNewest from "../RecipeNewest/RecipeNewest";
import { firestoreConnect, isLoaded } from "react-redux-firebase";

const mapStateToProps = (state) => ({
  recipes: state.firestore.ordered.recipes,
});

class RecipeDashboard extends Component {
  render() {
    const { recipes } = this.props;

    if (!isLoaded(recipes)) {
      return <LoadingComponent />;
    }

    return (
      <>
        <Grid>
          <Grid.Row>
            <RecipeList recipes={recipes} />
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
            <RecipeNewest />
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

export default connect(mapStateToProps)(
  firestoreConnect([{ collection: "recipes" }])(RecipeDashboard)
);
