// import React, { useEffect, useRef, useState } from "react";
// import useCommentTree from "../../hooks/use-comment-tree";

// // to be add the functionality of add, delete and update comment and also restrict the user or reporter if it is inactive

// const NestedCommentsSection = ({
//   comments,

// }) => {
//   const [comment, setComment] = useState("");
//   const {comments : commentsData, insertComment} = useCommentTree(comments);
//   const handleChange = (e) => {
//     setComment(e.target.value);
//   }
//   const handleSumit = () => {
//     if(comment){
//       console.log(comment);

//       handleReplySubmit(undefined, comment)
//       setComment("");
//     }
//   }
//   const handleReplySubmit = (commentId, content) => {
//     insertComment(commentId, content)
//   }
//   return (
//     <div className="w-full mx-auto p-2 md:p-4">
//       <h3 className="text-lg font-bold opacity-60 mb-4">Comments</h3>
//       <div className="mb-2">
//         <ReplySection
//           value={comment}
//           onChange={handleChange}
//           handleSubmit={handleSumit}
//         />
//       </div>
//       {commentsData.map((comment) => (
//         <Comment
//           comment={comment}
//           key={comment.id}
//           onSumitComment={handleReplySubmit}
//         />
//       ))}
//       <button className="text-blue-500 hover:underline text-sm md:text-base">
//         Load More Comments
//       </button>
//     </div>
//   );
// };

// export default NestedCommentsSection;

// const Comment = ({ comment, onSumitComment = () => {} }) => {
//   const [showReplies, setShowReplies] = useState(false);
//   const toggleRepliesButton = () => {
//     setShowReplies(!showReplies);
//   };
//   const [replyContent, setReplyContent] = useState("");
//   const handleChange = (e) => {
//     setReplyContent(e.target.value);
//   };
//   const handleReplySubmit = () => {
//     if (replyContent) {
//       onSumitComment(comment.id, replyContent);
//       setReplyContent("");
//     }
//   };

//   return (
//     <div className="flex items-start mt-4 border-l-2 pl-2 overflow-auto min-w-0">
//       <img
//         src={comment.avatar || "/images/author.jpg"}
//         alt={comment.name}
//         className="w-8 h-8 rounded-full mr-2"
//       />
//       <div className="flex-1">
//         <div className="flex justify-between">
//           <h4 className="text-sm font-semibold">{comment.name}</h4>
//           <span className="text-xs text-gray-500">{comment.time}</span>
//         </div>
//         <p className="mt-1 text-sm text-gray-700">{comment.comment}</p>
//         <div className="flex space-x-4 mt-2 text-sm text-gray-500">
//           <button className="hover:text-blue-500" onClick={toggleRepliesButton}>
//             {showReplies ? "Hide Replies" : "Replies"}
//           </button>
//           <button className="hover:text-green-500">Edit</button>
//           <button className="hover:text-red-500">Delete</button>
//         </div>
//         {showReplies && (
//           <>
//             <ReplySection value={replyContent} onChange={handleChange} handleSubmit={handleReplySubmit} />
//             {comment.replies?.map((reply) => (
//               <Comment comment={reply} key={reply.id} onSumitComment={onSumitComment} />
//             ))}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// const ReplySection = ({ value, onChange, handleSubmit }) => {
//   const textareaRef = useRef(null);

//   useEffect(() => {
//     const textarea = textareaRef.current;
//     if (!textarea) return;

//     const handleHeight = () => {
//       textarea.style.height = "auto";
//       textarea.style.height = `${textarea.scrollHeight}px`;
//     };

//     textarea.addEventListener("input", handleHeight);

//     return () => {
//       return textarea.removeEventListener("input", handleHeight);
//     };
//   }, []);

//   return (
//     <div className="flex flex-col md:flex-row items-end gap-2">
//       <textarea
//         value={value}
//         onChange={onChange}
//         ref={textareaRef}
//         id="comment"
//         className="resize-none bg-gray-100 w-full p-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-0"
//         rows={2}
//         placeholder="Write a comment..."
//       ></textarea>
//       <button
//         className="bg-gradient-to-r from-red-500 to-pink-700 hover:from-pink-600 hover:to-red-800 text-white px-4 py-2 mt-2 md:mt-0 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-95 focus:outline-none focus:ring-4"
//         onClick={handleSubmit}
//       >
//         Add Comment
//       </button>
//     </div>
//   );
// };

