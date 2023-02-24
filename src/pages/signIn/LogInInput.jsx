import axios from "axios";
import { React, useState } from "react";
import { useNavigate } from "react-router";

const LogInInput = () => {
  const [loginId, setloginId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const getAuthHeader = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  };

  const clickLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/signIn", {
        loginId: loginId,
        password: password,
      });
      const accessToken = response.data.access_token;
      sessionStorage.setItem("token", accessToken);
      console.log("로그인 성공");
      navigate("/");
    } catch (error) {
      console.error("로그인실패", error);
      alert("다시 로그인해주세요");
    }
  };

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
            setloginId(e.target.value);
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
          clickLogin();
        }}
      >
        로그인
      </button>
    </>
  );
};

export default LogInInput;
