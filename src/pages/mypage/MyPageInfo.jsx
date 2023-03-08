import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import {getUserId} from '../../index'
import { getUser } from "../../index";
import { getUserEmails } from "../../index";
import client from "../../config/axiosConfig";


const MyPageInfo = () => {
  const navigate = useNavigate();

  const [nickname, setnickname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("")
  const [getUserInfo , setGetUserInfo] = useState()
  const [getUserName , setGetUserName] = useState()
  const [getUserEmail, setGetUserEmail] = useState()

  useEffect(()=>{
    setGetUserInfo(getUserId())
    setGetUserName(getUser())
    setGetUserEmail(getUserEmails())
  },[getUserInfo, getUserName, getUserEmail])

  console.log(getUserId())
  
  const successEdit = () => {
    alert("회원정보 수정완료");
    localStorage.clear()
    sessionStorage.clear()
    navigate("/logIn");
  };

  // 회원수정 API
  const clickEdit = async () => {
    try {
      const result = await client.put("/api/member", {
        nickname: nickname,
        password: password,
        email : email
      });
      result.data.code === 200 && successEdit();
    } catch (error) {
      alert(error.response.data.message);
    }
  };


  return (
    <>
      <div className="relative flex flex-col w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-lime-500">
        <p> 아이디 : {getUserInfo}</p>

        
      </div>
      <div className="relative flex flex-col w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-lime-500">
      <p> 닉네임: {getUserName}</p>

      </div>
      <div className="relative flex flex-col w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-lime-500">
        <p> 이메일 : {getUserEmail}</p>
      </div>
      <div className="flex space-x-2">
      <button
        className="bg-blue-400 w-full rounded hover:bg-blue-500 hover:scale-105 py-2 font-semibold"
        onClick={() => {
          navigate('/edit')
        }}
      >
        회원정보 수정
      </button>
      <button
        className="bg-red-400 w-full rounded hover:bg-red-500 hover:scale-105 py-2 font-semibold"
        onClick={() => {
          navigate('/delete')
        }}
      >
        회원탈퇴
      </button>
      </div>
      <div className="space-y-2">
      <h3 className="font-bold">보유 코인</h3>
      <p className="ml-1">준비중입니다</p>
      </div>
    </>
  );
};

export default MyPageInfo;
