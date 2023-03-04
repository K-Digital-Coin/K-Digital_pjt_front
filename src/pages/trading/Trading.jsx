
import React,{ useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useFetchMarketCode } from "use-upbit-api";
import { marketCodesState } from "../../components/trading/atom";
import CoinDetails from "../../components/trading/CoinDetails";
import CoinSelector from "../../components/trading/CoinSelector";
import { useNavigate, useParams } from "react-router";
import Charts from "../../components/chart/Charts";


function Trading () {
  const { isLoading, marketCodes: fetchedMC } = useFetchMarketCode();
  const [marketCodes, setMarketCodes] = useRecoilState(marketCodesState);
  const [chartNumber, setchartNumber] = useState("");
  const [targetNumber, setTargetNumber] = useState("")
  const [clickBtn , setClickBtn] = useState(0)
  
  useEffect(() => {
    const MarketCodes_KRW = fetchedMC.filter((code) =>
      code.market.includes("KRW")
    );
    setMarketCodes(MarketCodes_KRW);
  }, [fetchedMC]);


  return (
    <>
      <div className="flex flex-row text-black h-screen">
        <div className="basis-1/4 p-5">
          <CoinSelector />
        </div>
        <div className="basis-3/4 p-5 pr-10">
          <div className="text-white flex justify-center">
            <div>
              <ul className="flex space-x-14">
                <li onClick={(e) =>{
                  setchartNumber(1)
                  setClickBtn(1)
                  setTargetNumber(chartNumber)
                }}
                 className={`${clickBtn===1 ? "border-b-2 border-red-500" : ""}`}>Ma 지표모델</li>
                <li onClick={() =>{
                  setchartNumber(2)
                  setClickBtn(2)
                  setTargetNumber(chartNumber)}}
                  className={`${clickBtn===2 ? "border-b-2 border-blue-500" : ""}`}>BBP 지표모델</li>
                <li onClick={() =>{ 
                  setchartNumber(3)
                  setClickBtn(3)
                  setTargetNumber(chartNumber)}}
                  className={`${clickBtn===3 ? "border-b-2 border-green-500" : ""}`}>BBC 지표모델</li>
                <li onClick={() =>{
                  setchartNumber(4)
                  setClickBtn(4)
                  setTargetNumber(chartNumber)}}
                  className={`${clickBtn===4 ? "border-b-2 border-yellow-500" : ""}`}>BBM 지표모델</li>
                <li onClick={() =>{ 
                  setchartNumber(5)
                  setClickBtn(5)
                  setTargetNumber(chartNumber)}}
                  className={`${clickBtn===5 ? "border-b-2 border-gray-500" : ""}`}>MACD 지표모델</li>
              </ul>
            </div>
          </div>
          <CoinDetails />
          <Charts chartNumber={chartNumber} targetNumber={targetNumber} />
        </div>
      </div>
    </>
  );
}
export default Trading;
