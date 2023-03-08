import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById("root"));

export const getUser = () => {
  const userInfo = sessionStorage.getItem("nickname");
  return userInfo;
};
export const getUserId = ()=>{
  const userId = sessionStorage.getItem("loginId")
  return userId
}
export const getUserEmails = ()=>{
  const userEmail = sessionStorage.getItem("email")
  return userEmail
}

root.render(
          <BrowserRouter>
            <App />
          </BrowserRouter>
   
);
