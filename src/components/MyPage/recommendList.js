import React, { useState, useEffect } from "react";
import RecommendUserList from "../RecommendUserList/recommendUserList";
function RecommendList() {
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
        .then((obj) => {setMyPageData(obj.data.myAllTeams); console.log(obj)})        
    }, []);

    return (
        <div>
            {mypagedata && mypagedata.map(myAllTeams => (
                <div key={myAllTeams.teamId}>
                    {console.log("마이페이지1",myAllTeams)}
                    <h1>{myAllTeams.title}팀의 추천 유저 리스트입니다.     </h1>               
                    <RecommendUserList team={myAllTeams}/>
                </div>
              ))}    
        </div>
    );
}

export default RecommendList;