import React, { useContext } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <h3 className="loginTitle">Login</h3>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label className="loginLabel">Username</label>
          <input
            type="text"
            placeholder="vartika"
            className="loginInput"
            required
            ref={userRef}
          />
          <label className="loginLabel">Password</label>
          <input
            type="password"
            placeholder="vartika001"
            className="loginInput"
            required
            ref={passwordRef}
          />
          <button className="loginBtn" type="submit" disabled={isFetching}>
            LOGIN
          </button>
        </form>
      </div>
      <Link to="/register" className="link btns">
        <button className="loginRegisterBtn">Register</button>
      </Link>
    </div>
  );
}
