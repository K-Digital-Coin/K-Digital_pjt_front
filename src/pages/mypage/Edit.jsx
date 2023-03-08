import React, { useState } from "react";
import EditInput from "./EditInput";

const Edit = () => {
  const [checkInputs, setCheckInputs] = useState([]);

  const changeHandler = (checked) => {
    if (checked) {
      alert("약관 동의 되었습니다");
    } else {
      setCheckInputs();
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-900">
      <div className="relative w-[530px] h-[600px] bg-gray-800 rounded-lg overflow-hidden">
        <div
          className="absolute w-[530px] h-[600px] bg-gradient-to-r from-indigo-500 via-indigo-500
        to-transparent -top-[50%] -left-[50%] animate-spin-slow origin-bottom-right"
        ></div>
        <div
          className="absolute w-[530px] h-[600px] bg-gradient-to-r from-indigo-500 via-indigo-500
        to-transparent -top-[50%] -left-[50%] animate-spin-delay origin-bottom-right"
        ></div>
        <div className="absolute inset-1 bg-gray-800 rounded-lg z-10 p-5">
          <div className="space-y-7">
            <h2 className="text-2xl font-semibold text-indigo-500 text-center">
              회원정보 수정
            </h2>
            <span className="flex space-x-2">           
              <label> <span className="text-red-600">*</span> 표시는 필수입력 항목이오니 반드시 입력부탁드립니다</label>            
            </span>
            <EditInput/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
