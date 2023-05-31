import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ConstructionIcon from "@mui/icons-material/Construction";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Request from "./request";
import { Dialog } from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import MemberCard from "../MemberCard/index";
import "./teamDetail.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function TeamDetail() {
  const refresh_token = localStorage.getItem("refresh-token");
  const login_token = localStorage.getItem("login-token");
  const params = useParams();
  const teamId = params.teamId;
  const navigate = useNavigate();
  const [updatable, setUpdatable] = useState(false);
  const [leaderImg, setLeaderImg] = useState("");
  const [showRequest, setShowRequest] = useState(false);
  const [leaderInfo,setLeaderInfo] =useState(null);
  const handleClose = () => {
    setShowRequest(false);
  };
  const showReq = () => {
    setShowRequest(true);
  };

  const [teamDetail, setTeamDetail] = useState({
    createDate: "",
    currentTeamMemberCount: 0,
    detail: "",
    imagePaths: [],
    purpose: null,
    purposeDetail1: null,
    purposeDetail2: null,
    requestList: {},
    teamKeyword: {},
    teamDatabase: {},
    teamFramework: {},
    teamLanguage: {},
    teamLeader: "",
    title: "",
    updateDate: "",
    wantTeamMemberCount: 0,
    writer: null,
  });

  const [inputs, setInputs] = useState({
    input_detail: "",
    input_field: 0, //프론트 1 백 2 상관없음 3 선택하는 이렇게 해서 서버에 보냄
  });
  const { input_detail, input_field } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    const nextInputs = {
      //spread 문법. 현재 상태의 내용이 이 자리로 온다.
      ...inputs,
      [name]: value,
    };
    //객체를 새로운 상태로 쓰겠다.
    setInputs(nextInputs);
    console.log(inputs);
  };

  const Putinputs = () => {
    fetch(`${process.env.REACT_APP_API_URL}/user-to-team/${teamId}/add`, {
      method: "POST",
      headers: {
        "refresh-token": refresh_token,
        "login-token": login_token, //헤더로 로그인 토큰 넣어야 삭제됨
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        detail: inputs.input_detail,
        field: inputs.input_field,
        //백프론트 선택이랑 detail은 간단한 설명
      }),
    })
      .then((response) => response.json())
      .then((obj) => alert(obj.message));
  };
  const test = () => {
    console.log(uppercasedData);
  };
  //들어온 요구사항 값을 나눠서 그래프에 띄우기 위해 처리하는 코드로 ~data1이 C,JAVA 같은 문자 data2가 그에 맞는 숫자 값이다.
  const filteredLanguage = Object.entries(
    Object.entries(teamDetail.teamLanguage)
      .sort((a, b) => b[1] - a[1])
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
  ).filter(([key, value]) => key !== "id" && value !== 0);
  const Languagedata1 = filteredLanguage
    .map((item) => item[0])
    .map((item) =>
      item.toUpperCase().replace("CS", "C#").replace("CPP", "C++")
    );
  const Languagedata2 = filteredLanguage.map((item) => item[1]);

  const filteredFramework = Object.entries(
    Object.entries(teamDetail.teamFramework)
      .sort((a, b) => b[1] - a[1])
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
  ).filter(([key, value]) => key !== "id" && value !== 0);
  const Frameworkdata1 = filteredFramework
    .map((item) => item[0])
    .map((item) => item.toUpperCase().replace("TDMAX", "3DMAX"));
  const Frameworkdata2 = filteredFramework.map((item) => item[1]);

  const uppercasedData = Frameworkdata1.map((item) =>
    item.toUpperCase().replace("TDMAX", "3DMAX")
  );

  const filteredDatabase = Object.entries(
    Object.entries(teamDetail.teamDatabase)
      .sort((a, b) => b[1] - a[1])
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
  ).filter(([key, value]) => key !== "id" && value !== 0);
  const Databasedata1 = filteredDatabase
    .map((item) => item[0])
    .map((item) =>
      item
        .toUpperCase()
        .replace("MYSQLL", "MYSQL")
        .replace("MARIADBL", "MARIA DB")
        .replace("MONGODBL", "MONGO DB")
        .replace("SCHEMAL", "DB 설계")
    );
  const Databasedata2 = filteredDatabase.map((item) => item[1]);

  useEffect(() => {
    window.scrollTo(0, 0); 
    fetch(`${process.env.REACT_APP_API_URL}/teams/${teamId}`, {
      headers: {
        "refresh-token": refresh_token,
        "login-token": login_token,
      },
    })
      .then((response) => response.json())
      .then((obj) => {
        setTeamDetail(obj.data);
        setUpdatable(obj.updatable);
        fetch(`${process.env.REACT_APP_API_URL}/member/search/uid/${obj.data.teamLeader}`, {
          headers: {
            "refresh-token": refresh_token,
            "login-token": login_token,
          },
        }).then((response) => response.json())
        .then(obj=>{console.log("member",obj.memberKeywords);
        setLeaderInfo(obj);
    setLeaderImg(obj.profileImageUrl)});
    
      });
  }, []);

  //도넛 그래프를 위해 선언해놓는거
  const Databasedonut = {
    labels: Databasedata1,
    datasets: [
      {
        label: "# of Votes",
        data: Databasedata2,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const Frameworkdonut = {
    labels: Frameworkdata1,
    datasets: [
      {
        label: "# of Votes",
        data: Frameworkdata2,
        backgroundColor: [
          "#61DAFB",
          "#3DDC84",
          "#026e00",
          "#007AFF",
          "#6DB33F",
          "#000000",
          "#1C3643",
          "#FFC20E",
        ],
        borderColor: [
          "#61DAFB",
          "#3DDC84",
          "#026e00",
          "#007AFF",
          "#6DB33F",
          "#000000",
          "#1C3643",
          "#FFC20E",
        ],
        borderWidth: 1,
      },
    ],
  };

  const Languagedonut = {
    labels: Languagedata1,
    datasets: [
      {
        label: "# of Votes",
        data: Languagedata2,
        backgroundColor: [
          "#3366CC",
          "#66CCFF",
          "#009933",
          "#FF6600",
          "#FFCC00",
          "#FF33CC",
          "#009999",
          "#993399",
          "#FF9900",
          "#9966CC",
          "#0073C2",
          "#FF6699",
        ],
        borderColor: [
          "#3366CC",
          "#66CCFF",
          "#009933",
          "#FF6600",
          "#FFCC00",
          "#FF33CC",
          "#009999",
          "#993399",
          "#FF9900",
          "#9966CC",
          "#0073C2",
          "#FF6699",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="teamDetail-container">
      <div
        className="teamDetail-top"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0) 98%, rgb(255, 255, 255)),url(${
             "https://firebasestorage.googleapis.com/v0/b/caps-1edf8.appspot.com/o/banner%2Fbanner-default.jpg?alt=media"
          })`,
        }}
      >
       
          <img
            className="teamLeader-img"
            src={`${leaderImg}`}
            alt={leaderImg}
            key={leaderImg}
          />
        
      </div>
    <div className="detail-container">
        
      <div className="teamdetail">
        <div className="teamdetail1">
          <div className="teamdetail_head">
            <div className="title">
              <h1>{teamDetail.title}</h1>
              
            </div>
            <hr style={{marginTop:"35px", marginBottom:"35px",color:"gray"}}/>
            <div className="image">
              {teamDetail.imagePaths.map((filename) => (
                <img
                  src={`${filename}`}
                  alt={filename}
                  key={filename}
                  style={{ width: "80%", height: "auto" }}
                /> 
              ))}
            </div>
          </div>
          <div className="teamdetail-title2">
            {teamDetail.teamKeyword.sub == null ? (
              <h3>
                {teamDetail.teamKeyword.field}의 {teamDetail.teamKeyword.sub}
                반에서 {teamDetail.teamKeyword.category}로 뽑고 있습니다!{" "}
              </h3>
            ) : (
              <h3>
                {teamDetail.teamKeyword.category}에서{" "}
                {teamDetail.teamKeyword.field}를 뽑고 있습니다!{" "}
              </h3>
            )}
          </div>
          <div className="teamdetail_summary">
            <div className="모집유형">
              <h3>모집유형</h3>
              <div className="team-title">
                <BadgeIcon />
                <p className="team-text">팀명: {teamDetail.teamName}</p>
              </div>
              <div className="purpose-title">
                <ConstructionIcon />
                <p className="team-text">
                  팀빌딩 목적: {teamDetail.teamKeyword.category}
                </p>{" "}
              </div>
              <div className="field-title">
                <QuestionMarkIcon />
                <p className="team-text">
                  모집 분야: {teamDetail.teamKeyword.field}
                </p>
              </div>
              <div className="people-title">
                <GroupAddIcon />
                <p className="team-text">
                  모집 인원: {teamDetail.wantTeamMemberCount}
                </p>
              </div>
            </div>
            <div className="want-box">
              <h3 className="want-title">요구 능력</h3>
              <div className="요구능력">
                <div>
                  {filteredLanguage.length === 0 ? null : "프로그래밍 언어"}
                  {filteredLanguage.length === 0 ? null : (
                    
                      <Doughnut data={Languagedonut} />
                    
                  )}
                </div>
                <div>
                  {filteredFramework.length === 0 ? null : "프레임워크"}
                  {filteredFramework.length === 0 ? null : (
                    
                      <Doughnut data={Frameworkdonut} />
                    
                  )}
                </div>
                <div>
                  {filteredDatabase.length === 0 ? null : "데이터베이스"}
                  {filteredDatabase.length === 0 ? null : (
                    
                      <Doughnut data={Databasedonut} />
                    
                  )}
                </div>
              </div>
            </div>
            <div className="summary">
              <h2 className="want-title">내용</h2>
              <div
                className="detail-text"
                dangerouslySetInnerHTML={{ __html: teamDetail.detail }}
              />
            </div>
          </div>
        </div>
        {updatable ? (
          <div className="teamdetail_bottom">
            <button
              className="teamdetail-btn"
              onClick={() => {
                navigate(`/post/team/${teamId}/editTeam`);
              }}
            >
              수정하기
            </button>

            <button
              className="teamdetail-btn"
              onClick={() => {
                fetch(
                  `${process.env.REACT_APP_API_URL}/teams/${teamId}/delete`,
                  {
                    method: "POST",
                    headers: {
                      "refresh-token": refresh_token,
                      "login-token": login_token, //헤더로 로그인 토큰 넣어야 삭제됨
                    },
                  }
                )
                  .then((response) => response.json())
                  .then((obj) => alert(obj.message))
                  .then(() => navigate(`/list/team`));
              }}
            >
              삭제하기
            </button>
          </div>
        ) : teamDetail.wantTeamMemberCount == 0 ? (<p>이 공고는 마감되었습니다!</p>) : (
          login_token != null ? (
          <button className="팀신청" onClick={showReq}>
            팀원 신청
          </button>
        ) : (
          ""
        ))}
        <Dialog open={showRequest} onClose={handleClose}>
          <Request teamId={teamId} setShowRequest={setShowRequest} />
        </Dialog>
      </div>
      <div className="leaderInfo">
          {leaderInfo!=null ? <MemberCard payload={leaderInfo} fetchData={leaderInfo}/> : null}
      </div>
      </div>
      
    </div>
  );
}

export default TeamDetail;
