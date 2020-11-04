import React, { Component, Fragment } from "react";
import RecipeList from "./RecipeList";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Loader } from "semantic-ui-react";

class RecipeListScrolled extends Component {
  render() {
    const {
      recipes,
      headerText,
      headerSize,
      getNextRecipes,
      loading,
      moreRecipes,
    } = this.props;

    return (
      <Fragment>
        {recipes && recipes.length !== 0 && (
          <Fragment>
            <InfiniteScroll
              pageStart={0}
              loadMore={getNextRecipes}
              hasMore={!loading && moreRecipes}
              initialLoad={false}
            >
              <RecipeList
                recipes={recipes}
                headerText={headerText}
                headerSize={headerSize}
              />
            </InfiniteScroll>
            <Grid style={{marginTop: '20px', marginBottom:'10px'}}>
              <Grid.Column width={16}>
                <Loader active={loading} />
              </Grid.Column>
            </Grid>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default RecipeListScrolled;
