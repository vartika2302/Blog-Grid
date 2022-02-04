import React from "react";
import "./header.css";
export default function Header() {
  return (
    <div className="header">
      <div className="headerWrapper">
        <div className="headerTitles">
          <span className="headerTitleSm">For bloggers...</span>
          <span className="headerTitleLg">Blog Grid</span>
        </div>
        <div className="headerImg"></div>
      </div>
    </div>
  );
}
