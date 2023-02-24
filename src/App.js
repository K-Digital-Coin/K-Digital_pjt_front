import './App.css';
import CoinChart from './chart/CoinChart'
import Navbar from './components/Navbar';
import CoinDetail from './components/CoinDetail';
import CoinPredict from './components/CoinPredict';
import LogIn from './pages/signIn/LogIn';
import SignUp from './pages/signUp/SignUp';
import Home from './pages/Home';
import {Route , Routes} from 'react-router-dom';



function App() {
const isLogin = true
  
return (

    <div className="bg-black h-screen text-white">
      <Navbar/>
      {/* <SignUp/> */}
    
       {/* {isLogin ? <><CoinDetail/>
       <div className='flex'>
       <Chart/>
       <CoinPredict/>
       </div> </> : <LogIn/>} */}
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
      <Route path='/logIn' element={<LogIn/>}/>
      <Route path='/coinChart' element={<CoinChart/>}/>
      </Routes>
       </div>
  );
}

export default App;
