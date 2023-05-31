import React, { useEffect } from 'react';
import { useState } from "react";
import RadarChart from './radarChart';
import { Button } from '@mui/material';
import axios from 'axios';
import MemberCard from '../MemberCard';
import "./recommendUserList.css"

function RecommendUserList({team, selectedTeam}) {
    const [userList, setUserList] = useState(null);
     //로그인 토큰 저장
    const refresh_token = localStorage.getItem("refresh-token");
    const login_token = localStorage.getItem("login-token");
    useEffect(() => {           
            fetch(`${process.env.REACT_APP_API_URL}/teams/${team.teamId}/recommend`,{   
                method: 'POST',  
                headers: {
                    'refresh-token': refresh_token,
                    'login-token': login_token,
                } 
        })
        .then((response) => response.json())        
        .then((obj) => {setUserList(obj.data)
        console.log(obj)});
    }, [selectedTeam]);

    const jointeam = (Id) => {
        axios
          .post(`${process.env.REACT_APP_API_URL}/team-to-user/${team.teamId}/match-request`, {
            userId: Id,
          })
          .then((response) => {            
            console.log(response);
            alert(response.data.message);
          });
      };

   
    return (
        <div className='recommendUser'>
            {userList && userList.map(data =>(
              <div className='추천유저_container'>
            <div className='추천유저' key={data.id}> 
                <div className='추천유저_내용' >
                <MemberCard payload={data}/>      
                </div>           
                <RadarChart teamdata={team} memberdata={data}/>
            </div>
            <Button className='recommendUser_btn' variant="contained" onClick={() => jointeam(data.id)}> {data.nickname}에게 팀원 요청 보내기</Button> 
            </div>        
                ))}
        </div>
    );
}

export default RecommendUserList;