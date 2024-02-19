import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InstructorCard from './InstructorCard';


function CreateRoom() {
    const [roomName, setRoomName] = useState('');
    const [roomList, setRoomList] = useState([]);
    const [roomId, setRoomId] = useState('');
    const [loading, setLoading] = useState(false);
    const [instructors, setInstructors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [instructorEmail, setInstructorEmail] = useState('');
    const [instructorPassword, setInstructorPassword] = useState('');

    //const url = "43.200.254.172:8080";
    const url = "localhost:8080";
    const navigate = useNavigate();


    useEffect(() => {
        //login();
    }, []);

    
    const login = async () => {
        const loginInfo = {
            email: 'abc@naver.com',
            password: '1111'
        };
        try {
            const response = await axios.post(`http://${url}/student/login`, loginInfo);
            console.log("Login successful:", response.data);
            // 로그인이 성공하면 여기에서 추가적인 로직을 수행할 수 있습니다.
            sessionStorage.setItem('token',response.data.jwt.accessToken);
            
            fetchInstructorList();
        } catch (error) {
            console.log("Error with login:", error);
        }
    };


    const instructorLogin = async () => {
        const loginInfo = {
            email: 'in8v@naver.com',
            password: '1111'
        };
        try {
            const response = await axios.post(`http://${url}/instructor/login`, loginInfo);
            console.log("Login successful:", response.data);
            // 로그인이 성공하면 여기에서 추가적인 로직을 수행할 수 있습니다.
            sessionStorage.setItem('token',response.data.jwt.accessToken);
            
            fetchInstructorList();
        } catch (error) {
            console.log("Error with login:", error);
        }
    };

    // 컴포넌트가 렌더링될 때 한 번만 로그인 요청을 보냄
    



    const createSubmit = async (instructor) => {
        setLoading(true);

        const token = sessionStorage.getItem('token');

        let response = null;
        try {
        // axios 요청 설정
            response = await axios.post(`http://${url}/chat/room`,instructor.instructorId,{
                headers: {
                    'Authorization': `Bearer ${token}`, // 헤더에 JWT 토큰 추가
                    'Content-Type': 'application/json' // 요청의 Content-Type 설정
                }
            });

            console.log("들어가려는 방 정보: ");
            console.log(response.data.chatMessageList);
            
            //setRoomName('');
            //fetchRoomList(); // Alternatively, you can update the room list without navigation
        } catch (error) {
            console.error('Error creating room:', error);
            // Handle error
        } finally {
            setLoading(false);
            setRoomId(response.data.chatRoomInfo.roomId);
            //console.log("roomId: "+response.data.roomId);
            return response.data.chatRoomInfo.roomId;
        }
    
    };

    const fetchRoomList = async () => {
        try {
            
            const token = sessionStorage.getItem('token');
            setLoading(true);
            const response = await axios.get(`http://${url}/chat/rooms`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setRoomList(response.data);

            //console.log(response.data);
        } catch (error) {
            console.error('Error fetching chat room list:', error);
            // Handle error
        } finally {
            setLoading(false);
        }
    };


    const fetchInstructorList = async () => {
        try{
            const params = {
                    latitude: 0,
                    longitude: 0,
                    trainingTime: 1,
                    reservationTime: 1,
                    reservationDate: "2024-02-17",
                    pageNumber: 1,
                    pageSize: 10
                
              };

              
            const token = sessionStorage.getItem('token');
            setLoading(true);
            const response = await axios.get('http://43.200.254.172:8080/instructors', {
                params: params,
                headers: {
                    'Authorization': `Bearer ${token}`, // Add JWT token to the headers
                    'Content-Type': 'application/json' // Set the request Content-Type
                }
            });// Adjust the URL according to your backend API endpoint
            setInstructors(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally{
            setLoading(false);
        }




    }


    const enterRoom = async (instructor) => {

        let roomid = await createSubmit(instructor);
        console.log("room id: " + roomId);

        navigate(`/chatRoom?roomId=${roomid}&instructorId=${instructor.instructorId}`);
    }

    const handleChange = (event) => {

        setRoomName(event.target.value);
    };

    return (
        <div>
            <div>
                <h1>학생 로그인</h1>
                <input type="text" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={() => login()}>로그인</button>
                <div></div>
                <div></div>
                <h1>강사 로그인</h1>
                <input type="text" placeholder="이메일" value={instructorEmail} onChange={(e) => setInstructorEmail(e.target.value)} />
                <input type="password" placeholder="비밀번호" value={instructorPassword} onChange={(e) => setInstructorPassword(e.target.value)} />
                <button onClick={() => instructorLogin()}>로그인</button>
                <h1> Instructor List</h1>
                {loading ? (
                    <p>로딩 중...</p>
                ) : (
                    <ul>
                        {instructors.map(instructor => (
                            <>
                                <button onClick={() => enterRoom(instructor)}>채팅하기</button>
                                <InstructorCard key={instructor.instructorId} instructor={instructor}></InstructorCard>
                            </>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default CreateRoom;

