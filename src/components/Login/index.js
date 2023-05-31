import "./style.css";
import { TextField, Button, Alert } from "@mui/material";
import { useState } from "react";
import useInput from "../../hooks/useInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ onClose, onSignupClick }) {
  const navigate = useNavigate();
  const handleSignupClick = () => {
    onClose();
    onSignupClick();
  };

  const [userInfo, setUserInfo] = useInput({
    email: "",
    password: "",
  });
  const [alertMessage, setAlertMessage] = useState("");

  const validateEmail = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (userInfo.email === "") {
      return "";
    } else if (!emailRegex.test(userInfo.email)) {
      return "유효한 이메일 주소를 입력해주세요.";
    }
    return "";
  };

  const validatePassword = () => {
    if (userInfo.password === "") {
      return "";
    } else if (userInfo.password.length < 8) {
      return "비밀번호는 8자리 이상 입력해주세요.";
    }
    return "";
  };

  const onSilentRefresh = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/refresh`, {
        refreshToken: localStorage.getItem("refresh-token"),
      })
      .then((response) => {
        console.log(response.data.refreshToken);
        localStorage.setItem("refresh-token", response.data.refreshToken);
        localStorage.setItem("login-token", response.data.accessToken);
        axios.defaults.headers.common["login-token"] = response.data.accessToken;
        axios.defaults.headers.common["refresh-token"] = response.data.refreshToken;
        setTimeout(onSilentRefresh, 1200000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClick = async (e) => {
    console.log(userInfo);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/member/login`, userInfo);
      if (response.data) {
        console.log(response);
        // accesstoken header에 자동설정 -> post할때 header 구문 추가 안해도됨.
        axios.defaults.headers.common["login-token"] = response.data.data.token.accessToken;
        axios.defaults.headers.common["refresh-token"] = response.data.data.token.refreshToken;
        console.log(axios.defaults.headers.common);
        localStorage.setItem("refresh-token", response.data.data.token.refreshToken);
        localStorage.setItem("login-token", response.data.data.token.accessToken);
        localStorage.setItem("nickname", response.data.data.member.nickname);
        localStorage.setItem("userId", response.data.data.member.id);
        localStorage.setItem("email", response.data.data.member.email);
        setInterval(onSilentRefresh, 1200000); // 20분 후 refreshtoken 갱신
        navigate("/");
      }
    } catch (err) {
      setAlertMessage(err.response.data.message);
    }
  };

  const showAlert = () => {
    if (alertMessage !== "") {
      return <Alert severity="error">{alertMessage}</Alert>;
    } else return;
  };

  return (
    <div className="login-box">
      <h1 className="login-title">로그인</h1>
      <form className="login-form-box">
        <div className="login-text">
          <TextField
            margin="normal"
            label="이메일"
            variant="outlined"
            value={userInfo.email}
            name="email"
            onChange={setUserInfo}
            helperText={validateEmail()}
            error={validateEmail() !== ""}
          />
        </div>
        <div className="login-text">
          <TextField
            margin="normal"
            label="비밀번호"
            type="password"
            variant="outlined"
            value={userInfo.password}
            name="password"
            onChange={setUserInfo}
            helperText={validatePassword()}
            error={validatePassword() !== ""}
          />
        </div>
        <div>{showAlert()}</div>
        <div className="login-button">
          <Button variant="contained" onClick={onClick}>
            로그인
          </Button>
        </div>
        <div className="gosignup-button" onClick={handleSignupClick}>
          <p className="text">계정이 없으신가요?</p>
          <Button>회원가입</Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
