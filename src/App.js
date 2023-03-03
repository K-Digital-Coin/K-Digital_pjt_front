
import CoinChart from "./pages/chart/CoinChart";
import Navbar from "./components/nav/Navbar";
import LogIn from "./pages/signIn/LogIn";
import SignUp from "./pages/signUp/SignUp";
import Home from "./pages/Home";
import Trading from "./pages/trading/Trading";
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";



function App() {
  return (
    
            <div className="bg-black h-screen text-white">
              <Navbar />
              <Routes> 
                <Route path="/" element={<Home />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/logIn" element={<LogIn />} />
                <Route path="/trading" element={<RecoilRoot><Trading /></RecoilRoot>} />
                <Route path="/coinChart" element={<CoinChart />} />
              </Routes> 
            </div>
         
  );
}

export default App;
