import React from 'react';
import "./mypagelist.css";
const BASE_URL = `${process.env.REACT_APP_API_URL}`;

function MyPageList(request) {
    const refresh_token = localStorage.getItem("refresh-token");
    const login_token = localStorage.getItem("login-token");
    console.log(request.request)

    const go =(link) => {
        fetch(`${BASE_URL}/user-to-team/${link}`,{   
            method: 'POST', 
            headers: {
                'refresh-token': refresh_token,
                'login-token': login_token,
            }                                       
        })                            
        .then((response) => response.json())
        .then((obj)=>{alert(obj.message); window.location.reload()})
    }
    return (
        <div className='MyPageList_profile' key={request.waitingId}>             
            팀원 요청 관리
            <div className='profile_image'></div>
            <div className='profile_name'>팀원 아이디입니다 :{request.request.userId}</div>
            <div className='profile_detail'>자기 소개입니다 :{request.request.detail}</div>
            <div className='profile_field'>{request.request.field === 1 ? <p>프론트엔드입니다</p> : 
            request.request.field === 2 ? <p>백엔드입니다</p> : <p>프론트 백엔드 상관없음</p> }</div>
            <button onClick={()=> go(`${request.request.waitingId}/approve`)}>수락하기</button>
            <button onClick={()=> go(`${request.request.waitingId}/fuckyou`)}>거절하기</button>
        </div>
    );
}

export default MyPageList;