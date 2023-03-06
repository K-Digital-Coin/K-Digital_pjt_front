import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useFetchMarketCode } from "use-upbit-api";
import { marketCodesState } from "../../components/trading/atom";
import CoinSelector from "../../components/trading/CoinSelector";
import Charts from "../../components/chart/Charts";
import CoinInfo from "../../components/trading/CoinInfo";

function Trading() {
  const { isLoading, marketCodes: fetchedMC } = useFetchMarketCode();
  const [marketCodes, setMarketCodes] = useRecoilState(marketCodesState);

  useEffect(() => {
    const MarketCodes_KRW = fetchedMC.filter((code) =>
      code.market.includes("KRW")
    );
    setMarketCodes(MarketCodes_KRW);
  }, [fetchedMC]);

  return (
    <>
      <div className="flex flex-row text-black bg-black">
        <div className="basis-1/4 p-5">
          <CoinSelector />
        </div>
        <div className="basis-3/4 p-5 pr-10">
          <CoinInfo />
          <Charts />
        </div>
      </div>
    </>
  );
}
export default Trading;
