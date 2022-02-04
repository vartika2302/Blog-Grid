import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./singlePost.css";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const [singlePost, setSinglePost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const fetchSinglePost = async () => {
      const res = await axios.get("/posts/" + postId);
      setSinglePost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    fetchSinglePost();
  }, [postId]);

  const PF = "http://localhost:5000/images/";

  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + postId, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put("/posts/" + postId, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {singlePost.photo && (
          <img src={PF + singlePost.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            placeholder={singlePost.title}
            value={title}
            className="singlePostUpdateTitleInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <div className="singlePostTitleInfo">
            <h4 className="singlePostTitle">{title}</h4>
            {user?.username === singlePost.username && (
              <div className="singlePostIcons">
                <i
                  class="far fa-edit edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i class="far fa-trash-alt trash" onClick={handleDelete}></i>
              </div>
            )}
          </div>
        )}
        <div className="singlePostAuthorInfo">
          <span className="singlePostAuthorName">
            Author:
            <Link className="link" to={`/?username=${singlePost.username}`}>
              <b> {singlePost.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(singlePost.createdAt).toDateString()}
          </span>
          <span className="singlePostTime">{format(singlePost.createdAt)}</span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostUpdateDescInput"
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDescription">{desc}</p>
        )}
        {updateMode && (
          <div className="singlePostBtnWrapper">
            <button className="singlePostBtn" onClick={handleUpdate}>
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
