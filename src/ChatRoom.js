import React, { useState, useEffect } from 'react';
import "./Message.css";


const ChatRoom = ({ roomId, instructorId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  //const url = "43.200.254.172:8080";
   const url = "localhost:8080";  
 
  useEffect(() => {
    const newSocket = new WebSocket(`ws://${url}/ws/chat`, sessionStorage.getItem('token'));

    newSocket.onopen = () => {
      console.log('WebSocket connection established.');
      setIsConnected(true);
      enterRoom(newSocket);
    };

    newSocket.onclose = () => {
      console.log('WebSocket connection closed.');
      setIsConnected(false);
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket Error: ' + error);
    };

    newSocket.onmessage = (e) => {
      console.log(e.data);
      setMessages(prevMessages => [...prevMessages, e.data]);
    };

    setSocket(newSocket); // Set the socket state here

    return () => {
      newSocket.close();
    };
  }, []);

  const enterRoom = (socket) => {
    const enterMsg = {
      type: "ENTER",
      roomId: roomId,
      sender: sessionStorage.getItem('token'),
      message: ""
    };
    socket.send(JSON.stringify(enterMsg));
  };

  const sendMessage = () => {
    if (!isConnected || !socket) return; // Check if socket is null before using it
    const talkMsg = {
      type: "TALK",
      roomId: roomId,
      sender: sessionStorage.getItem('token').substring(20,10),
      message: message
    };
    console.log(talkMsg.message);
    socket.send(JSON.stringify(talkMsg));
    setMessage('');
  };

  const quitRoom = () => {
    if (!isConnected || !socket) return; // Check if socket is null before using it
    const quitMsg = {
      type: "QUIT",
      roomId: roomId,
      sender: sessionStorage.getItem('token').substring(0,10),
      message: ""
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
        {/* Chat room content */}
      </div>

      <input
        type="text"
        placeholder="Enter your message"
        value={message}
        onChange={handleChange}
      />
      <button type="button" onClick={sendMessage}>Send</button>
      <button type="button" onClick={quitRoom}>Leave Room</button>
      <div>
        <span>Messages</span>
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
