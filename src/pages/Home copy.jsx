import React, { useState } from "react";
import { useNavigate } from "react-router";
import Content from "../components/nav/Content";
import ParticleBackground from "../config/ParticleBackground";


const Home = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const modalHandler = () => {
    setModal(!modal);
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center ">
        <div className="">
        <ParticleBackground style={{postion : 'absolute'}}/>
          {/* <div className='flex justify-center space-x-9 '>
          <button onClick={modalHandler}
          >서비스</button>
          <button
          >예측</button>
          </div> */}
          <h2 className="flex items-center justify-center mt-7 text-6xl text-white font-bold">
            비트코인 실시간 시세 예측 서비스
          </h2>
          <p className="flex flex-col items-center justify-center mt-16 text-gray-400 font-bold">
            Predict Bit는 실시간 비트코인의 시세와 예측시세를 보여주며 여러분의 투자
            의사결정에 도움을 줍니다.
            <button
              onClick={() => {
                alert("로그인 후 사용가능합니다.");
                navigate("/logIn");
              }}
              className="flex items-center justify-center w-72 h-12 mt-11 border-2 rounded-full text-white hover:scale-105 bg-purple-400 hover:bg-purple-500"
            >
              <span role="img" aria-label="chart">
                📈
              </span>
              시작
            </button>
          </p>
        </div>
      </div>
      <Content />

    </>
  );
};

export default Home;
