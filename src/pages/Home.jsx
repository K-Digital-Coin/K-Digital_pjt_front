import React from 'react';
import { useNavigate } from 'react-router';


const Home = () => {


  const navigate = useNavigate();

  return (
    <div className="bg-black h-screen">
      <div>
        <h2 className="flex items-center justify-center mt-32 text-3xl">
          비트코인 실시간 시세 예측 서비스
        </h2>
        <p className="flex flex-col items-center justify-center mt-24 text-gray-400">
          Predict Bit는 실시간 비트코인의 시세와 예측시세를 보여주며 여러분의 투자 의사결정에 도움을
          줍니다.
          <button
            onClick={() => {
              alert('로그인 후 사용가능합니다.');
              navigate('/logIn');
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
      <div className="flex items-center justify-center mt-24">
        <img
          src={process.env.PUBLIC_URL + '/img/example.gif'}
          alt="설명"
          className="w-max h-auto"
        />
      </div>
    </div>
  );
};

export default Home;
