import React from 'react';
import { BrowserRouter, Route,Routes, Link, Switch } from 'react-router-dom';
import ChatRoom from './ChatRoom';
import CreateRoom from './CreateRoom';
import ChatRoomWithQueryParam from './ChatRoomWithQueryParam';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<CreateRoom />} />
          <Route path="/chatRoom" element={<ChatRoomWithQueryParam />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
