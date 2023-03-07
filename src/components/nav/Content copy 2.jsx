import React, { useEffect } from "react";
import Aos from 'aos';
import 'aos/dist/aos.css'

const Content = () => {

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>   
   <div className="bg-black min-h-screen flex justify-center items-center">
      {/*Cards1*/}
      <div className="flex flex-row" data-aos="fade-up">
        <div className="basis-1/4">
        <p className="p-4 text-2xl"> 단 세번의 탭으로 작동하는 간편함</p>
        <p className="ml-6">원하는 코인을 선택하면 실시간 코인정보를 보여줍니다</p>
        </div>
        <img 
        src={process.env.PUBLIC_URL + '/img/banner1.png'} alt="사진1"
        className="ml-96 basis-3/4 w-10"/>
    </div>
    
    </div>



    {/*Cards2*/}
    <div className="flex flex-row" data-aos="fade-up">
        <img 
        src={process.env.PUBLIC_URL + '/img/banner2.png'} alt="사진1"
        className=" basis-3/4 w-10"/>
        <div className="basis-1/4">
        <p className="p-4 text-2xl"> 단 세번의 탭으로 작동하는 간편함</p>
        <p className="ml-6">원하는 코인을 선택하면 실시간 코인정보를 보여줍니다</p>
        </div>
    </div>
    </>

  );
};

export default Content;
