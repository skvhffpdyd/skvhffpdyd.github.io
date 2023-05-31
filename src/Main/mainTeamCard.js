import {useNavigate} from "react-router-dom";
import { useState } from "react";
import "./mainTeamCard.css"

export const MainTeamCard = (team) => {
    const navigate = useNavigate();
    const [data,setData]=useState(team);
    
    const serverTime = new Date(data.team.updateDate);
    // 현재 시간을 가져오기
    const currentTime = new Date();
  
    // 두 시간의 차이를 계산하기
    const timeDiff = currentTime.getTime() - serverTime.getTime();
   
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
   
    //글을 작성한지 얼마나 지났는지 확인하기 위해 사용
    
    const timedata = serverTime.toLocaleDateString();
   
    const time = () => {
      if(minutesDiff<60){//60분이 안지났으면 몇분전 출력
        return `${minutesDiff}분전`
      }
      else {
        if(hoursDiff<24){ //24시간이 안 지났으면 몇시간전 출력
          return `${hoursDiff}시간전`
        }
        else{ //아니면 그냥 작성날짜 출력
          return timedata
        }
      }
    }
    const langArr = Object.keys(team.team.teamLanguage).filter(key => key !== 'id' && team.team.teamLanguage[key] !== 0);
    const frameworkArr = Object.keys(team.team.teamFramework).filter(key => key !== 'id' && team.team.teamFramework[key] !== 0);
    const dbArr = Object.keys(team.team.teamDatabase).filter(key => key !== 'id' && team.team.teamDatabase[key] !== 0);
    
    const combinedArr = langArr.concat(frameworkArr, dbArr);  
    return (
      <div className="mainTeam-card-wrapper" onClick={()   => {
         navigate(`/list/team/${data.team.teamId}`)
      }}> 
          <div className="mainTeam-card-image">
          {team.team.imagePaths.length==0 ? <img src={`https://www.hansung.ac.kr/sites/hansung/images/sub/college_pic_4.jpg`} /> : null}
            {data.team.imagePaths.map(filename => (
              <img src={`${filename}`} alt={filename} key={filename} style={{ width: "100%", height: "auto" }} />
            ))}
          </div>
          <div className="mainTeam-card-body">
            <div className="mainTeam-card-text">{data.team.title}</div> 
            <div id="contest-hline"></div>
            <div className="mainTeam-card-text" style={{textAlign: "right", color: "gray"}}>{time()}</div>
            <div className="mainTeam-card-subbody">
              <div className="mainTeam-card-text">{data.team.teamKeyword == null ? "미확인" :`${data.team.teamKeyword.category} / ${data.team.teamKeyword.field}`}
              {data.team.teamKeyword.sub=="none" ? null: ` ${data.team.teamKeyword.sub.toUpperCase()}반`} </div>
              <div id="contest-vline"></div>
              <div className="mainTeam-card-text">{`${data.team.wantTeamMemberCount}명 모집 `}</div>
            </div>
            <div className="mainTeam_icon_image">
              {combinedArr.map(data => (
                <img src={`https://firebasestorage.googleapis.com/v0/b/caps-1edf8.appspot.com/o/langIcon%2F${data}.png?alt=media`} alt={data} width={25} key={data}/>                    
              ))}
            </div>
          </div>
      </div>
    );
  };