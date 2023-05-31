import {useNavigate} from "react-router-dom";
import { useState } from "react";
import "./card.css"
import { useRef } from "react";


export const Card = (team) => {
  const navigate = useNavigate();
  const [data,setData]=useState(team);
  //류성현 추가
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
  
  const imglink = "https://firebasestorage.googleapis.com/v0/b/caps-1edf8.appspot.com/o/langIcon%2F";

  const memberCardRef = useRef(null);
  const maxImageCount = 7; // 가져올 이미지 개수 제한

  const getImageElements = () => {
    const imageElements = [];

    // 이미지 요소 가져오기
    const imageArray = [team.team.teamLanguage, team.team.teamFramework, team.team.teamDatabase].flatMap((obj) =>
      Object.entries(obj)
      .filter(([key, value]) => key !== "id" && value >= 25)
        .map(([key, value]) => ({
          key,
          src: `${imglink}${key}.png?alt=media`,
        }))
    );

    // 최대 이미지 개수만큼 이미지 요소 생성
    for (let i = 0; i < Math.min(maxImageCount, imageArray.length); i++) {
      const { key, src } = imageArray[i];
      imageElements.push(<img key={key} src={src} alt="logo" width={30} style={{ marginRight: "5px" }} />);
    }

    // 이미지 개수가 제한을 초과하는 경우 "..." 요소 추가
    if (imageArray.length > maxImageCount) {
      imageElements.push(<span key="ellipsis">...</span>);
    }

    return imageElements;
  };
  return (
    <div className={ team.team.wantTeamMemberCount!==0 ? 'card-wrapper' : 'card-wrapper-closed' } onClick={()   => {
       navigate(`/list/team/${team.team.teamId}`)
    }}> 
                    <div className="card-image">
                      {team.team.imagePaths.length==0 ? <img src={`https://www.hansung.ac.kr/sites/hansung/images/sub/college_pic_4.jpg`} /> : null}
                      {team.team.imagePaths.map(filename => (
                        <img src={`${filename}`} alt={filename} key={filename} style={{ width: "100%", height: "auto" }} />
                      ))}
                    
                    </div>
                    
                    <div className="card-contents">
                      <div className="card-title">
                      <h5>{team.team.title} </h5>
                    </div>
                    <div className="card-body">
                    <span className="card-text">{team.team.teamKeyword == null ? "미확인" :`#${team.team.teamKeyword.category} / ${team.team.teamKeyword.field}`}
                    {team.team.teamKeyword.sub=="none" ? null: ` ${team.team.teamKeyword.sub.toUpperCase()}반`} </span>
                    </div>
                    <div className="card-body">                    
                    <span className="card-text">{`${team.team.wantTeamMemberCount}명 모집 `}</span>
                    <span className="card-time">{time()}</span>
                    
                    </div>                   
                    <div className="member-card-text" ref={memberCardRef}>         
                    {getImageElements()}
                    </div>
                    </div>
                    
    </div>
  );
};