import React, { useEffect, useRef, useState } from "react";
import {
  selecAuthUserId,
  selectAuthUserStatus,
} from "../../store/slice/authSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createComment,
  getCommentsByArticle,
} from "../../Services/Operations/comments";
import { toast } from "react-toastify";
const NestedCommentsSection = ({ articleId }) => {
  const userId = useSelector(selecAuthUserId);
  const userStatus = useSelector(selectAuthUserStatus);
  const [comment, setComment] = useState("");
  const [commentsData, setCommentsData] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalCount, setTotalCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleSumit = () => {
    if (comment) {
      createComment(articleId, userId, comment)
        .then((createdComment) => {
          toast.success("Comment created successfully");
          setComment("");
          setCommentsData([createdComment, ...commentsData]);
        })
        .catch((error) => {
          toast.error(`Something went Wrong ${error}`);
        });
    }
  };
  useEffect(() => {
    if (articleId) {
      getCommentsByArticle(articleId, page, limit)
        .then((data) => {
          setCommentsData((prev) => [...prev, ...data.comments]);
          setTotalCount(data.totalCount);
          setPage(data.page);
        })
        .catch((error) => {
          toast.error(`Something went wrong ${error}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [page]);
  const handleReplySubmit = (commentId, content) => {
    insertComment(commentId, content);
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent border-t-4 rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="w-full mx-auto p-2 md:p-4">
      <h3 className="text-lg font-bold opacity-60 mb-4">Comments</h3>
      <div className="mb-2">
        {!userId ? (
          <div className="flex gap-2">
            <p>Please login to add Comments</p>
            <Link className="text-blue-500 hover:underline" to={"/login"}>
              Login
            </Link>
          </div>
        ) : userStatus !== "active" ? (
          <p>Your are not allowed to add comment</p>
        ) : (
          <ReplySection
            value={comment}
            onChange={handleChange}
            handleSubmit={handleSumit}
          />
        )}
      </div>
      {commentsData?.map((comment) => {
        console.log("hi am", commentsData);
        return (
          <Comment
            comment={comment}
            key={comment._id}
            onSumitComment={handleReplySubmit}
          />
        );
      })}
      {!(page * limit >= totalCount) && (
        <button
          className="text-blue-500 hover:underline text-sm md:text-base"
          onClick={() => setPage(page + 1)}
        >
          Load More Comments
        </button>
      )}
    </div>
  );
};

export default NestedCommentsSection;

const Comment = ({ comment, onSumitComment = () => {} }) => {
  const [showReplies, setShowReplies] = useState(false);
  const toggleRepliesButton = () => {
    setShowReplies(!showReplies);
  };
  const [replyContent, setReplyContent] = useState("");
  const handleChange = (e) => {
    setReplyContent(e.target.value);
  };
  const handleReplySubmit = () => {
    if (replyContent) {
      onSumitComment(comment.id, replyContent);
      setReplyContent("");
    }
  };
  console.log("Hello", comment);

  return (
    <div className="flex items-start mt-4 border-l-2 pl-2 overflow-auto min-w-0">
      <img
        src={comment.avatarUrl || "/images/author.jpg"}
        alt={comment.name}
        className="w-8 h-8 rounded-full mr-2"
      />
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="text-sm font-semibold">{comment.userName}</h4>
          <span className="text-xs text-gray-500">{comment.commentedDate}</span>
        </div>
        <p className="mt-1 text-sm text-gray-700">{comment.comment}</p>
      </div>
    </div>
  );
};

const ReplySection = ({ value, onChange, handleSubmit }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleHeight = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    textarea.addEventListener("input", handleHeight);

    return () => {
      return textarea.removeEventListener("input", handleHeight);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-end gap-2">
      <textarea
        value={value}
        onChange={onChange}
        ref={textareaRef}
        id="comment"
        className="resize-none bg-gray-100 w-full p-2 rounded-lg border border-gray-300  "
        rows={2}
        placeholder="Write a comment..."
      ></textarea>
      <button
        className="bg-gradient-to-r from-red-500 to-pink-700 hover:from-pink-600 hover:to-red-800 text-white px-4 py-2 mt-2 md:mt-0 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-95"
        onClick={handleSubmit}
      >
        Add Comment
      </button>
    </div>
  );
};
