import './App.css';
import Chart from './chart/CoinChart';
import Navbar from './components/Navbar';
import CoinDetail from './components/CoinDetail';
import CoinPredict from './components/CoinPredict';
import LogIn from './pages/signIn/LogIn';
import SignUp from './pages/signUp/SignUp';
import {Route , Routes, } from 'react-router-dom';
import { redirect } from 'react-router-dom';



function App() {

  return (

    <div className="bg-black h-screen text-white">
      <Navbar/>
      {/* <SignUp/> */}
    
       {/* <CoinDetail/>
       <div className='flex'>
       <Chart/>
       <CoinPredict/>
       </div> */}
      <Routes>
      <Route path='/signUp' element={<SignUp/>}/>
      <Route path='/logIn' element={<LogIn/>}/>
      </Routes>
       </div>
  );
}

export default App;
