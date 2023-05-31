import { useEffect,useState } from "react";
import RecommendUserList from "../RecommendUserList/recommendUserList";
import { MenuItem, Select } from "@mui/material";
function RecommendUsers(){
    const refresh_token = localStorage.getItem("refresh-token");
    const login_token = localStorage.getItem("login-token");
    const [inputs, setInputs] = useState({
      selectedTeam: 0,
    });
    
      const { selectedTeam } = inputs; //비구조화 할당
      const [myTeams, setMyTeams] = useState([]);
    
      useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/teams/myteams`, {
          headers: {
            "refresh-token": refresh_token,
            "login-token": login_token,
          },
        })
          .then((response) => response.json())
          .then((obj) => {
            setMyTeams(obj.data);
            console.log(obj);
          });
      }, []);
    
      const onChange = (e) => {
        const { name, value } = e.target;
        const nextInputs = {
          //spread 문법. 현재 상태의 내용이 이 자리로 온다.
          ...inputs,
          [name]: value,
        };
        //객체를 새로운 상태로 쓰겠다.
        setInputs(nextInputs);
      };
    
      if (myTeams === undefined) {
        return <div>Loading...</div>;
      }
      if(myTeams.length==0){
        return <div>만든 팀이 없습니다</div>;
      }
    return(
        <div className="find_container">
          <div className="find_text">
            추천 유저를 찾아보세요!
          </div>
          <div className="find_title">
            <label>팀별</label>
            <Select
              style={{ width: "50%" }}
              value={selectedTeam}
              onChange={onChange}
              name="selectedTeam"
            >
              {myTeams.map((data, index) => (
                <MenuItem key={index} value={index}>
                  {data.title}
                </MenuItem>
              ))}
            </Select>
            <hr />
          </div>
          <div className="find_body_top"></div>
          <div className="findList-container">
            <div className="find_text">
            {myTeams[selectedTeam].title}팀의 추천 유저
                리스트입니다.{" "}
            </div>
            <RecommendUserList
              team={myTeams[selectedTeam]}
              selectedTeam={selectedTeam}
            />
          </div>
        </div>
    );
}
export default RecommendUsers;