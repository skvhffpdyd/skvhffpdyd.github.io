import React from "react";
import { useEffect } from "react";

import { useRef } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChatSetting(props) {
  console.log("소켓 갱신?")
  const login_token = localStorage.getItem("login-token");
  const [socketConnected, setSocketConnected] = useState(false);
  const [sendMsg, setSendMsg] = useState(false);
  const [items, setItems] = useState([]);
  const webSocketUrl = process.env.REACT_APP_SOCK_URL;
  let ws = useRef(null);
  useEffect(() => {
      ws.current = new WebSocket(webSocketUrl);
      ws.current.onopen = () => {
        console.log("connected to " + webSocketUrl);
        setSocketConnected(true);
      };
      ws.current.onclose = (error) => {
        console.log("disconnect from " + webSocketUrl);
        console.log(error);
      };
      ws.current.onerror = (error) => {
        console.log("connection error " + webSocketUrl);
        console.log(error);
      };
      ws.current.onmessage = (evt) => {
        const data = JSON.parse(evt.data);
        console.log(data);
        if (data.type == "notificationFromChat") {
          toast.success(data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            onClick: () => {
              window.open(
                `/chat?waitingId=${data.waitingId}&userId=${
                  data.userId
                }&teamLeader=${data.teamLeader}&nickname=${localStorage.getItem(
                  "nickname"
                )}&mode=${data.mode == "team" ? "user" : "team"}`,
                "_blank",
                "width=450,height=650"
              );
            },
          });
        }
        if (data.type == "notification") {
          toast.success(data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            onClick: () => {
              window.location.href = "http://localhost:3000/mypage/team";
            },
          });
        }
        if (data.type == "message") {
          toast.success(data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            onClick: () => {
              window.location.href = "http://localhost:3000/chat";
            },
          });
        }
      };
    
    console.log("currnet", ws.current);
    return () => {
      console.log("clean up");
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    if (socketConnected) {
      ws.current.send("AUTH:" + login_token);
      setSendMsg(true);
    }
  }, [socketConnected]);
  return (
    <>
      <ToastContainer />
    </>
  );
}

export default ChatSetting;
