import "./style.css";
import React, { useEffect ,useState, useRef } from 'react';
import {useNavigate} from "react-router-dom";
import { TextField, Button, Box, Select, MenuItem  } from "@mui/material";
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr'
import MyDropzone from "../Dropzone/dropzone";
import axios from 'axios';
import Languages from "../TechniqueStack/language";
import Framework from "../TechniqueStack/framework";
import Database from "../TechniqueStack/database";
import { Autocomplete } from "@mui/material";

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function TeamBuilding() {
    //로그인 토큰 저장
    const refresh_token = localStorage.getItem("refresh-token");
    const login_token = localStorage.getItem("login-token");
    //유저가 글쓰는 날짜 시간 저장 
    const today = new Date();
    
    const navigate = useNavigate();
    const [keywords, setKeywords] = useState([]);      
    useEffect(()=>{
        const nextInputs = {
            ...inputs,
            teamKeywords: keywords.length === 0 ? [] : keywords.map((data) => ({"value" : data}))
        };   
        setInputs(nextInputs);           
    },[keywords])

    const [inputs, setInputs] = useState({
        //프로젝트 제목, 목적 데이터 관리
        teamName:"",
        title: "",
        category : "",
        field: "",
        sub: "none",
        teamURL:"",
        wantTeamMemberCount: 0,       
        createDate: today,
    });

    const check = () => {
        if(inputs.teamName==="" || inputs.title==="" || inputs.category==="" || inputs.field==="" || inputs.wantTeamMemberCount==0){
            return "false";
        }
        else 
            return "";
    }

    useEffect(()=>{        
        setInputs({...inputs, sub:"none"});           
        console.log(inputs);
    },[inputs.category])
    
    const {wantTeamMemberCount, teamName,title,category,field,sub ,teamURL,createDate, updateDate} = inputs;	//비구조화 할당
    const onChange = (e) => {
        const {name, value} = e.target;
        const nextInputs = {
            //spread 문법. 현재 상태의 내용이 이 자리로 온다. 
            ...inputs,
            [name] : value,
        };
        //객체를 새로운 상태로 쓰겠다. 
        setInputs(nextInputs);
        console.log(inputs);
    };
      

    const PostRequest = (e) => {
        e.preventDefault();
    }
    const testSubmitHandler=async (e) => {
        
        const test = new FormData();
        const newinputs= {
          ...inputs,
          teamLanguage,
          teamFramework,
          teamDatabase,
          teamKeyword : {
            category : category,
            field: field,            
            sub: sub,
          }
        }

        test.append("team", JSON.stringify(newinputs));
        
        uploadedFiles.forEach((image) => {
           test.append("images", image);
        });       
        
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/teams/new`, test, {
            headers: {
              "Content-Type": "multipart/form-data",
              'refresh-token': refresh_token,
                'login-token': login_token
            },
          });
          console.log(newinputs);
          console.log(response.data);
          alert(response.data.message);
          navigate(`/list/team?page=1`)
        } catch (error) {
          console.error(error);
        }
      };
   
      const editorRef = useRef();

      const DetailOnChange = () => {
        const data = editorRef.current.getInstance().getHTML();       
        const nextInputs = {
            ...inputs,
            detail : data
        };   
        setInputs(nextInputs);   
      };

    const [uploadedFiles, setUploadedFiles] = useState([]);

    const [teamLanguage, setTeamLanguage] = useState({
        c: 0, cpp: 0, cs: 0, java:0, javascript:0, sql_Lang:0, swift:0,
        kotlin:0, typescript:0, python:0, html:0, r:0,
      });

    const handleTeamLanguageChange = (teamLanguage) => {
        setTeamLanguage(teamLanguage);       
    };
    const [selectedLanguages, setSelectedLanguages] = useState({
        c: false,
        cpp: false,
        cs: false,
        java:false,
        javascript:false,
        sql_Lang:false,
        swift:false,
        kotlin:false,
        typescript:false,
        python:false,
        html:false,
        r:false
    });

    const [teamFramework, setTeamFramework] = useState({
        react: 0, android: 0, node: 0, xcode:0,
        spring:0, unity:0, unreal:0, tdmax: 0,    
      });

    const handleTeamFrameworkValueChange = (teamFramework) => {
        setTeamFramework(teamFramework);       
    };
   
    const [selectedFrameworks, setSelectedFrameworks] = useState({
        react: false,
        android: false,
        node: false,
        xcode:false,
        spring:false,
        unity:false,
        unreal:false,
        tdmax: false,        
    });

    const [teamDatabase, setTeamDatabase] = useState({
        mysqlL: 0, mariadbL: 0, mongodbL: 0, schemaL:0,   
      });

    const handleTeamDatabaseChange = (teamDatabase) => {
        setTeamDatabase(teamDatabase);       
    };

    const [selectedDatabases, setSelectedDatabases] = useState({
        mysqlL: false, //mysql
        mariadbL: false,
        mongodbL: false,
        schemaL:false,     
    });

    const onChangeAuto = (e,value) => {
        const nextInputs = {
          //spread 문법. 현재 상태의 내용이 이 자리로 온다.
          ...inputs,
          field: value,
        };
        //객체를 새로운 상태로 쓰겠다.
        setInputs(nextInputs);
        console.log(inputs);
    };
    const subjectList = ["웹프레임워크1","네트워크프로그래밍","안드로이드프로그래밍","고급모바일프로그래밍"]
    return (
        <div className="teambuildingform">
            <div className="team_form">            
            <h1>새 팀 등록</h1>         
            
            <form onSubmit={PostRequest}>
                <div className="team_label">
                <h3>1. 프로젝트 기본 정보를 입력해주세요.</h3>
                </div>
                <div className="team_row">
                <div className="team_item">
                    <label>
                        <h3>팀 이름</h3>
                    </label>
                    <TextField                            
                    required
                    label="팀 이름을 입력해주세요"
                    value={teamName}                    
                    name="teamName"
                    variant="outlined"
                    onChange={onChange}
                    style={{ width: '90%' }}
                    />   
                </div>
                <div className="team_item">
                    <label>
                        <h3>팀 빌딩 목적</h3>
                    </label>                    
                    <Select style={{ width: '90%' }} name="category" value={category} label="모집 인원 수" onChange={onChange}>
                        <MenuItem value={"개인 팀프로젝트"}>개인 팀프로젝트</MenuItem>
                        <MenuItem value={"공모전 및 대회"}>공모전 및 대회</MenuItem>
                        <MenuItem value={"캡스톤 디자인"}>캡스톤 디자인</MenuItem>
                        <MenuItem value={"과목 팀프로젝트"}>과목 팀프로젝트</MenuItem>
                    </Select> 
                </div>

                
                {category === "과목 팀프로젝트" ? (
                    <>
                    <div className="team_item" > 
                        <label>
                            <h3>과목</h3>
                        </label>
                        <Autocomplete
                            style={{ width: '90%' }}
                            disablePortal
                            id="combo-box-demo"
                            options={subjectList}
                            sx={{ width: 300 }}
                            onChange={onChangeAuto}
                            name="field"
                            renderInput={(params) => <TextField {...params} label="과목" />}
                        />
                    </div>
                    <div className="team_item">
                        <h3>분반</h3>
                        <Select style={{ width: '90%' }} name="sub" value={sub} label="분반 선택" onChange={onChange}>
                            <MenuItem value={"A"}>A</MenuItem>
                            <MenuItem value={"B"}>B</MenuItem>
                            <MenuItem value={"C"}>C</MenuItem>
                            <MenuItem value={"D"}>D</MenuItem>   
                            <MenuItem value={"E"}>E</MenuItem>
                            <MenuItem value={"7"}>7</MenuItem>      
                            <MenuItem value={"8"}>8</MenuItem>    
                            <MenuItem value={"N"}>N</MenuItem>   
                            <MenuItem value={"O"}>O</MenuItem>   
                        </Select>
                    </div>                
                </>
                ) : (
                    <div className="team_item">
                    <h3>역할 선택</h3>
                    <Select style={{ width: '90%' }} name="field" value={field} label="역할 선택" onChange={onChange}>
                        <MenuItem value={"프론트엔드"}>프론트엔드</MenuItem>
                        <MenuItem value={"백엔드"}>백엔드</MenuItem>
                        <MenuItem value={"상관없음"}>상관없음</MenuItem> 
                    </Select>
                    </div>
                )}                
               
                <div className="team_item">
                    <h3>모집 인원</h3>
                    <Select
                        style={{ width: '90%' }}
                        name="wantTeamMemberCount"
                        value={wantTeamMemberCount}
                        label="모집 인원 수"
                        onChange={onChange}
                        >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                    </Select> 
                </div>
                <div className="team-url">
                <h3>팀 주소</h3>
                
                <TextField                            
                    required
                    label="팀원과 프로젝트를 진행할 공간의 url을 입력해주세요"
                    value={teamURL}                    
                    name="teamURL"
                    variant="outlined"
                    onChange={onChange}
                    style={{width : '95%',marginTop:'10px'}}
                    />   
                    </div>
                </div>
                <div className="team_label">
                <h3>요구 사항</h3>
                </div>
                <div className="team-lang-box" style={{  justifyContent: 'center' }}>                       
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h3>LANGUAGE</h3>    
                        <Languages languageValues={teamLanguage}  onLanguageValueChange={handleTeamLanguageChange}  selectedLanguages={selectedLanguages} setSelectedLanguages= {setSelectedLanguages}/>                     
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h3>FRAMEWORK & PLATFORM</h3>    
                        <Framework frameworkValues={teamFramework}  onFrameworkValueChange={handleTeamFrameworkValueChange} selectedFrameworks={selectedFrameworks} setSelectedFrameworks={setSelectedFrameworks}/>                    
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h3>DATABASE</h3>    
                        <Database databaseValues={teamDatabase} onDatabaseValueChange={handleTeamDatabaseChange} selectedDatabases={selectedDatabases} setSelectedDatabases={setSelectedDatabases}/>         
                    </Box>
                </div> 
                <div className="team_label">
                <h3>2. 프로젝트에 대해 소개 시켜주세요.</h3>
                </div>
                <h3>제목</h3>
                <div className="team_editor">
                    <TextField                            
                       required 
                        label="글 제목을 입력해주세요"
                        value={title}                    
                        name="title"
                        variant="outlined"
                        onChange={onChange}
                        style={{ width: '100%' }}
                    />
                </div>
                <div className="team_editor">
                    <ToastEditor                    
                        previewStyle="vertical"
                        hideModeSwitch={true}
                        language="ko-KR"
                        initialEditType="wysiwyg"     
                        ref={editorRef}
                        onChange={DetailOnChange}                       
                    />   
                </div>
                <div className="team_editor">
                    <MyDropzone uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles}/>
                </div>
                
                <div className="team_button" style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={() => {
                    navigate('/list/team');
                }}>취소</Button>
                <Button variant="contained" 
                disabled={check()!== ""}
                onClick={() => {
                    //valuetest();
                    testSubmitHandler();                    
                }}>등록하기</Button>
                </div>
            </form>
            </div>
        </div>              
    );
}


export default TeamBuilding;