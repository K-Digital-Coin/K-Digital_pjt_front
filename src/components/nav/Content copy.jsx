import React, { useEffect } from "react";
import Aos from 'aos';
import 'aos/dist/aos.css'

const Content = () => {

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>   
   <div className="pt-6  bg-black">
      {/*Cards1*/}
      <div className="w-full " 
      data-aos="fade-up">
        <div className="">
        <p className="p-4 text-2xl"> 단 세번의 탭으로 작동하는 간편함</p>
        <p className="ml-6">원하는 코인을 선택하면 실시간 코인정보를 보여줍니다</p>
        </div>
        <img 
        src={process.env.PUBLIC_URL + '/img/list.gif'} alt="사진1"
        className=""/>
    </div>
    {/*Cards2*/}
    
    </div>
    <div
      
    data-aos="fade-up">
        <div className="">
        <p className="p-4 text-2xl"> 단 세번의 탭으로 작동하는 간편함</p>
        <p className="ml-6">원하는 코인을 선택하면 실시간 코인정보를 보여줍니다</p>
        </div>
        <img 
        src={process.env.PUBLIC_URL + '/img/predict.gif'} alt="사진1"
        className=""/>
    </div>
    </>

  );
};

export default Content;
