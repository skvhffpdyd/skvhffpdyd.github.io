import React from "react";
import { ReactComponent as Hansung } from "../../assets/images/hansungmating.svg";
import "./footer.css"; // CSS 파일을 import 합니다.

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="logo">
        <Hansung width={150}/>
      </div>
      <div className="contact">
        <p>Contact 1871166@hansung.ac.kr</p>
        <p>Copyright 2023. HansungMating All rights reserved</p>
      </div>
      <div className="links">
        <ul>
          <li>
            <a href="#">이용약관</a>
          </li>
          <li>
            <a href="#">개인정보처리방침</a>
          </li>
          <li>
            <a href="#">서비스소개</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
