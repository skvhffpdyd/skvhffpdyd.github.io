import {
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

import { useState } from "react";

function Request({ teamId, setShowRequest }) {
  const login_token = localStorage.getItem("login-token");
  const refresh_token = localStorage.getItem("refresh-token");
  const [inputs, setInputs] = useState({
    input_detail: "",
    input_field: 0, //프론트 1 백 2 상관없음 3 선택하는 이렇게 해서 서버에 보냄
  });
  const { input_detail, input_field } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    const nextInputs = {
      //spread 문법. 현재 상태의 내용이 이 자리로 온다.
      ...inputs,
      [name]: value,
    };
    //객체를 새로운 상태로 쓰겠다.
    setInputs(nextInputs);
    console.log(inputs);
  };

  const Putinputs = () => {
    fetch(`${process.env.REACT_APP_API_URL}/user-to-team/${teamId}/add`, {
      method: "POST",
      headers: {
        "refresh-token": refresh_token,
        "login-token": login_token, //헤더로 로그인 토큰 넣어야 삭제됨
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        detail: inputs.input_detail,
        field: inputs.input_field,
        //백프론트 선택이랑 detail은 간단한 설명
      }),
    })
      .then((response) => response.json())
      .then((obj) => {
        setShowRequest(false);
        alert(obj.message);
      });
  };

  return (
    <div className="teamdetail_bottom">
      {login_token != null ? (
        <>
          <summary>팀원 신청 하기</summary>
          <TextField
          sx={{ width: { sm: 550 }, marginBottom: "16px" }}
          id="outlined-textarea"
          label="간단한 자기 어필"
          placeholder="Placeholder"
          multiline
          name="input_detail"
          onChange={onChange}
          />
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={input_field ?? 0} //?? 0 으로 null일때 0 설정 안돌아가지는 않는데 오류가떠서 구글참고해서 고침
            name="input_field"
            onChange={onChange}
            row
          >
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="프론트엔드"
            />
            <FormControlLabel value="2" control={<Radio />} label="백엔드" />
            <FormControlLabel value="3" control={<Radio />} label="상관없음" />
          </RadioGroup>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "16px",
            }}
          >
            <Button variant="contained" onClick={Putinputs}>
              신청 보내기
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
}
export default Request;
