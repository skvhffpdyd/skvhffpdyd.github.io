import React, { useState, useEffect } from "react";
import { Select, MenuItem  } from "@mui/material";
import "./userTeams.css"
import InvitedTeamList from "../InvitedTeamList/invitedTeamList";
import AppliedTeamList from "./appliedTeamList";
import JoinedTeam from "./joinedTeam";

function UserTeams() {
    const [inputs, setInputs] = useState({
        menu:"소속 팀",
    });
    const {menu} = inputs;	//비구조화 할당   

    const onChange = (e) => {
        const {name, value} = e.target;
        const nextInputs = {
            //spread 문법. 현재 상태의 내용이 이 자리로 온다. 
            ...inputs,
            [name] : value,
        };
        //객체를 새로운 상태로 쓰겠다. 
        setInputs(nextInputs);
    };

    return (
        <div className="teamMembers">
            <div className='teamMembers_container'>
                <div className='teamMembers_title'>
                    <label>팀 관리</label>                    
                    <Select className='userTeams_select' value={menu} onChange={onChange} name="menu">
                        <MenuItem  value="소속 팀">소속 팀</MenuItem>
                        <MenuItem  value="지원한 팀">지원한 팀</MenuItem>
                        <MenuItem  value="초대장">초대장</MenuItem>
                    </Select>                   
                    <hr/>                    
                </div>
                <div className='teamMembers_body_top' style={{display: "flex",
          justifyContent: "center"}}>
                {menu == "소속 팀" ? <JoinedTeam/> : null}
                {menu == "지원한 팀" ? <div><AppliedTeamList/></div> : null}
                {menu == "초대장" ? <div><InvitedTeamList/></div> : null}
                </div>
            </div>
        </div>
    );
}

export default UserTeams;