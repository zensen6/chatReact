import React, { useState, useEffect } from 'react';
import './Message.css';

const ChatRoom = ({roomId})=>{

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
      const newSocket = new WebSocket("ws://localhost:8080/ws/chat");
      setSocket(newSocket);

      newSocket.onopen = () => {
          console.log('open server!')
          enterRoom(newSocket);
      };

      newSocket.onclose = () => {
          console.log('disconnect');
      };

      newSocket.onerror = (error) => {
          console.log('WebSocket Error: ' + error);
      };

      newSocket.onmessage = (e) => {
          console.log(e.data);
          setMessages(prevMessages => [...prevMessages, e.data]);
      };

      return () => {
          newSocket.close();
      };
  }, []);

  const enterRoom = (socket) => {
      const enterMsg = {
          type: "ENTER",
          roomId: roomId,
          sender: "chee",
          msg: ""
      };
      socket.send(JSON.stringify(enterMsg));
  };

  const sendMessage = () => {
      const talkMsg = {
          type: "TALK",
          roomId: roomId,
          sender: "chee",
          msg: message
      };
      socket.send(JSON.stringify(talkMsg));
      setMessage('');
  };

  const quitRoom = () => {
      const quitMsg = {
          type: "QUIT",
          roomId: roomId,
          sender: "chee",
          msg: ""
      };
      socket.send(JSON.stringify(quitMsg));
      socket.close();
      window.location.href = "/";
  };

  const handleChange = (e) => {
      setMessage(e.target.value);
  };

    return (
      <div>
        <div>
            <h1>Chat Room: {roomId}</h1>
            {/* 채팅방에 대한 내용을 여기에 추가하세요 */}
        </div>

        <input
          type="text"
          placeholder="보낼 메세지를 입력하세요."
          value={message}
          onChange={handleChange}
        />
        <button type="button" onClick={sendMessage}>전송</button>
        <button type="button" onClick={quitRoom}>방 나가기</button>
        <div>
        <span>메세지</span>
        <div className="msgArea">
            {messages.map((msg, index) => (
                <div className="Message" key={index}>{msg}</div>
            ))}
        </div>
        </div>
      </div>
    );

}

export default ChatRoom;