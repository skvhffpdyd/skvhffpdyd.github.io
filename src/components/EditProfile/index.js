import {
  TextField,
  Button,
  Select,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  Alert,
  FormHelperText,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import useInput from "../../hooks/useInput";
import Languages from "../TechniqueStack/language";
import Framework from "../TechniqueStack/framework";
import Database from "../TechniqueStack/database";
import axios from "axios";
import { useMediaQuery } from "@mui/material";

function EditProfile({ fetchData, payload }) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)"); // 모바일 디스플레이 크기에 맞게 변경

  const [memberData, setMemberData] = useState(payload.data.member);
  const [inputs, setInputs] = useInput({
    solvedNickname: memberData.solvedNickname === "!!No User!!" ? "" : memberData.solvedNickname || "",
    nickname: memberData.nickname || "",
    email: memberData.email || "",
    grade: memberData.grade || "",
    github: memberData.github || "",
  });
  const [memberKeywords, setMemberKeywords] = useState([]);
  const [category, setCategory] = useState(memberData.memberKeywords.map((keyword) => keyword.category));
  const [field, setField] = useState(() => {
    const nonProjectCategoryKeyword = memberData.memberKeywords.find(
      (keyword) => keyword.category !== "과목 팀프로젝트"
    );

    return nonProjectCategoryKeyword ? nonProjectCategoryKeyword.field : "";
  });
  const [fieldToggle, setFieldToggle] = useState(false); // 추가
  const [subject, setSubject] = useState(
    memberData.memberKeywords
      .filter((keyword) => keyword.category === "과목 팀프로젝트")
      .map((keyword) => keyword.field)
      .join()
  );
  const [sub, setSub] = useState(
    memberData.memberKeywords
      .filter((keyword) => keyword.category === "과목 팀프로젝트")
      .map((keyword) => keyword.sub)
      .join()
  );
  const [subjectToggle, setSubjectToggle] = useState(false);
  const [showImg, setShowImg] = useState(memberData.profileImageUrl);
  const [imgFile, setImgFile] = useState(null);
  const imgRef = useRef();
  const [alertNum, setAlertNum] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertMessage2, setAlertMessage2] = useState("");
  const [memberLang, setMemberLang] = useState({
    c: memberData.memberLang.c,
    cpp: memberData.memberLang.cpp,
    cs: memberData.memberLang.cs,
    java: memberData.memberLang.java,
    javascript: memberData.memberLang.javascript,
    sql_Lang: memberData.memberLang.sql_Lang,
    swift: memberData.memberLang.swift,
    kotlin: memberData.memberLang.kotlin,
    typescript: memberData.memberLang.typescript,
    python: memberData.memberLang.python,
    html: memberData.memberLang.html,
    r: memberData.memberLang.r,
  });

  const [selectedLanguages, setSelectedLanguages] = useState({
    c: false,
    cpp: false,
    cs: false,
    java: false,
    javascript: false,
    sql_Lang: false,
    swift: false,
    kotlin: false,
    typescript: false,
    python: false,
    html: false,
    r: false,
  });

  useEffect(() => {
    const updatedSelectedLanguages = {};
    Object.keys(memberData.memberLang).forEach((language) => {
      updatedSelectedLanguages[language] = memberData.memberLang[language] > 0;
    });
    setSelectedLanguages(updatedSelectedLanguages);
  }, [memberData.memberLang]);

  const handleLanguageValueChange = (newLanguageValues) => {
    setMemberLang(newLanguageValues);
  };

  const [memberFramework, setMemberFramework] = useState({
    react: memberData.memberFramework.react,
    android: memberData.memberFramework.android,
    node: memberData.memberFramework.node,
    xcode: memberData.memberFramework.xcode,
    spring: memberData.memberFramework.spring,
    unity: memberData.memberFramework.unity,
    unreal: memberData.memberFramework.unreal,
    tdmax: memberData.memberFramework.tdmax,
  });

  const [selectedFrameworks, setSelectedFrameworks] = useState({
    react: false,
    android: false,
    node: false,
    xcode: false,
    spring: false,
    unity: false,
    unreal: false,
    tdmax: false,
  });

  useEffect(() => {
    const updatedSelectedFramework = {};
    Object.keys(memberData.memberFramework).forEach((framework) => {
      updatedSelectedFramework[framework] = memberData.memberFramework[framework] > 0;
    });
    setSelectedFrameworks(updatedSelectedFramework);
  }, [memberData.memberFramework]);

  const handleFrameworkValueChange = (frameworkValues) => {
    setMemberFramework(frameworkValues);
  };

  const [memberDB, setMemberDB] = useState({
    mysqlL: memberData.memberDB.mysqlL,
    mariadbL: memberData.memberDB.mariadbL,
    mongodbL: memberData.memberDB.mongodbL,
    schemaL: memberData.memberDB.schemaL,
  });

  const [selectedDatabases, setSelectedDatabases] = useState({
    mysqlL: false, //mysql
    mariadbL: false,
    mongodbL: false,
    schemaL: false,
  });

  useEffect(() => {
    const updatedSelectedDB = {};
    Object.keys(memberData.memberDB).forEach((DB) => {
      updatedSelectedDB[DB] = memberData.memberDB[DB] > 0;
    });
    setSelectedDatabases(updatedSelectedDB);
  }, [memberData.memberDB]);

  const handleDatabaseValueChange = (databaseValues) => {
    setMemberDB(databaseValues);
  };

  const onChange3 = (e) => {
    const { value } = e.target;
    const newCategory = category.includes(value) ? category.filter((v) => v !== value) : [...category, value];
    setCategory(newCategory);
    if (value === "과목 팀프로젝트") {
      setSubjectToggle((e) => !e);
    } else {
      setFieldToggle(
        newCategory.includes("캡스톤 디자인") ||
          newCategory.includes("공모전 및 대회") ||
          newCategory.includes("개인 팀프로젝트")
      );
    }
  };

  const onChange2 = (e) => {
    const formData = new FormData();
    const getAllFormData = {
      ...inputs,
      memberKeywords,
      memberLang,
      memberFramework,
      memberDB,
    };
    console.log(getAllFormData);
    formData.append("metadata", JSON.stringify(getAllFormData));
    formData.append("file", imgFile);
    // 닉네임 새로 localStorage에 등록
    localStorage.setItem("nickname", inputs.nickname);
    //데이터 보내기
    axios
      .post(`${process.env.REACT_APP_API_URL}/member/userForm/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data) {
          alert("등록 완료");
          fetchData();
          navigate(`/mypage/profile/${localStorage.getItem("email")}`);
        }
      })
      .catch((err) => {
        console.log(err.response);
        alert("등록 실패");
      });
    /* key 확인하기 */
    for (let key of formData.keys()) {
      console.log(key);
    }

    /* value 확인하기 */
    for (let value of formData.values()) {
      console.log(value);
    }
  };

  const handleImageUrlChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0]; //선택된 파일 가져오기
    setImgFile(file);
    //이미지 사이즈 제한
    if (file.size > 10 * 1024 * 1024) {
      alert("이미지 사이즈는 10MB 이내로 가능합니다.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setShowImg(reader.result);
    };
  };

  useEffect(() => {
    const newPurpose = category.map((data) => {
      if (data === "과목 팀프로젝트") {
        return { category: data, field: subject, sub: sub };
      } else {
        return { category: data, field: field };
      }
    });
    setMemberKeywords(newPurpose);
  }, [category, subject, sub, field]);

  useEffect(() => {
    const hasSubjectTeamProject = memberData.memberKeywords.some((keyword) => keyword.category === "과목 팀프로젝트");
    if (hasSubjectTeamProject) {
      setSubjectToggle((e) => !e);
    }
    const hasOtherKeywords = memberData.memberKeywords.some((keyword) =>
      ["캡스톤 디자인", "개인 팀프로젝트", "공모전 및 대회"].includes(keyword.category)
    );
    if (hasOtherKeywords) {
      setFieldToggle((e) => !e);
    }
  }, [memberData.memberKeywords]);

  const validateGitHubLink = () => {
    const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+$/;
    if (inputs.github === "") {
      return "";
    } else if (!githubRegex.test(inputs.github)) {
      return "유효한 GitHub 프로필 링크를 입력해주세요.";
    }
    return "";
  };

  const checkOverlap = (value) => {
    //e.preventDefault();
    if (value === "nickname") {
      axios.get(`${process.env.REACT_APP_API_URL}/member/check_nickname/${inputs.nickname}/exists`).then((response) => {
        console.log(response.data);
        if (response.data === true) {
          setAlertNum(2);
        } else {
          setAlertNum(1);
        }
      });
    }
  };

  useEffect(() => {
    switch (alertNum) {
      case 1:
        setAlertMessage("사용 가능한 닉네임입니다.");
        break;
      case 2:
        setAlertMessage("이미 존재하는 닉네임입니다. 다른 닉네임을 입력해주세요.");
        break;
      case 5:
        setAlertMessage("");
        break;
    }
  }, [alertNum, alertMessage]);

  const showAlert = () => {
    if (alertNum === 2 && alertNum !== 0) {
      return <Alert severity="error">{alertMessage}</Alert>;
    } else if (alertNum === 1) {
      return <Alert severity="success">{alertMessage}</Alert>;
    } else return;
  };

  const checkKeywordEmpty = () => {
    if (memberKeywords.length === 0) {
      return "하나 이상의 팀 키워드를 등록해주세요";
    } else {
      return "";
    }
  };

  const checkFieldEmpty = () => {
    if (field === "") {
      return "개발 포지션을 골라주세요";
    } else {
      return "";
    }
  };

  const checkSubjectEmpty = () => {
    if (subject === "") {
      return "과목 이름을 입력해주세요";
    } else {
      return "";
    }
  };

  const checkSubEmpty = () => {
    if (sub === "") {
      return "분반을 입력해주세요";
    } else {
      return "";
    }
  };

  return (
    <div className="profile-edit-box">
      <form>
        <div className="inline-box">
          <div className="left-box">
            <div className="nickname-box">
              <div>
                <InputLabel shrink>닉네임</InputLabel>
                <TextField
                  fullWidth={isMobile}
                  size="small"
                  sx={{ marginBottom: "10px" }}
                  placeholder="닉네임을 입력해주세요"
                  name="nickname"
                  value={inputs.nickname}
                  onChange={setInputs}
                />
                <Button
                  onClick={(e) => {
                    checkOverlap("nickname");
                  }}
                  fullWidth={isMobile}
                >
                  중복확인
                </Button>
              </div>
              <div>{showAlert()}</div>
              <InputLabel shrink>백준 닉네임</InputLabel>
              <TextField
                fullWidth={isMobile}
                size="small"
                sx={{ marginBottom: "10px" }}
                placeholder="닉네임을 입력해주세요"
                name="solvedNickname"
                value={inputs.solvedNickname}
                onChange={setInputs}
              />
            </div>
            <div className="email-box">
              <InputLabel shrink>이메일</InputLabel>
              <TextField
                fullWidth={isMobile}
                size="small"
                sx={{ marginBottom: "10px" }}
                placeholder="이메일을 입력해주세요"
                name="email"
                value={inputs.email}
                onChange={setInputs}
                disabled
              />
            </div>
            <div className="grade-box">
              <InputLabel shrink>학년</InputLabel>
              <FormControl size="small" sx={{ marginBottom: "10px" }}>
                <Select
                  sx={{
                    width: "100px",
                  }}
                  name="grade"
                  value={inputs.grade || ""}
                  onChange={setInputs}
                >
                  <MenuItem value={1}>1학년</MenuItem>
                  <MenuItem value={2}>2학년</MenuItem>
                  <MenuItem value={3}>3학년</MenuItem>
                  <MenuItem value={4}>4학년</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="githublink-box">
              <InputLabel shrink>깃허브 링크</InputLabel>
              <TextField
                fullWidth={isMobile}
                size="small"
                sx={{ marginBottom: "10px" }}
                placeholder="깃허브 링크를 입력해주세요"
                name="github"
                value={inputs.github}
                onChange={setInputs}
                helperText={validateGitHubLink()}
                error={validateGitHubLink() !== ""}
              />
            </div>
          </div>
          <div className="profile-edit-img-box">
            <div>
              <label htmlFor="chooseFile" className="image-button-label">
                <img src={showImg} alt="" className="profile-img"></img>
                <div className="overlay">프로필 이미지 변경</div>
              </label>
            </div>
            <input
              id="chooseFile"
              className="image-button"
              type="file"
              accept="image/*"
              onChange={handleImageUrlChange}
              ref={imgRef}
            />
          </div>
        </div>
        <div className="keyword-box">
          <div className="button-box">
            <InputLabel shrink sx={{ textAlign: "left" }}>
              원하는 팀 키워드를 골라주세요
            </InputLabel>
            <TextField
              fullWidth
              size="small"
              value={category.map((data) => data)}
              error={checkKeywordEmpty() !== ""}
              helperText={checkKeywordEmpty()}
            />
            <Button
              className={category.includes("캡스톤 디자인") ? "selected" : ""}
              variant="outlined"
              sx={{ margin: "10px" }}
              value="캡스톤 디자인"
              onClick={onChange3}
            >
              캡스톤 디자인
            </Button>
            <Button
              className={category.includes("과목 팀프로젝트") ? "selected" : ""}
              variant="outlined"
              sx={{ margin: "10px" }}
              value="과목 팀프로젝트"
              onClick={onChange3}
            >
              과목 팀프로젝트
            </Button>
            <Button
              className={category.includes("공모전 및 대회") ? "selected" : ""}
              variant="outlined"
              sx={{ margin: "10px" }}
              value="공모전 및 대회"
              onClick={onChange3}
            >
              공모전 및 대회
            </Button>
            <Button
              className={category.includes("개인 팀프로젝트") ? "selected" : ""}
              variant="outlined"
              sx={{ margin: "10px" }}
              value="개인 팀프로젝트"
              onClick={onChange3}
            >
              개인 팀프로젝트
            </Button>
          </div>
        </div>
        {fieldToggle && (
          <div className="field-toggle-box">
            <InputLabel shrink>개발 포지션을 골라주세요</InputLabel>
            <FormControl size="small" error={checkFieldEmpty() !== ""}>
              <Select
                sx={{ width: "200px" }}
                name="field"
                value={field}
                onChange={(e) => {
                  setField(e.target.value);
                  console.log(e.target.value);
                }}
              >
                <MenuItem value={"프론트엔드"}>프론트엔드</MenuItem>
                <MenuItem value={"백엔드"}>백엔드</MenuItem>
                <MenuItem value={"상관없음"}>상관없음</MenuItem>
              </Select>
              <FormHelperText>{checkFieldEmpty()}</FormHelperText>
            </FormControl>
          </div>
        )}
        {subjectToggle && (
          <div className="subject-toggle-box">
            <InputLabel shrink>과목 (수업계획서에 등록된 정확한 과목명을 입력해주세요)</InputLabel>
            <TextField
              size="small"
              placeholder="과목을 입력해주세요"
              sx={{ marginBottom: "10px" }}
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              helperText={checkSubjectEmpty()}
              error={checkSubjectEmpty() !== ""}
            />
            <InputLabel shrink>분반 (수업계획서에 등록된 정확한 분반을 입력해주세요)</InputLabel>
            <TextField
              size="small"
              placeholder="분반을 입력해주세요"
              sx={{ marginBottom: "10px" }}
              value={sub}
              onChange={(e) => {
                setSub(e.target.value);
              }}
              helperText={checkSubEmpty()}
              error={checkSubEmpty() !== ""}
            />
          </div>
        )}
        <div className="team-lang-box-inedit" style={{ justifyContent: "center", marginTop: "20px" }}>
          <div className="lang-select-box" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h3>LANGUAGE</h3>
            <Languages
              languageValues={memberLang}
              onLanguageValueChange={handleLanguageValueChange}
              selectedLanguages={selectedLanguages}
              setSelectedLanguages={setSelectedLanguages}
            />
          </div>
          <div
            className="framework-select-box"
            sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "30px" }}
          >
            <h3>FRAMEWORK & PLATFORM</h3>
            <Framework
              frameworkValues={memberFramework}
              onFrameworkValueChange={handleFrameworkValueChange}
              selectedFrameworks={selectedFrameworks}
              setSelectedFrameworks={setSelectedFrameworks}
            />
          </div>
          <div
            className="database-select-box"
            sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "30px" }}
          >
            <h3>DATABASE</h3>
            <Database
              databaseValues={memberDB}
              onDatabaseValueChange={handleDatabaseValueChange}
              selectedDatabases={selectedDatabases}
              setSelectedDatabases={setSelectedDatabases}
            />
          </div>
        </div>
        <Button
          sx={{ marginTop: "20px" }}
          variant="outlined"
          onClick={onChange2}
          disabled={
            (fieldToggle && checkFieldEmpty() !== "") ||
            (subjectToggle && checkSubEmpty() !== "") ||
            (subjectToggle && checkSubjectEmpty() !== "") ||
            checkKeywordEmpty() !== ""
          }
        >
          등록
        </Button>
      </form>
    </div>
  );
}

export default EditProfile;
