import './App.css';
import Chart from './chart/CoinChart3';
import Navbar from './components/Navbar';
import CoinDetail from './components/CoinDetail';
import CoinPredict from './components/CoinPredict';
function App() {


  return (
    <div className="bg-black h-screen text-white">
      <Navbar/>
      <CoinDetail/>
      <div className='flex'>
      <Chart/>
      <CoinPredict/>
      </div>
    </div>
  );
}

export default App;
