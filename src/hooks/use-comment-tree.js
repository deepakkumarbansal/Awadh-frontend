import { useState } from "react";

const useCommentTree = (initialComments) => {
  const [comments, setComments] = useState(initialComments);

  const insertNode = (tree, commentId, newComment) => {
    return tree?.map((comment) => {
      if (commentId === comment.id) {
        return {
          ...comment,
          replies: [...comment?.replies, newComment],
        };
      } else if (comment.replies && comment.replies.length > 0) { //going inside the perticular comment
        return {
            ...comment,
            replies: insertNode(comment.replies, commentId, newComment)
        }
      } else {
        return newComment
      }
    });
  };

  const insertComment = (commentId, content) => {
    console.log("conmete", commentId, content);
    
    const newComment = {
      id: Date.now(),
      comment:content,
      votes: 0,
      timestamps: new Date().toISOString(),
      replies: [],
      isEdited: false
    };
    // if comment is reply of another comment:
    if (commentId) {
      setComments((prevComments) =>
        insertNode(prevComments, commentId, newComment)
      );
    }
    // if a comment is new:
    else {
      setComments((prevComments)=> [newComment, ...prevComments]);
    }
  };
  
  const editComment = (commentId, content) => {
    comments.map((comment)=> {
        if(comment.id === commentId){
            return {
                ...comment,
                comment: content,
                // timestamps: new Date().toISOString(), //up to client
                isEdited: true,
            }
        }
    })
  }

  return {
    comments,
    insertComment
  };
};

export default useCommentTree;
