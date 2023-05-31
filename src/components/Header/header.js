import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, Menu, MenuItem } from "@mui/material";
import { ReactComponent as Hansung } from "../../assets/images/hansungmating.svg";
import "./header.css";
import Login from "../Login";
import SignUp from "../SignUp";
import FindDropDown from "./FindDropDown";
import { useMediaQuery } from "react-responsive";

function Header() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  const isTablet = useMediaQuery({ maxWidth: 1000 });
  const isSmallMobile = useMediaQuery({ maxWidth: 500 });

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleSignupOpen = () => {
    setSignupOpen(true);
  };

  const handleClose = () => {
    setLoginOpen(false);
    setSignupOpen(false);
  };

  const navigate = useNavigate();
  const [loginCheck, setLoginCheck] = useState(false);

  useEffect(() => {
    checkLoginToken();
  });

  const checkLoginToken = () => {
    if (localStorage.getItem("refresh-token")) {
      setLoginCheck(true);
    } else {
      setLoginCheck(false);
    }
  };

  const logout = () => {
    setLoginOpen(false);
    localStorage.removeItem("refresh-token");
    localStorage.removeItem("login-token");
    localStorage.removeItem("userId");
    localStorage.removeItem("nickname");
    localStorage.removeItem("email");
    navigate("/");
  };

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;
      if (currentScrollPosition !== scrollPosition) {
        setScrollPosition(currentScrollPosition);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    console.log(showMenu);
  };

  return (
    <header className={scrollPosition < 300 ? "original_header" : "change_header"}>
      <h2
        onClick={(e) => {
          navigate("/");
        }}
      >
        <Hansung width={isSmallMobile ? 150 : 250} height={isSmallMobile ? 70 : 100} fill="#ffffff" />
      </h2>
      <nav>
        <ul>
          <li>
            <div
              onClick={(e) => {
                navigate("/list/members?page=1");
              }}
            >
              유저 찾기
            </div>
          </li>
          <li>
            <div
              onClick={(e) => {
                navigate("/list/team");
              }}
            >
              팀원 모집
            </div>
          </li>
          <li>
            <div
              onClick={(e) => {
                navigate("/list/contest?page=1");
              }}
            >
              공모전
            </div>
          </li>
          <li>
            <span onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
              <div className="drop-header">추천</div>
              <FindDropDown showDropdown={showDropdown} setShowDropdown={setShowDropdown} />
            </span>
          </li>
          <li>
            {loginCheck ? (
              <>
                <div
                  onClick={(e) => {
                    navigate(`/mypage/profile/${localStorage.getItem("email")}`);
                  }}
                >
                  마이페이지
                 
                </div>
              </>
            ) : (
              <div></div>
            )}
          </li>

          <li>
            {loginCheck ? (
              <Button variant="contained" onClick={logout}>
                로그아웃
              </Button>
            ) : (
              <>
                <Button variant="contained" onClick={handleLoginOpen}>
                  로그인/회원가입
                </Button>
                <Dialog open={loginOpen} onClose={handleClose}>
                  <Login onClose={handleClose} onSignupClick={handleSignupOpen} />
                </Dialog>
                <Dialog open={signupOpen} onClose={handleClose}>
                  <SignUp onClose={handleClose} onLoginClick={handleLoginOpen} />
                </Dialog>
              </>
            )}
          </li>
        </ul>
        <input type="checkbox" id="check_box" />
        <label htmlFor="check_box">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <div id="side_menu">
          <div
            onClick={(e) => {
              navigate("/list/members?page=1");
            }}
          >
            유저 찾기
          </div>
          <div
            onClick={(e) => {
              navigate("/list/team");
            }}
          >
            팀원 모집
          </div>
          <div>
            찾기
            <div
              className="drop-item-inner"
              onClick={(e) => {
                navigate("/find/recommend/team", {
                  state: {
                    user: false,
                    team: true,
                  },
                });
              }}
            >
              팀 추천
            </div>
            <div
              className="drop-item-inner"
              onClick={(e) => {
                navigate("/find/recommend/user", {
                  state: {
                    user: true,
                    team: false,
                  },
                });
              }}
            >
              유저 추천
            </div>
          </div>
          {loginCheck ? (
            <div
              onClick={(e) => {
                navigate(`/mypage/profile/${localStorage.getItem("email")}`);
              }}
            >
              마이페이지
            </div>
          ) : (
            <div></div>
          )}
          <div
            onClick={(e) => {
              navigate("/list/contest?page=1");
            }}
          >
            공모전
          </div>
          <div>
            {loginCheck ? (
              <Button variant="contained" onClick={logout}>
                로그아웃
              </Button>
            ) : (
              <>
                <Button variant="contained" onClick={handleLoginOpen}>
                  로그인/회원가입
                </Button>
                <Dialog open={loginOpen} onClose={handleClose}>
                  <Login onClose={handleClose} onSignupClick={handleSignupOpen} />
                </Dialog>
                <Dialog open={signupOpen} onClose={handleClose}>
                  <SignUp onClose={handleClose} onLoginClick={handleLoginOpen} />
                </Dialog>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
