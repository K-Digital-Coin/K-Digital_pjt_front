import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useFetchMarketCode } from "use-upbit-api";
import IndicatorChart from "../../components/chart/IndicatorChart";
import MainChart from "../../components/chart/MainChart";
import { marketCodesState } from "../../components/trading/atom"
import CoinDetails from "../../components/trading/CoinDetails";
import CoinSelector from "../../components/trading/CoinSelector";

const DisplayBoard = styled.main`
  width: 1250px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 400px 1000px;
  background-color: whitesmoke;

  font-family: Arial, Helvetica, sans-serif;

  *::-webkit-scrollbar,
  *::-webkit-scrollbar-thumb {
    width: 0px;
  }

  *::-webkit-scrollbar-thumb {
  }
  *:hover::-webkit-scrollbar,
  *:hover::-webkit-scrollbar-thumb {
    width: 26px;
    border-radius: 13px;
    background-clip: padding-box;
    border: 12px solid transparent;
    color: grey;
  }

  *:hover::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 0 10px;
  }

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

function TotalExample() {
  const {isLoading, marketCodes: fetchedMC } = useFetchMarketCode();
  const [marketCodes, setMarketCodes] = useRecoilState(marketCodesState);

  useEffect(() => {
    const MarketCodes_KRW = fetchedMC.filter((code) =>
      code.market.includes("KRW")
    );
    setMarketCodes(MarketCodes_KRW);
  }, [fetchedMC]);

  return (<>
    <div className="grid grid-rows-3 grid-flow-col  text-black h-screen">
      <div className="row-span-3">
      <CoinSelector />
      </div>
      <div className="col-span-2 h-[200px] w-full">
      <CoinDetails/>
      <MainChart/>
      <IndicatorChart/>
      </div>
    </div>

      
    </>
  );
}
export default TotalExample;
