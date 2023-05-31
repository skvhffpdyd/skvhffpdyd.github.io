import "./style.css";
import { Alert, CircularProgress, TextField, Button } from "@mui/material";
import MemberCard from "../MemberCard/index";
import useApiCall from "../../hooks/useApiCall";
import useInput from "../../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import Category from "../Category/category";

function Members() {
  const refresh_token = localStorage.getItem("refresh-token");
  const login_token = localStorage.getItem("login-token");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchNickname, setSearchNickname] = useInput({
    nickname: "",
  });
  const [page_number, setPage_number] = useState(searchParams.get("page"));
  const [pageCount, setPageCount] = useState(1);
  const [loading, payload, error, fetchData] = useApiCall(
    `${process.env.REACT_APP_API_URL}/member/all?page=${page_number}`
  );
  const [members, setMembers] = useState([]);
  /*카테고리에 쓰이는 변수 선언 여기서부터 */

  const [checkCategory, setCheckCategory] = useState([]);
  const [checkRule, setCheckRule] = useState([]);
  const [checkSubject, setCheckSubject] = useState([]);

  const excludedCategories = ["과목 팀프로젝트"];
  const filteredCategories = checkCategory.filter((category) => !excludedCategories.includes(category));

  const category = filteredCategories.join(",");
  const rule = checkRule.join(",");
  const subject = checkSubject.join(",");

  const isSpecialCategory =
    checkCategory.includes("개인 팀프로젝트") ||
    checkCategory.includes("공모전 및 대회") ||
    checkCategory.includes("캡스톤 디자인");
  const combined = [...checkRule, "상관없음"].join(",");

  /*카테고리에 쓰이는 변수 선언 여기까지*/

  useEffect(() => {
    if (payload) {
      setPage_number(searchParams.get("page"));
      setMembers(payload?.data || []);
      setPageCount(payload.state);
    }
  }, [searchParams, payload]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/member/filter?search=${searchNickname.nickname}&category=${category}&subject=${
        isSpecialCategory ? combined : subject
      }&rule=${rule}&page=${page_number}`,
      {
        headers: {
          "refresh-token": refresh_token,
          "login-token": login_token, //헤더로 로그인 토큰 넣어야 삭제됨
        },
      }
    )
      .then((response) => response.json())
      .then((obj) => {
        setMembers(obj.data);
        console.log(obj);
        setPageCount(obj.metadata.totalPage);
      });
  }, [page_number]);

  useEffect(() => {
    if (checkCategory.length >= 1 || checkRule.length >= 1 || checkSubject.length >= 1) {
      //카테고리 체크한개가 하나라도 있으면 카테고리 방식으로 보냄 즉 카테고리 체크한 상태에서의 2페이지 이상을 확인할때 이 fetch가 돔
      console.log(`서버에 카테고리 방식으로 보냄 ${page_number}페이지`);
      fetch(
        `${process.env.REACT_APP_API_URL}/member/filter?search=${
          searchNickname.nickname
        }&category=${category}&subject=${isSpecialCategory ? combined : subject}&rule=${rule}&page=${page_number}`,
        {
          headers: {
            "refresh-token": refresh_token,
            "login-token": login_token, //헤더로 로그인 토큰 넣어야 삭제됨
          },
        }
      )
        .then((response) => response.json())
        .then((obj) => {
          setMembers(obj.data);
          console.log(obj);
          setPageCount(obj.metadata.totalPage);
          console.log(checkCategory, checkRule, checkSubject);
        });
    }
  }, []);

  if (!payload) {
    return <></>;
  }

  if (loading) {
    return (
      <>
        <CircularProgress color="inherit" />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Alert severity="error">{error}</Alert>
      </>
    );
  }

  const searchMember = async () => {
    if (!searchNickname.nickname) {
      window.location.reload(); // 페이지 새로고침
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/member/search/nickname/${searchNickname.nickname}`
      );
      console.log(response);
      setSearchParams({ page: 1 }); // 검색 결과 페이징 초기화
      setPageCount(1);
      if (response.data === null) {
        setMembers([]);
      } else {
        setMembers(response.data); // 검색 결과로 payload 상태 설정
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (event) => {
    const key = event.code;
    switch (key) {
      case "Enter":
        searchMember();
        break;
      default:
    }
  };

  const categoryOnClick = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/member/filter?search=${
        searchNickname.nickname
      }&category=${category}&subject=${subject}&rule=${isSpecialCategory ? combined : rule}&page=${page_number}`,
      {
        headers: {
          "refresh-token": refresh_token,
          "login-token": login_token, //헤더로 로그인 토큰 넣어야 삭제됨
        },
      }
    )
      .then((response) => response.json())
      .then((obj) => {
        setMembers(obj.data);
        console.log(obj);
        setPageCount(obj.metadata.totalPage);
        console.log(checkCategory, checkRule, checkSubject);
      });
  };

  return (
    <div>
      <div className="contest_search">
        <p className="contest_search_title">메이트 검색</p>
        <div className="search-form">
          <input
            type="text"
            placeholder={searchNickname.nickname === "" ? "닉네임으로 검색해보세요. " : searchNickname}
            className="search_bar"
            name="nickname"
            value={searchNickname.nickname}
            onChange={setSearchNickname}
            onKeyDown={handleKeyDown}
          />
          <button className="search-button" onClick={searchMember}>
            <FaSearch />
          </button>
        </div>
      </div>
      <div className="members-container">
        <div className="member-category">
          <Category
            checkCategory={checkCategory}
            setCheckCategory={setCheckCategory}
            checkRule={checkRule}
            setCheckRule={setCheckRule}
            checkSubject={checkSubject}
            setCheckSubject={setCheckSubject}
            categoryOnClick={categoryOnClick}
          />
        </div>
        <div className="member-card-container">
          {Array.isArray(members) && members.length > 0 ? (
            members.map((member) => (
              <motion.div
                initial={{ opacity: 0.2 }}
                whileInView={{
                  opacity: 1,
                  transition: { delay: 0.1 },
                }}
                whileHover={{
                  scale: 1.12,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
                key={member.id}
              >
                <div>
                  <MemberCard payload={member} fetchData={fetchData} />
                </div>
              </motion.div>
            ))
          ) : members && Object.keys(members).length > 0 ? (
            <motion.div
              initial={{ opacity: 0.2 }}
              whileInView={{
                opacity: 1,
                transition: { delay: 0.1 },
              }}
              whileHover={{
                scale: 1.12,
                transition: { type: "spring", stiffness: 400, damping: 10 },
              }}
              key={members.id}
            >
              <div>
                <MemberCard payload={members} fetchData={fetchData} />
              </div>
            </motion.div>
          ) : (
            <Alert severity="info">검색결과 0 건</Alert>
          )}
        </div>
      </div>
      <Pagination
        sx={{ display: "flex", justifyContent: "center", margin: "30px" }}
        page={Number(searchParams.get("page"))}
        count={pageCount}
        size="large"
        onChange={(e, value) => {
          navigate(`?page=${value}`);
        }}
      />
    </div>
  );
}
export default Members;
