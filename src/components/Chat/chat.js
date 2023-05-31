import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Chat.css";
function Chat() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");
  const waitingId = searchParams.get("waitingId");
  const teamLeader = searchParams.get("teamLeader");
  //const nickname = searchParams.get("nickname");
  const nickname = localStorage.getItem("nickname");
  const mode = searchParams.get("mode");

  window.scrollTo(0, document.body.scrollHeight);

  const [socketConnected, setSocketConnected] = useState(false);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const webSocketUrl = process.env.REACT_APP_SOCK_URL;

  let ws = useRef(null);
  useEffect(() => {
    if (!ws.current) {
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

        if (data.type == "message") {
          setItems((pre) => [...pre, data.message]);
        } else if (data.type == "enter") {
          if (searchParams.get("mode") == "room") {
            setItems([]);
            fetch(
              `${process.env.REACT_APP_API_URL}/chat/team?roomId=${waitingId}`,
              {
                headers: {
                  "refresh-token": refresh_token,
                  "login-token": login_token,
                },
              }
            )
              .then((response) => response.json())
              .then((obj) => {
                console.log("아아", obj.data);
                obj.data.map((data) => {
                  if (data.mode == "chat") {
                    if (data.from == localStorage.getItem("userId")) {
                      setItems((pre) => [...pre, "m: " + data.msg]);
                    } else {
                      setItems((pre) => [...pre, "a: " + data.msg]);
                    }
                  }
                  if (data.mode == "noti") {
                    setItems((pre) => [...pre, data.msg]);
                  }
                });
              });
          } else {
            fetch(`${process.env.REACT_APP_API_URL}/chat?roomId=${waitingId}`, {
              headers: {
                "refresh-token": refresh_token,
                "login-token": login_token,
              },
            })
              .then((response) => response.json())
              .then((obj) => {
                setItems([...obj.data, data.message]);
              });
          }
        }
      };
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    if (socketConnected) {
      ws.current.send(`enterRoom:${waitingId}##${login_token}##${nickname}`);
    }
  }, [socketConnected]);
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (message != "") handleSendMessage(message);
      setMessage("");
    }
  };
  useEffect(() => {
    const chatBody = document.querySelector(".chat-body");
    chatBody.scrollTop = chatBody.scrollHeight;
    console.log("items", items);
  }, [items]);
  const refresh_token = localStorage.getItem("refresh-token");
  const login_token = localStorage.getItem("login-token");
  const handleSendMessage = (message) => {
    if (message != "") {
      if (mode == "team") {
        ws.current.send(
          `ROOM:${waitingId}##${userId}##${message}##${nickname}##${mode}`
        );
      }
      if (mode == "user") {
        ws.current.send(
          `ROOM:${waitingId}##${teamLeader}##${message}##${nickname}##${mode}`
        );
      }
      if (mode == "room") {
        ws.current.send(`TEAM:${waitingId}##${message}##${nickname}##${mode}`);
      }
      setItems([...items, "m: " + nickname + " " + message]);
      setMessage("");
    }
  };
  function makeLink(str) {
    // 정규표현식을 이용해 문자열에서 URL 패턴을 찾아내고 링크로 변환
    const regex = /(https?:\/\/[^\s]+)/g;
    return str.replace(
      regex,
      (match) => `<a href="${match}" target="_blank">${match}</a>`
    );
  }
  function isUrl(str) {
    const pattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/i;
    return pattern.test(str);
  }

  const handleBeforeUnload = (e) => {
    e.preventDefault();
    ws.current.send(`exitRoom:${waitingId}##${login_token}##${nickname}`);
    if (ws.current) {
      ws.current.close();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        <div className="chat-header">Open Chat</div>
        <div className="chat-body">
          {items.map((message, index) => {
            return (
              <div
                key={index}
                className={`chat-message ${
                  message.substring(0, 2) == "m:"
                    ? "chat-message-mine"
                    : message.substring(0, 2) == "n:"
                    ? "chat-message-server"
                    : ""
                }`}
              >
                {message.substring(0, 2) == "m:" ? (
                  <div>{nickname}</div>
                ) : message.substring(0, 2) == "a:" ? (
                  <div>{message.split(" ")[1]}</div>
                ) : (
                  ""
                )}
                <div
                  className={`chat-message-content ${
                    message.substring(0, 2) == "m:"
                      ? "chat-message-content-mine"
                      : message.substring(0, 2) == "n:"
                      ? "chat-message-content-server"
                      : ""
                  }`}
                >
                  {isUrl(message.split(" ").slice(2).join(" ")) == false ? (
                    message.split(" ").slice(2).join(" ")
                  ) : (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: makeLink(message.split(" ")[2]),
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            className="
            chat-input"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="chat-button"
            onClick={() => handleSendMessage(message)}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
