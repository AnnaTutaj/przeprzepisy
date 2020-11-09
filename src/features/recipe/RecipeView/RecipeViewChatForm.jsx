import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextAreaInput from "../../../app/common/form/TextAreaInput";

class RecipeViewChatForm extends Component {
  handleCommentSubmit = (values) => {
    const {
      addRecipeComment,
      closeForm,
      reset,
      recipeId,
      parentId,
    } = this.props;
    addRecipeComment(recipeId, values, parentId);
    reset();
    if (parentId !== 0) {
      closeForm();
    }
  };

  render() {
    const { parentId } = this.props;
    return (
      <Form reply onSubmit={this.props.handleSubmit(this.handleCommentSubmit)}>
        <Field
          name='comment'
          label=''
          rows={8}
          component={TextAreaInput}
          placeholder={parentId ? "Napisz odpowiedź..." : "Napisz komentarz..."}
        />
        <Button
          content={parentId ? "Odpowiedz" : "Skomentuj"}
          primary
          size='tiny'
        />
      </Form>
    );
  }
}

export default reduxForm({ Fields: "comment" })(RecipeViewChatForm);
