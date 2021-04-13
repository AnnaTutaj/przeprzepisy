import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { Segment, Image, List, Header, Icon } from "semantic-ui-react";
import RecipeLikes from "./RecipeLikes";
import { objectToArray } from "../../../app/common/util/helpers";
import { addFavRecipe, removeFavRecipe } from "../../user/userActions";
import { openModal } from "../../modals/modalActions";

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
});

const mapDispatchToProps = {
  addFavRecipe,
  removeFavRecipe,
  openModal,
};

class RecipeListItem extends Component {
  goToRecipe = (recipeId) => {
    this.props.history.push(`/przepisy/${recipeId}`);
  };

  render() {
    const {
      recipe,
      auth,
      addFavRecipe,
      removeFavRecipe,
      openModal,
    } = this.props;
    const likedBy = recipe && recipe.likedBy && objectToArray(recipe.likedBy);
    const isLiked = likedBy.some((x) => x.id === auth.uid);
    const authenticated = auth.isLoaded && !auth.isEmpty;

    return (
      <Segment.Group>
        <Segment>
          <Image
            className='ui fluid cur_p'
            src={recipe.pictureURL || "/assets/dummyRecipe.jpg"}
            as={Link}
            to={`/przepisy/${recipe.id}`}
          />
          <Header
            as='h2'
            className='recipe-header'
            onClick={() => this.goToRecipe(recipe.id)}
          >
            {recipe.title || ""}
          </Header>
          <small>
            Autor(ka):{" "}
            <Link to={`uzytkownik/${recipe.createdByUid}`}>
              {recipe.createdBy}
            </Link>
          </small>
          <div>{recipe.description}</div>
        </Segment>
        <Segment>
          {/* //todo odswiezac widok aktualnego elementu, zeby avatary sie uaktualnily, 
          dodac rules przy lajkowaniu (dodac mozna niepolubione i nie swoje, a usuwac mozna Adpolubione) */}
          {isLiked ? (
            <Icon
              link
              name='heart'
              color='red'
              onClick={() => removeFavRecipe(recipe)}
            />
          ) : (
            <Icon
              link
              name='heart outline'
              onClick={() =>
                authenticated ? addFavRecipe(recipe) : openModal("UnauthModal")
              }
            />
          )}
          <List horizontal>
            {likedBy &&
              likedBy.map((l) => <RecipeLikes key={l.id} likedBy={l} />)}
          </List>
        </Segment>
      </Segment.Group>
    );
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(RecipeListItem);
