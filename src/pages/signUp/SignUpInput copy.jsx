import { React, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const SignUpInput = () => {
  
const navigate = useNavigate();

const [user , setUser] = useState({
  loginId : "",
  password : "",
  nickname : ""
})
  
  const successSignUp =()=>{
    alert("회원가입 성공")
    navigate('/logIn')
  }
  const changeValue = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // 회원가입 API


  const clickSignUp = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.post("/api/member/signUp",{
        loginId : user.loginId,
        nickname : user.nickname, 
        password : user.password
      })
      result.data.code === 200 && successSignUp()
    } catch (error) {
      console.log(error)
      alert(error.response.data.message)
    }
  }


  return (
    <div>
    <form onSubmit={clickSignUp}>
      <div className="relative flex flex-col w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-lime-500">
        <input
          type="text"
          name="nickname"
          autoFocus
          placeholder="이름"
          className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
          onChange={changeValue}
        />
      </div>
      <div className="relative flex flex-col w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-lime-500">
        <input
          type="text"
          name="loginId"
          placeholder="아이디 입력하세요"
          className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
          onChange={changeValue}
        />
      </div>
      <div className="relative flex flex-col w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-lime-500">
        <input
          type="password"
          name="password"
          placeholder="비밀번호 입력하세요"
          className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
          onChange={changeValue}
        />
      </div>
      <button
        className="bg-red-400 w-full rounded hover:bg-red-500 hover:scale-105 py-2 font-semibold"
        type="submit"
      >
        회원가입
      </button>
      </form>
    </div>
  );
};

export default SignUpInput;
