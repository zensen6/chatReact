import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateRoom() {
    const [roomName, setRoomName] = useState('');
    const [roomList, setRoomList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRoomList();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:8080/chat/createRoom', { name: roomName });
            setRoomName('');
            // Navigate to the newly created room or room list
            // navigate(`/room/${roomId}`); // Adjust the route as per your application
            fetchRoomList(); // Alternatively, you can update the room list without navigation
        } catch (error) {
            console.error('Error creating room:', error);
            // Handle error
        } finally {
            setLoading(false);
        }
    };

    const fetchRoomList = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8080/chat/roomList');
            setRoomList(response.data);

            //console.log(response.data);
        } catch (error) {
            console.error('Error fetching chat room list:', error);
            // Handle error
        } finally {
            setLoading(false);
        }
    };

    const enterRoom = (room) => {

        navigate(`/chatRoom?roomId=${room.roomId}`);
    }

    const handleChange = (event) => {

        setRoomName(event.target.value);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="채팅방 이름"
                    value={roomName}
                    onChange={handleChange}
                />
                <button type="submit" disabled={loading}>
                    {loading ? '로딩 중...' : '방 만들기'}
                </button>
            </form>

            <div className="ChatList">
                <h1>Chat Room List</h1>
                {loading ? (
                    <p>로딩 중...</p>
                ) : (
                    <ul>
                        {roomList.map(room => (
                            <li key={room.id} onClick={() => enterRoom(room)}>
                                {room.name}
                                <button>입장하기</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default CreateRoom;

