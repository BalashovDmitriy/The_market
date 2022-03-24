import React from "react";
import CommentList from "../commentList/CommentList";
import CommentForm from "../comentForm/CommentForm";

function CommentContainer({comments, addComment, setComments, user}) {
  return (
    <div className="CommentContainer">
      <h2 className="CommentContainer__title">Отзывы</h2>
      <CommentList comments={comments} setComments={setComments} user={user}/>
      <CommentForm addComment={addComment}/>
    </div>
  );
}

export default CommentContainer;
