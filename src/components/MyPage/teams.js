import React, { useState, useEffect } from "react";
import MyPageList from "../MyPageList/mypagelist";
import { Card } from "../Card/card";
import { MyTeamCard } from "../UserTeams/myTeamCard"
import "./myteamlist.css";

const Teams = () => {
  const refresh_token = localStorage.getItem("refresh-token");
  const login_token = localStorage.getItem("login-token");

    const [mypagedata, setMyPageData] = useState();
    useEffect(() => {                 
        fetch(`${process.env.REACT_APP_API_URL}/mypage`,{     
            headers: {
                'refresh-token': refresh_token,
                'login-token': login_token,
            } 
    })
    .then((response) => response.json())        
    .then((obj) => {setMyPageData(obj.data.myAllTeams); console.log(obj)});
    }, []);

    

  return (
    <div className="myteamlist-container">
     <div className="myteamlist_wrapper">
        {mypagedata && mypagedata.map(myAllTeams =>(  
          <div>
                <MyTeamCard team={myAllTeams} />                              
          </div>
        ))}
      </div>    
    </div>
    
  );
};

export default Teams;