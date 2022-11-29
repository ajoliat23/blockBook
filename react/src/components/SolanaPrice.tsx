import { useState } from "react";
import React, { useEffect } from "react";
import { info } from "console";
import {readFileSync, writeFileSync, promises as fsPromises} from "fs";
import {join} from "path";

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

async function asyncWriteFile(filename: string, data: any) {
  try {
    await fsPromises.writeFile(join(__dirname, filename), data, {
      flag: 'w',
    });
    const contents = await fsPromises.readFile(
      join(__dirname, filename),
      'utf-8',
    );
    console.log(contents); 
    return contents;
  } catch (err) {
    console.log(err);
    return 'Something went wrong';
  }
}
async function asyncReadFile(filename: string) {
  try {
    const result = await fsPromises.readFile(
      join(__dirname, filename),
      'utf-8',
    );
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    return 'Something went wrong'
  }
}

export function GetPrice():any{
  var price;
  fetch(`https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false&precision=false`)
    .then((res) => res.json())
    .then((data) => {
        const json = JSON.stringify(data.solana.usd);
        price = parseFloat(json);
        asyncWriteFile("./SolanaCurrentPrice.txt", price);
    });
  price = asyncReadFile("./SolanaCurrentPrice.txt");
  return price;
}
