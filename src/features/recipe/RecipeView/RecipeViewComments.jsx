import React, { Component } from "react";
import { Comment, Header, Segment } from "semantic-ui-react";
import RecipeViewChatForm from "./RecipeViewChatForm";
import ReceipeViewCommentItem from "./ReceipeViewCommentItem";

class RecipeViewComments extends Component {
  state = {
    showReplyForm: false,
    selectedCommentId: null,
  };

  handleOpenReplyForm = (commentId) => () => {
    this.setState({
      showReplyForm: true,
      selectedCommentId: commentId,
    });
  };

  handleCloseReplyForm = () => {
    this.setState({
      showReplyForm: false,
      selectedCommentId: null,
    });
  };

  render() {
    const { addRecipeComment, recipeId, recipeChat } = this.props;
    const { showReplyForm, selectedCommentId } = this.state;

    return (
      <Segment>
        <Header as='h3' dividing>
          Podziel się swoją opinią
        </Header>
        <Comment.Group>
          {recipeChat &&
            recipeChat.map((comment) => (
              <ReceipeViewCommentItem
                key={comment.id}
                comment={comment}
                showReplyForm={showReplyForm}
                selectedCommentId={selectedCommentId}
                addRecipeComment={addRecipeComment}
                recipeId={recipeId}
                openReplyForm={this.handleOpenReplyForm}
                closeReplyForm={this.handleCloseReplyForm}
              />
            ))}
        </Comment.Group>
        <RecipeViewChatForm
          addRecipeComment={addRecipeComment}
          recipeId={recipeId}
          form={"newComment"}
          parentId={0}
        />
      </Segment>
    );
  }
}

export default RecipeViewComments;
