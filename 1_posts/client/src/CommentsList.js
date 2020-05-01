import React from "react";
// import axios from "axios";

const CommentsList = ({ comments }) => {
  const content= (comment)=>{
    switch (comment.status) {
      case 'approved':
        return comment.content
      case 'pending':
        return 'awaiting approval'
      case 'rejected':
        return 'this comment has been rejected'
    
      default:
        break;
    }
  }
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{content(comment)}</li>
      ))}
    </ul>
  );
};

export default CommentsList;
