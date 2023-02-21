import {React,useState} from "react";
import { useNavigate } from "react-router-dom";
const LogIn = () => {


const [userId, setUserId] = useState("")
const [password, setPassword] = useState("")
const [savedUserId, setSavedUserId] = useState("")
const [savedPassword, setSavedPassword] = useState("")


const navigate = useNavigate()
const sessionStorage = window.sessionStorage;
console.log(userId)
console.log(password)

  return (
    // 기존 로그인 코드에서 애니메이션 추가한 코드
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-900">
        <div className="relative w-[400px] h-[480px] bg-gray-800 rounded-lg overflow-hidden">
            <div className="absolute w-[400px] h-[480px] bg-gradient-to-r from-indigo-500 via-indigo-500
            to-transparent -top-[50%] -left-[50%] animate-spin-slow origin-bottom-right"></div>
             <div className="absolute w-[400px] h-[480px] bg-gradient-to-r from-indigo-500 via-indigo-500
            to-transparent -top-[50%] -left-[50%] animate-spin-delay origin-bottom-right"></div>
            <div className="absolute inset-1 bg-gray-800 rounded-lg z-10 p-5">
                <form className="space-y-7">
                    <h2 className="text-2xl font-semibold text-indigo-500 text-center">로그인</h2>
                    <div className="relative flex flex-col w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-lime-500">
                      <input 
                      type='text' 
                      id="email" 
                      autoFocus
                      placeholder="아이디 입력하세요"
                      className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                      onChange={(e)=>{setUserId(e.target.value)}}
                      />
                    </div>
                    <div className="relative flex flex-col w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-lime-500">
                      <input 
                      type='password' 
                      id="password" 
                      placeholder="비밀번호 입력하세요"
                      className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                      onChange={(e)=>{setPassword(e.target.value)}}
                      />
                    </div>
                    <button type="submit"
                     className="bg-indigo-500 w-full rounded hover:bg-indigo-600 hover:scale-105 py-2 font-semibold"
                     onClick={()=>{ 
                      sessionStorage.setItem("id", userId)
                      sessionStorage.setItem("password",password)
                      setSavedUserId(sessionStorage.getItem("id"))
                      setSavedPassword(sessionStorage.getItem("password"))}}>
                      로그인</button>
                      <button onClick={()=>{navigate('/signUp')}}
                     className="bg-red-400 w-full rounded hover:bg-red-500 hover:scale-105 py-2 font-semibold">
                      회원가입</button>
                </form>
            </div>
        </div>
      
    </div>
  );
};

export default LogIn;
