import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import ChatRoom from './ChatRoom';


const ChatRoomWithQueryParam = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const roomId = searchParams.get('roomId');
    
    if (!roomId) {
      navigate('/'); // roomId가 없을 경우 홈페이지로 이동
      return null;
    }
    console.log()
    
    return <ChatRoom roomId={roomId}/>;
  };



  export default ChatRoomWithQueryParam; 