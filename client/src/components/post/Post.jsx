import React from "react";
import "./post.css";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = 'http://localhost:5000/images/'
  return (
    <div className="post">
      <Link to={`/post/${post._id}`} className="link">
        <div className="postWrapper">
          {post.photo && <img src={PF+post.photo} alt="" className="postImg" />}
          <div className="postInfo">
            <div className="postCategory">
              {post.category}
            </div>
            <h4 className="postTitle">{post.title}</h4>
            <div className="creation">
              <span className="postDate">
                {new Date(post.createdAt).toDateString()}
              </span>
              <span className="postTime">{format(post.createdAt)}</span>
            </div>
          </div>
          <p className="postDescription">{post.desc}</p>
        </div>
      </Link>
    </div>
  );
}
