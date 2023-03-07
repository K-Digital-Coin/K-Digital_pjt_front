import { atom } from "recoil";


export const marketCodesState = atom({
  key: "marketCodesState",
  default: [],
});

// 코인의 정보를 저장하는 데 사용
export const selectedCoinState = atom({
  key: "selectedCoinState",
  default: [
    {
      market: "KRW-BTC",
      korean_name: "비트코인",
      english_name: "Bitcoin",
    },
  ],
});
// 선택된 코인에 대한 상세 정보를 저장
export const selectedCoinInfoState = atom({
  key: "selectedCoinInfoState",
  default: {},
});

