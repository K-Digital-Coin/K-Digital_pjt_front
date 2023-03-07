import React from "react";
import Card from "./Card";
import bg1 from "../../img2/list.gif"
import bg2 from "../../img2/predict.gif"


const Content = () => {

  const card = [
    {
      bg:bg1, 
      profile:bg1, 
      title:"Midjourney", 
      description :"The official server for Midjourney, a text-to-image AI where your imagination is the only limit.",
      size : <p>471,689명 온라인 &#x2022; 멤버 232,061명</p>
      },
      {
      bg:bg2, 
      profile:bg2, 
      title:"Midjourney", 
      description :"The official server for Midjourney, a text-to-image AI where your imagination is the only limit.",
      size :<p>471,689명 온라인 &#x2022; 멤버 232,061명</p>
      },
      // {
      //   bg:bg1, 
      //   profile:bg1, 
      //   title:"Midjourney", 
      //   description :"The official server for Midjourney, a text-to-image AI where your imagination is the only limit.",
      //   size :<p>471,689명 온라인 &#x2022; 멤버 232,061명</p>
      //   },
      
  ]



  return (
    <>   
   <div className="pt-6">
      {/*Cards*/}
      <div
        className="gap-y-8 grid grid-cols-2 sm:grid-cols-2 sm:gap-x-4
    md:grid-cols-3 xs:gap-x-2 xl:grid-cols-2 justify-between"
      >
        <div className="basis-1/4">
        <p className="p-4 text-2xl"> 단 세번의 탭으로 작동하는 간편함</p>
        <p className="ml-6">원하는 코인을 선택하면 실시간 코인정보를 보여줍니다</p>
        </div>
        <img 
        src={bg1} alt="사진1"
        className=""/>
    </div>
    </div>
    </>

  );
};

export default Content;