import { React, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const SignUpInput = () => {
  
  const [nickname, setnickname] = useState("");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  // 회원가입 API
  const clickSignUp = async () => {
    try {
        const result = await axios.post("http://localhost:8080/api/member/signUp", {
          nickname: nickname,
          loginId: loginId,
          password: password,
        });
        const token = result.data.token;
        if (token) {
          localStorage.setItem("token", token);
          alert(nickname + "님 반갑습니다");
          navigate("/logIn");
        } else {
          alert("회원가입 실패하였습니다");
        }
      } catch (error) {
        console.log(error);
        alert("회원가입 실패하였습니다");
      }
    };


  return (
    <>
      <div className="relative flex flex-col w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-lime-500">
        <input
          type="text"
          id="name"
          autoFocus
          placeholder="이름"
          className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
          onChange={(e) => {
            setnickname(e.target.value);
          }}
        />
      </div>
      <div className="relative flex flex-col w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-lime-500">
        <input
          type="text"
          id="email"
          autoFocus
          placeholder="아이디 입력하세요"
          className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
          onChange={(e)=>{setLoginId(e.target.value)}}
        />
      </div>
      <div className="relative flex flex-col w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-lime-500">
        <input
          type="password"
          id="password"
          placeholder="비밀번호 입력하세요"
          className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
          onChange={(e)=>{setPassword(e.target.value)}}
        />
      </div>
      <button
        className="bg-red-400 w-full rounded hover:bg-red-500 hover:scale-105 py-2 font-semibold"
        onClick={() => {
          clickSignUp()
        }}
      >
        회원가입
      </button>
    </>
  );
};

export default SignUpInput;
