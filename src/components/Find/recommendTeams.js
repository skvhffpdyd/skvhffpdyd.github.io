import { MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { Card } from "../Card/card";
import "./rcTeams.css";

function RecommendTeams(){
    const refresh_token = localStorage.getItem("refresh-token");
    const login_token = localStorage.getItem("login-token");

    const [recommendTeam, setRecommendTeam] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [selectkeywords, setSelectkeywords] = useState(0);

  
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/member/userForm`, {
          headers: {
            "refresh-token": refresh_token,
            "login-token": login_token,
          },
        })
          .then((response) => response.json())
          .then((obj) => {
            setKeywords(obj.data.member.memberKeywords);
            console.log(obj);
          });
    }, []);

    useEffect(() => {
        if (keywords.length !== 0) {
            fetch(`${process.env.REACT_APP_API_URL}/member/recommend?category=${keywords[selectkeywords].category}&field=${keywords[selectkeywords].field}&sub=${keywords[selectkeywords].sub}`, {
                headers: {
                  "refresh-token": refresh_token,
                  "login-token": login_token,
                },
            })
            .then((response) => response.json())
            .then((obj) => {
                setRecommendTeam(obj.data);
                console.log(obj);
            });
        }
    }, [selectkeywords, keywords]);

    return(
        <div className="find_container">
            <div className="find_text">
                추천 팀을 찾아보세요!
            </div>
            <div className="find_title">
            <label>키워드별</label>
            <Select
              style={{ width: "50%" }}
              value={selectkeywords}
              name="selectedTeam"
            >
            {keywords.length !== 0 && keywords.map((data, index) => (
                <MenuItem key={index} value={index} onClick={() => setSelectkeywords(index)}>
                  {data.category}/{data.field}
                </MenuItem>
              ))}
            </Select>
            <hr />
          </div>
            <div className="find-container">
            <h1>추천 팀</h1>
            <div className="find-team">
            {recommendTeam.length !== 0 && recommendTeam.map((data) => (
                <Card team={data} key={data.id} />
            ))}
            </div>            
            </div>
        </div>
    );
}

export default RecommendTeams;