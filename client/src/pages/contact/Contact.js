import React from "react";
import "./contact.css";

export default function Contact() {
  return (
    <div className="contact">
      <div className="contactWrapper">
        <h1 className="contactTitle">Connect with us!!</h1>
        <div className="contactIcons">
          <a
            href="https://www.instagram.com/asvartika/"
            target="_blank"
            rel="noopener noreferrer"
            className="link conIcon"
          >
            <i class="fab fa-instagram-square"></i>
          </a>

          <a
            href="https://www.linkedin.com/in/vartika-gupta-40a1261bb/"
            rel="noopener noreferrer"
            target="_blank"
            className="link conIcon"
          >
            <i class="fab fa-linkedin"></i>
          </a>

          <a
            href="https://github.com/vartika2302"
            rel="noopener noreferrer"
            target="_blank"
            className="link conIcon"
          >
            <i class="fab fa-github-square"></i>
          </a>

          <a
            href="https://m.facebook.com/100006932594698"
            rel="noopener noreferrer"
            target="_blank"
            className="link conIcon"
          >
            <i class="fab fa-facebook-square"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
