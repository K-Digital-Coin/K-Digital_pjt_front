import React, { useState } from "react";
import client from "../../config/axiosConfig";
import {json, useNavigate } from "react-router";

const Delete = () => {

  const naviagte = useNavigate()
  const [password, setPassword] = useState()

// 회원삭제 API
const clickDelete = async () => {
  try {
    const result = await client.delete("/api/member", {
      data: {
    password : password
  }
    });
    result.data.code === 200 && successDelete();
  } catch (error) {
    alert(error.response.data.message);
  }
  console.log(password)
};

const successDelete = ()=>{
  alert("탈퇴완료")
  localStorage.clear()
  sessionStorage.clear()
  naviagte('/logIn')
}



 

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-900">
      <div className="relative w-[530px] h-[600px] bg-gray-800 rounded-lg overflow-hidden">
        <div
          className="absolute w-[530px] h-[600px] bg-gradient-to-r from-indigo-500 via-indigo-500
        to-transparent -top-[50%] -left-[50%] animate-spin-slow origin-bottom-right"
        ></div>
        <div
          className="absolute w-[530px] h-[600px] bg-gradient-to-r from-indigo-500 via-indigo-500
        to-transparent -top-[50%] -left-[50%] animate-spin-delay origin-bottom-right"
        ></div>
        <div className="absolute inset-1 bg-gray-800 rounded-lg z-10 p-5">
          <div className="space-y-7">
            <h2 className="text-2xl font-semibold text-indigo-500 text-center">
              회원탈퇴
            </h2>
            <span className="flex space-x-2">           
              <label  className="text-red-600">회원 탈퇴시 보유하고 계신 코인날라갑니다 </label>            
            </span>
            <div className="relative flex flex-col w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-lime-500">
        <input
          type="password"
          id="text"
          autoFocus
          placeholder="비밀번호 입력하세요"
          className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      </div>
      <button
        className="bg-red-400 w-full rounded hover:bg-red-500 hover:scale-105 py-2 font-semibold"
        onClick={() => {
          clickDelete();
        }}
      >
        회원탈퇴
      </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delete;
