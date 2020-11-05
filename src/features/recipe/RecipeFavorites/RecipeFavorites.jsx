import React, { Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { getUserFavRecipes, clearUserFavRecipes } from "../../recipe/recipeActions";
import { Component } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import RecipeListScrolled from "../RecipeList/RecipeListScrolled";

const mapStateToProps = (state) => {
  return {
    loading: state.async.loading,
    recipes: state.recipes.userFavRecipes,
    recipeLikes: state.recipes.recipeLikes,
  };
};

const mapDispatchToProps = {
  getUserFavRecipes,
  clearUserFavRecipes
};

class RecipeFavorites extends Component {
  state = {
    moreRecipes: false,
    loadingInitial: true,
    loadedRecipes: [],
  };

  getNextRecipes = async () => {
    const { recipeLikes } = this.props;
    let lastFetchedRecipeLike =
      recipeLikes &&
      recipeLikes.length &&
      recipeLikes[recipeLikes.length - 1] &&
      recipeLikes[recipeLikes.length - 1];
    let next = await this.props.getUserFavRecipes(lastFetchedRecipeLike);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreRecipes: false,
      });
    }
  };

  async componentDidMount() {
    let next = await this.props.getUserFavRecipes();
    this.setState({
      moreRecipes: next && next.docs && next.docs.length > 1,
      loadingInitial: false,
    });
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.recipes !== prevProps.recipes) {
      this.setState({
        loadedRecipes: [...this.state.loadedRecipes, ...this.props.recipes],
      });
    }
  };

    async componentWillUnmount() {
      this.props.clearUserFavRecipes();
    }

  render() {
    const { loading } = this.props;
    const { loadedRecipes, moreRecipes } = this.state;

    if (this.state.loadingInitial) {
      return <LoadingComponent />;
    }

    return (
      <Fragment>
        {loadedRecipes && loadedRecipes.length ? (
          <Segment>
            <RecipeListScrolled
              headerText='Ulubione przepisy'
              headerSize='h3'
              recipes={loadedRecipes}
              loading={loading}
              getNextRecipes={this.getNextRecipes}
              moreRecipes={moreRecipes}
            />
          </Segment>
        ) : (
          <Segment>
            <Header as='h2' icon textAlign='center'>
              <Icon name='heart outline' color='red' />
              <Header.Content>Zachowaj ulubione</Header.Content>
            </Header>
            <Header
              as='h4'
              textAlign='center'
              content='Polub przepisy i znajdź je tutaj'
            ></Header>
            <Segment basic textAlign='center'>
              <Button primary content='Przeglądaj' as={Link} to='/przepisy' />
            </Segment>
          </Segment>
        )}
      </Fragment>
    );
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  RecipeFavorites
);
