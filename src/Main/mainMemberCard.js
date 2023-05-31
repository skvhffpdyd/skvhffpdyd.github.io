import {useNavigate} from "react-router-dom";
import { useState } from "react";
import {
    Chip,
    IconButton,
  } from "@mui/material";
import "./mainMemberCard.css"
const imglink = "https://firebasestorage.googleapis.com/v0/b/caps-1edf8.appspot.com/o/langIcon%2F";

export const MainMemberCard = (member) => {
    const navigate = useNavigate();
    const [data,setData]=useState(member);
    
    return (
      <div
      className="mainMember-card-wrapper"
      onClick={(e) => {
        navigate(`/profile/${data.member.id}`, {
          state: {
            userId: data.member.id,
          },
        });
      }}>
          <div className="mainMember-card-image">
            <img src={data.member.profileImageUrl} alt={data.member.profileImageUrl} key={data.member.profileImageUrl} />
          </div>
          <hr/>
          <div className="mainMember-card-body">
            <h5 className="mainMember-card-text">{data.member.nickname}</h5>
            <h5 className="mainMember-card-text">{data.member.grade}학년</h5>
          </div>
          <div>
            <h4>잘 다뤄요!</h4>
            {[data.member.memberLang, data.member.memberFramework, data.member.memberDB]
              .flatMap((obj) =>
                Object.entries(obj)
                  .filter(([key, value]) => value === 100)
                  .map(([key, value]) => (
                    <IconButton disabled>
                      <img src={`${imglink}${key}.png?alt=media`} alt="logo" width={20} style={{ marginRight: "5px" }} />
                    </IconButton>
                  ))
              )
              .concat(
                ![data.member.memberLang, data.member.memberFramework, data.member.memberDB].some((obj) =>
                  Object.entries(obj).some(([key, value]) => value === 100)
                ) && <Chip label="미작성" color="secondary" variant="outlined" />
              )}
          </div>                  
      </div>
    );
  };