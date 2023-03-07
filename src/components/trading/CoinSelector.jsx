import { memo, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { useUpbitWebSocket } from "use-upbit-api";
import {
  marketCodesState,
  selectedCoinInfoState,
  selectedCoinState,
} from "./atom";


const convertMillonWon = (value) => {
  const MILLION = 1000000;
  const extractedValue = value / MILLION;
  return extractedValue;
};

const CoinListBox = styled.div`
  width: 100%;
  min-width: 400px;
  height: 1300px;
  margin: 5px;
  color: white;
  background-color: black;
  overflow: overlay;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding-left: 5px;
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
  font-size: 16px;
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
  font-size: 13px;
  padding-left: 2px;
  padding-right: 2px;
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
  font-size: 13px;

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
  padding: 15px;
  div:nth-child(2) {
    color: grey;
  }
`;



function CoinSelector() {
  // useRecoilValue 함수를 이용하여 marketCodesState의 상태를 가져옴
  const marketCodes = useRecoilValue(marketCodesState);
  // useRecoilState 함수를 이용하여 selectedCoinState 상태와 setSelectedCoin 함수를 가져옴
  const [selectedCoin, setSelectedCoin] = useRecoilState(selectedCoinState);
  // WebSocket을 사용하는데 필요한 옵션들을 정의함
  const webSocketOptions = { throttle_time: 400, max_length_queue: 100 };
  // useUpbitWebSocket 커스텀 훅을 이용하여 WebSocket을 생성함
  const { socket, isConnected, socketData } = useUpbitWebSocket(
    marketCodes,
    "ticker",
    webSocketOptions
  );
  // useRecoilState 함수를 이용하여 selectedCoinInfoState 상태와 setSelectedCoinInfo 함수를 가져옴
  const [selectedCoinInfo, setSelectedCoinInfo] = useRecoilState(
    selectedCoinInfoState
  );
  // useState 함수를 이용하여 borderVisible 상태와 setBorderVisible 함수를 정의함
  const [borderVisible, setBorderVisible] = useState(false);

  // useEffect 함수를 이용하여 selectedCoin 또는 socketData 상태가 변경될 때마다 동작하는 콜백함수를 정의함
  useEffect(() => {
    // socketData가 존재하면 선택된 코인 데이터를 찾아서 선택된 코인 정보 상태에 저장함
    if (socketData) {
      const targetData = socketData.filter(
        (data) => data.code === selectedCoin[0].market
      );
      setSelectedCoinInfo(...targetData);
      setBorderVisible(true);
      setTimeout(() => {
        setBorderVisible(false);
      }, 1000);
    }
  }, [selectedCoin, socketData]);

  const clickCoinHandler = (evt) => {
    // 현재 클릭된 코인의 코드 데이터를 marketCodes에서 찾아서 선택된 코인 상태에 저장함
    const currentTarget = marketCodes.filter(
      (code) => code.market === evt.currentTarget.id
    );
    setSelectedCoin(currentTarget);
  };


  return (    
    <div className="flex">
      <CoinListBox>
        <CoinBoxHeader>
          <div className="pr-10">코인</div>
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
                        marketCodes.filter(
                          (code) => code.market === data.code
                        )[0].korean_name
                      }
                    </div>
                    <div>
                      {
                        marketCodes.filter(
                          (code) => code.market === data.code
                        )[0].market
                      }
                    </div>
                  </CoinBoxName>
                  <CoinBoxPrice changeType={data.change}>
                    <div className="pr-10">
                    {data.trade_price.toLocaleString("ko-KR")}
                    </div>
                  </CoinBoxPrice>
                      <div className="pr-6">
                  <CoinBoxChange changeType={data.change}>
                    <CoinBoxChangeRate>
                      {data.signed_change_rate > 0 ? "+" : null}
                      {(data.signed_change_rate * 100).toFixed(2)}
                    </CoinBoxChangeRate>
                    <CoinBoxChangePrice>
                      {data.signed_change_price.toLocaleString("ko-KR")}
                    </CoinBoxChangePrice>
                      </CoinBoxChange>
                    </div>
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
