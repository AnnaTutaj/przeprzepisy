import React, { Component } from "react";
import { Grid, Segment } from "semantic-ui-react";
import { connect } from "react-redux";

import RecipeList from "../RecipeList/RecipeList";

const mapStateToProps = (state) => ({
  recipes: state.recipes,
});

class RecipeDashboard extends Component {
  render() {
    const { recipes } = this.props;

    return (
      <>
        <Grid>
          <Grid.Row>
            <RecipeList
              recipes={recipes}
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
            <Grid.Column>
              <h2>Ostatnio dodane</h2>
              <Segment>
                <h3>W budowie...</h3>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

export default connect(mapStateToProps)(RecipeDashboard);
