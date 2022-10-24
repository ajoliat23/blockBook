import { useState } from "react";
import React, { useEffect } from "react";
import { info } from "console";
// Create Interfaces for Coingecko API
export interface CoinInfo {
  price: number;
  volume_24: number;
  market_cap: number;
  price_change_percentage_24h: number;
  market_cap_rank: number;
  last_updated: Date;
}

export enum CoingeckoStatus {
  Success,
  FetchFailed,
  Loading,
}

export type CoinGeckoResult = {
  coinInfo?: CoinInfo;
  coinPrice?: CoinPrice;
  status: CoingeckoStatus;
};

export interface CoinInfoResult {
  market_data: {
    current_price: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    price_change_percentage_24h: number;
    market_cap_rank: number;
  };
  last_updated: string;
}
interface CoinPrice {
    market_data: {
        current_price: {
            usd:number;
        }
    }
}
export default function PriceCard() {
  const [coinInfo, setCoinInfo] = useState<CoinGeckoResult>();
  const [coinPrice, setCoinPrice] = useState<CoinGeckoResult>();

  useEffect(() => {
    getCoinInfo();
  }, []);

  // Use Coingecko API
  function getCoinInfo() {
    fetch(`https://api.coingecko.com/api/v3/coins/solana`)
      .then((res) => res.json())
      .then((info: CoinInfoResult) => {
        setCoinInfo({
          coinInfo: {
            price: info.market_data.current_price.usd,
            volume_24: info.market_data.total_volume.usd,
            market_cap: info.market_data.market_cap.usd,
            market_cap_rank: info.market_data.market_cap_rank,
            price_change_percentage_24h:
              info.market_data.price_change_percentage_24h,
            last_updated: new Date(info.last_updated),
          },
          status: CoingeckoStatus.Success,
        });
      })
      .catch((error: any) => {
        setCoinInfo({
          status: CoingeckoStatus.FetchFailed,
        });
      });
  }
}
export function GetPrice():number {
  var price:number = 0;
  fetch(`https://api.coingecko.com/api/v3/coins/solana`)
    .then((res) => res.json())
    .then((info: CoinPrice) => {
          price = info.market_data.current_price.usd;
      })
  return price;
}