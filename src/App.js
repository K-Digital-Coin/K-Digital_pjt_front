import './App.css';
import CoinChart from './chart/CoinChart'
import Navbar from './components/Navbar';
import LogIn from './pages/signIn/LogIn';
import SignUp from './pages/signUp/SignUp';
import Home from './pages/Home';
import Trading from './pages/Trading';
import {Route , Routes} from 'react-router-dom';



function App() {
  
return (

    <div className="bg-black h-screen text-white">
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
      <Route path='/logIn' element={<LogIn/>}/>
      <Route path='/trading' element={<Trading/>}/>
      <Route path='/coinChart' element={<CoinChart/>}/>
      </Routes>
       </div>
  );
}

export default App;
