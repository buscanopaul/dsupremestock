"use client";

import StockContext from "@/context/StockContext";
import React, { useState } from "react";

export default function StockProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [stockSymbol, setStockSymbol] = useState<string>("AMZN");

  return (
    <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
      {children}
    </StockContext.Provider>
  );
}
