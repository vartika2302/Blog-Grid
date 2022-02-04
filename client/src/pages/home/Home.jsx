import React, { useEffect, useState } from "react";
import "./home.css";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        {posts.length ? (
          <Posts posts={posts} />
        ) : (
          <h1 className="sorryMessage">
            SORRY :( No posts of this category available!
          </h1>
        )}
        <Sidebar />
      </div>
    </>
  );
}
