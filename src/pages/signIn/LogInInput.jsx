import axios from "axios";
import { React, useState } from "react";


const LogInInput = () => {
  
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [savedUserId, setSavedUserId] = useState("");
  const [savedPassword, setSavedPassword] = useState("");
  
  const sessionStorage = window.sessionStorage;

  const clickLogin = async ()=>{
    try {
      const result = await axios.post('주소', {
        userId: userId,
        password: password
      });
      const token = result.data.access_token;
      sessionStorage.setItem("token", token);
      console.log(token)
      console.log("로그인 성공");
    } 
    catch (error) {
      console.error("로그인실패", error);
    }
  }
  return (
    <>
      <div className="relative flex flex-col w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-lime-500">
        <input
          type="text"
          id="email"
          autoFocus
          placeholder="아이디 입력하세요"
          className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        />
      </div>
      <div className="relative flex flex-col w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-lime-500">
        <input
          type="password"
          id="password"
          placeholder="비밀번호 입력하세요"
          className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
         </div>
        <button
          type="submit"
          className="bg-indigo-500 w-full rounded hover:bg-indigo-600 hover:scale-105 py-2 mt-4 font-semibold"
          onClick={() => {
            sessionStorage.setItem("id", userId);
            sessionStorage.setItem("password", password);
            setSavedUserId(sessionStorage.getItem("id"));
            setSavedPassword(sessionStorage.getItem("password"));
            clickLogin()
          }}
        >
          로그인
        </button>
     
    </>
  );
};

export default LogInInput;
