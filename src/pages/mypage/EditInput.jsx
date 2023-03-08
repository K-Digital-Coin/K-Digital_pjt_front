import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import {getUserId} from '../../index'
import { getUser } from "../../index";
import { getUserEmails } from "../../index";
import client from "../../config/axiosConfig";


const EditInput = () => {
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
  
  // const outLog = ()=>{
  //   setOutUserInfo(localStorage.clear())
  //   sessionStorage.clear()
  //   alert('로그아웃 되었습니다')
  //   navigate('/')
  // } 
  

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
        <p  className="text-red-600"> 아이디 <span className="text-red-600">*</span> : {getUserInfo}</p>
      </div>
      <div className="relative flex flex-col w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-lime-500">
        <p className="">닉네임</p>
        <input
          type="text"
          defaultValue={getUserName}
          id="text"
          placeholder="변경할 닉네임 입력하세요 현재"
          className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
          onChange={(e) => {
            setnickname(e.target.value);
          }}
        />
      </div>
      <div className="relative flex flex-col w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-lime-500">
        <p>이메일</p>
        <input
          type="email"
          defaultValue={getUserEmail}
          id="email"
          autoFocus
          placeholder="변경할 이메일 입력 현재" 
          className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="relative flex flex-col w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-lime-500">
        <input
          type="password"
          id="password1"
          placeholder="비밀번호 입력하세요"
          className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="relative flex flex-col w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-lime-500">
        <input
          type="password"
          id="password2"
          placeholder="비밀번호 한번더입력하세요"
          className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button
        className="bg-blue-400 w-full rounded hover:bg-blue-500 hover:scale-105 py-2 font-semibold"
        onClick={() => {
          clickEdit();
        }}
      >
        회원정보 수정
      </button>
     
      <div className="space-y-2">
      <h3 className="font-bold">회원정보변경 안내</h3>
      <p className="ml-1">변경된 정보는 등록된 이메일주소로 안내됩니다</p>
      </div>
    </>
  );
};

export default EditInput;
