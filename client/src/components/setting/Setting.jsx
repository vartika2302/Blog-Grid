import React, { useContext, useState } from "react";
import "./setting.css";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Setting() {
  const { user, dispatch } = useContext(Context);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [delSuccess, setDelSuccess] = useState(false);
  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);

      updatedUser.profilePicture = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/users/" + user._id, {
        data: { userId: user._id },
      });
      dispatch({ type: "LOGOUT" });
      setDelSuccess(true);
    } catch (err) {}
  };

  return (
    <div className="setting">
      <div className="settingWrapper">
        <div className="settingTitles">
          <span className="settingUpdateTitle">Update Your Account</span>
          <span className="settingDeleteTitle" onClick={handleDelete}>
            Delete Your Account
          </span>
        </div>
        <form className="settingForm" onSubmit={handleSubmit}>
          <label className="settingLabel">Profile Picture</label>
          <div className="settingImage">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : user.profilePicture !== ""
                  ? PF + user.profilePicture
                  : `../../no-avatar.jfif`
              }
              alt=""
              className="profilePicture"
            />
            <label htmlFor="settingFile">
              <i class="far fa-user-circle profileIcon"></i>
            </label>
            <input
              type="file"
              id="settingFile"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label className="settingLabel">Username</label>
          <input
            type="text"
            className="settingInput"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="settingLabel">Email</label>
          <input
            type="email"
            className="settingInput"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="settingLabel">Password</label>
          <input
            type="password"
            className="settingInput"
            placeholder="--------"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingBtn" type="submit">
            Update
          </button>

          {success && (
            <span
              style={{ color: "green", textAlign: "center", fontWeight: "500" }}
            >
              Profile has been updated successfully!!
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
