import React from "react";
import { Link } from "react-router-dom";
import { Comment } from "semantic-ui-react";
import { formatDistance } from "date-fns";
import { pl } from "date-fns/locale";
import RecipeViewChatForm from "./RecipeViewChatForm";

const ReceipeViewCommentItem = ({
  comment,
  showReplyForm,
  selectedCommentId,
  addRecipeComment,
  recipeId,
  openReplyForm,
  closeReplyForm,
}) => {
  return (
    <Comment>
      <Comment.Avatar
        as={Link}
        to={`/uzytkownik/${comment.createdByUid}`}
        src={comment.createdByPictureURL || "/assets/dummyUser.png"}
      />
      <Comment.Content>
        <Comment.Author as={Link} to={`/uzytkownik/${comment.createdByUid}`}>
          {comment.createdByNick}
        </Comment.Author>
        <Comment.Metadata>
          <span>
            {formatDistance(comment.createdAt, Date.now(), {
              locale: pl,
            })}{" "}
            temu
          </span>
        </Comment.Metadata>
        <Comment.Text>{comment.text}</Comment.Text>
        <Comment.Actions>
          <Comment.Action onClick={openReplyForm(comment.id)}>
            Odpowiedz
          </Comment.Action>
        </Comment.Actions>
        {showReplyForm && selectedCommentId === comment.id && (
          <RecipeViewChatForm
            addRecipeComment={addRecipeComment}
            closeForm={closeReplyForm}
            recipeId={recipeId}
            parentId={comment.parentId ? comment.parentId : comment.id}
            form={`reply_${comment.id}`}
          />
        )}
      </Comment.Content>
      {comment.childNodes && comment.childNodes.length > 0 && (
        <Comment.Group>
          {comment.childNodes.map((child) => (
            <ReceipeViewCommentItem
              key={child.id}
              comment={child}
              showReplyForm={showReplyForm}
              selectedCommentId={selectedCommentId}
              addRecipeComment={addRecipeComment}
              recipeId={recipeId}
              openReplyForm={openReplyForm}
              closeReplyForm={closeReplyForm}
            />
          ))}
        </Comment.Group>
      )}
    </Comment>
  );
};

export default ReceipeViewCommentItem;
