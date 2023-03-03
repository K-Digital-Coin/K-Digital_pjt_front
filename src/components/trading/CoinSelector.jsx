import { memo, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { useUpbitWebSocket } from "use-upbit-api";
import {
  marketCodesState,
  selectedCoinInfoState,
  selectedCoinState,
} from "./atom";
import CoinDetails from "./CoinDetails";

const convertMillonWon = (value) => {
  const MILLION = 1000000;
  const extractedValue = value / MILLION;
  return extractedValue;
};

const CoinListBox = styled.div`
  width : 100%;
  min-width: 400px ;
  height: 800px;
  margin: 5px;
  color: white;
  background-color: black;
  overflow: overlay;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const CoinBoxHeader = styled.div`
  position: -webkit-sticky;
  top: 1px;
  background-color: black;
  opacity: 0.8;
  height: 35px;
  display: grid;
  grid-template-columns: 0.5fr 0.5fr 0.5fr 0.5fr;
  border-bottom: 0.5px solid lightgrey;
  font-size: 20px;
  font-weight: 600;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CoinBox = styled.div`
  height: 45px;
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1.3fr;
  border-bottom: 0.5px solid lightgrey;
  font-size: 12px;
  padding-left: 5px;
  padding-right: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "grey" : "inherit")};
  :hover {
    background-color: gray;
  }
  div {
    display: flex;
  }
  div:nth-child(1) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  div:nth-child(2) {
    justify-content: flex-end;
    align-items: center;
  }
  div:nth-child(3) {
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  }
  div:nth-child(4) {
    justify-content: flex-end;
    align-items: center;
  }
`;

const CoinBoxName = styled.div`
  font-weight: 600;
  font-size: 11px;

  div:nth-child(2) {
    color: beige;
    font-weight: 400;
    font-size: 7px;
  }
`;

const CoinBoxPrice = styled.div`
  font-weight: 600;
  color: ${(props) => {
    switch (props.changeType) {
      case "RISE":
        return "#EF1C1C";
      case "EVEN":
        return "white";
      case "FALL":
        return "#1261C4";
      default:
        return "white";
    }
  }};
`;

const CoinBoxChange = styled.div`
  color: ${(props) => {
    switch (props.changeType) {
      case "RISE":
        return "#EF1C1C";
      case "EVEN":
        return "white";
      case "FALL":
        return "#1261C4";
      default:
        return "white";
    }
  }};
`;
const CoinBoxChangeRate = styled.div``;
const CoinBoxChangePrice = styled.div``;
const CoinBoxVolume = styled.div`
  font-size: 11px;
  div:nth-child(2) {
    color: grey;
  }
`;

function CoinSelector() {
  const marketCodes = useRecoilValue(marketCodesState);
  const [selectedCoin, setSelectedCoin] = useRecoilState(selectedCoinState);
  const webSocketOptions = { throttle_time: 400, max_length_queue: 100 };
  const { socket, isConnected, socketData } = useUpbitWebSocket(
    marketCodes,
    "ticker",
    webSocketOptions
  );
  const [selectedCoinInfo, setSelectedCoinInfo] = useRecoilState(
    selectedCoinInfoState
  );

  useEffect(() => {
    if (socketData) {
      const targetData = socketData.filter(
        (data) => data.code == selectedCoin[0].market
      );
      setSelectedCoinInfo(...targetData);
    }
  }, [selectedCoin, socketData]);

  const clickCoinHandler = (evt) => {
    const currentTarget = marketCodes.filter(
      (code) => code.market === evt.currentTarget.id
    );
    setSelectedCoin(currentTarget);
  };

  return (
    <div className="flex">
    <CoinListBox>
      <CoinBoxHeader>
        <div>코인</div>
        <div>현재가</div>
        <div>전일대비</div>
        <div>거래대금</div>
      </CoinBoxHeader>
      {socketData
        ? socketData.map((data) => {
            return (
              <CoinBox
                key={data.code}
                id={data.code}
                onClick={clickCoinHandler}
                selected={selectedCoin[0].market === data.code}
              >
                <CoinBoxName>
                  <div>
                    {
                      marketCodes.filter((code) => code.market === data.code)[0]
                        .korean_name
                    }
                  </div>
                  <div>
                    {
                      marketCodes.filter((code) => code.market === data.code)[0]
                        .market
                    }
                  </div>
                </CoinBoxName>
                <CoinBoxPrice changeType={data.change}>
                  {data.trade_price.toLocaleString("ko-KR")}
                </CoinBoxPrice>
                <CoinBoxChange changeType={data.change}>
                  <CoinBoxChangeRate>
                    {data.signed_change_rate > 0 ? "+" : null}
                    {(data.signed_change_rate * 100).toFixed(2)}%
                  </CoinBoxChangeRate>
                  <CoinBoxChangePrice>
                    {data.signed_change_price.toLocaleString("ko-KR")}
                  </CoinBoxChangePrice>
                </CoinBoxChange>
                <CoinBoxVolume>
                  <div>
                    {Math.ceil(
                      convertMillonWon(data.acc_trade_price_24h)
                    ).toLocaleString("ko-KR")}
                  </div>
                  <div>백만</div>
                </CoinBoxVolume>
              </CoinBox>
            );
          })
        : null}
    </CoinListBox>
    </div>
  );
}

export default memo(CoinSelector);
