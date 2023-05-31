import { useRef, useEffect } from "react";
import { Avatar } from "@mui/material";
import "./style.css";
import { useNavigate } from "react-router-dom";

const imglink = "https://firebasestorage.googleapis.com/v0/b/caps-1edf8.appspot.com/o/langIcon%2F";

function MemberCard({ payload, fetchData }) {
  const navigate = useNavigate();
  const memberData = payload;

  const checkGrade = (grade) => {
    if (grade !== 0) {
      return <h4 className="member-card-title">한성대학교 {grade}학년</h4>;
    } else {
      return <h4 className="member-card-title">한성대학교</h4>;
    }
  };

  const memberCardRef = useRef(null);
  const maxImageCount = 8; // 가져올 이미지 개수 제한

  const getImageElements = () => {
    const imageElements = [];

    // 이미지 요소 가져오기
    const imageArray = [memberData.memberLang, memberData.memberFramework, memberData.memberDB].flatMap((obj) =>
      Object.entries(obj)
        .filter(([key, value]) => value === 100)
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
    <div
      className="member-card-wrapper"
      onClick={(e) => {
        navigate(`/profile/${memberData.id}`, {
          state: {
            userId: memberData.id,
          },
        });
      }}
    >
      <div className="card-top-box">
        <div className="top-left-box">
          <Avatar alt="Remy Sharp" src={memberData.profileImageUrl} sx={{ width: 150, height: 150 }} />
        </div>
        <div className="top-right-box">
          <h2 className="member-card-title">{memberData.nickname}</h2>
          {checkGrade(memberData.grade)}
        </div>
      </div>
      <hr></hr>
      <div className="card-bottom-box">
        <div className="member-card-text">
          {memberData.memberKeywords.map(
            (keyword) =>
              `#${keyword.category}/${
                keyword.field === "1"
                  ? "프론트엔드"
                  : keyword.field === "2"
                  ? "백엔드"
                  : keyword.field === "3"
                  ? "상관없음"
                  : keyword.field
              } `
          )}
        </div>
      </div>
      <div className="card-bottom-box">
        <div className="member-card-text" ref={memberCardRef}>
          {/* {[memberData.memberLang, memberData.memberFramework, memberData.memberDB].flatMap((obj) =>
            Object.entries(obj)
              .filter(([key, value]) => value == 100)
              .map(([key, value]) => (
                // `#${key
                //   .toUpperCase()
                //   .replace("MYSQLL", "MYSQL")
                //   .replace("MARIADBL", "MARIA DB")
                //   .replace("MONGODBL", "MONGO DB")
                //   .replace("SCHEMAL", "SCHEMA")
                //   .replace("TDMAX", "3DMAX")
                //   .replace("CS", "C#")
                //   .replace("CPP", "C++")} `
                <img key={key} src={`${imglink}${key}.png?alt=media`} alt="logo" width={30} style={{ marginRight: "5px" }}   />
              ))
          )} */}
          {getImageElements()}
        </div>
      </div>
    </div>
  );
}

export default MemberCard;
