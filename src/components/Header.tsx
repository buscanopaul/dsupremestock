"use client";

import StockContext from "@/context/StockContext";
import useFormattedPercentage from "@/hooks/useFormattedPercentage";
import { StockContextType } from "@/types/stock";
import { useQuote, useStockDetails } from "@/utils/api";
import Image from "next/image";
import { useContext } from "react";
import Search from "./Search";

export default function Header() {
  const { stockSymbol } = useContext(StockContext) as StockContextType;

  const { data: stockDetails, isLoading: isLoadingDetails } =
    useStockDetails(stockSymbol);
  const { data: quote, isLoading: isLoadingQuote } = useQuote(stockSymbol);

  const formattedPercentage = useFormattedPercentage(quote?.dp);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        {!isLoadingDetails && stockDetails?.logo && (
          <Image
            src={stockDetails.logo}
            width={80}
            height={80}
            alt="Stock"
            className="rounded-full bg-red-500"
          />
        )}
        <div className="h-5 md:h-0" />
        <Search />
      </div>
      <div className="h-7" />
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <h1 className="font-bold text-3xl">
          {stockDetails?.name || "Loading..."}
        </h1>
        <h1 className="text-3xl">${quote?.pc || "Loading..."}</h1>
      </div>
      <div className="h-4" />
      <div className="flex items-center justify-between">
        <div className="flex gap-1 items-center">
          <h2>{stockDetails?.ticker || "Loading..."}</h2>
          <h2 className="text-gray-500">Symbol</h2>
        </div>
        {!isLoadingQuote && quote && (
          <h2 className={`${quote.d >= 0 ? "text-green-500" : "text-red-500"}`}>
            {quote.d >= 0 ? `+${quote.d}` : `${quote.d}`} ({formattedPercentage}
            )
          </h2>
        )}
      </div>
    </div>
  );
}
