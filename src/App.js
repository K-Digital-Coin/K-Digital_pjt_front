
import Navbar from "./components/nav/Navbar";
import LogIn from "./pages/signIn/LogIn";
import SignUp from "./pages/signUp/SignUp";
import Home from "./pages/Home";
import Trading from "./pages/trading/Trading";
import MyPage from "./pages/mypage/MyPage";
import Edit from "./pages/mypage/Edit";
import Delete from "./pages/mypage/Delete"
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";




function App() {
  return (
            <div className="bg-black max-h-screen text-white z-0">
              <Navbar />
              <Routes> 
                <Route path="/" element={<Home />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/logIn" element={<LogIn />} />
                <Route path="/mypage" element={<MyPage/>}/>
                <Route path="/edit" element={<Edit/>}/>
                <Route path="/delete" element={<Delete/>}/>
                <Route path="/trading" element={<RecoilRoot><Trading/></RecoilRoot>}/>
              </Routes> 
            </div>
         
  );
}

export default App;
