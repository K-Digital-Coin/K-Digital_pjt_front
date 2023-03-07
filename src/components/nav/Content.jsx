import React, { useEffect } from "react";
import Aos from 'aos';
import 'aos/dist/aos.css'

const Content = () => {

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>   
   <div className="bg-black h-screen flex justify-center items-center">
      {/*배너1*/}
      <div className="flex flex-row" data-aos="fade-up">
        <div className="">
        <p className="p-4 text-2xl">실시간 코인을 한눈에 보는 가독성</p>
        <p className="ml-6">원하는 코인을 선택하면 실시간 코인정보를 보여줍니다</p>
        </div>
        <img 
        src={process.env.PUBLIC_URL + '/img/banner1.png'} alt="사진1"
        className="ml-48 w-4/6 h-auto"/>
    </div>
    
    </div>


    <div className="bg-black min-h-screen flex justify-center items-center">
    {/*배너2*/}
    <div className="flex flex-row" data-aos="fade-up">
        <img 
        src={process.env.PUBLIC_URL + '/img/banner2.png'} alt="사진1"
        className="w-4/6 h-auto"/>
        <div className="ml-12">
        <p className="p-4 text-2xl"> 단 세번의 탭으로 작동하는 간편함</p>
        <p className="ml-6">원하는 코인을 선택하면 실시간 코인정보를 보여줍니다</p>
        </div>
    </div>
    </div>
    </>

  );
};

export default Content;
