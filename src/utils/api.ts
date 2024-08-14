import { useQuery } from "@tanstack/react-query";

const fetchData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`An error has occurred: ${response.status}`);
  }
  return response.json();
};

export const useSearchSymbols = (query: string) => {
  return useQuery({
    queryKey: ["searchSymbols", query],
    queryFn: () =>
      fetchData(
        `${process.env.NEXT_PUBLIC_BASE_PATH}/search?q=${query}&token=${process.env.NEXT_PUBLIC_FINHUB_API}`
      ),
    enabled: !!query,
  });
};

export const useStockDetails = (stockSymbol: string) => {
  return useQuery({
    queryKey: ["stockDetails", stockSymbol],
    queryFn: () =>
      fetchData(
        `${process.env.NEXT_PUBLIC_BASE_PATH}/stock/profile2?symbol=${stockSymbol}&token=${process.env.NEXT_PUBLIC_FINHUB_API}`
      ),
    enabled: !!stockSymbol,
  });
};

export const useQuote = (stockSymbol: string) => {
  return useQuery({
    queryKey: ["quote", stockSymbol],
    queryFn: () =>
      fetchData(
        `${process.env.NEXT_PUBLIC_BASE_PATH}/quote?symbol=${stockSymbol}&token=${process.env.NEXT_PUBLIC_FINHUB_API}`
      ),
    enabled: !!stockSymbol,
  });
};

export const useHistoricalData = (stockSymbol: string) => {
  return useQuery({
    queryKey: ["historicalData", stockSymbol],
    queryFn: () => {
      const currentDate = new Date();
      const toTimeStamp = Math.floor(currentDate.getTime() / 1000);
      const daysBack = 1;
      const fromTimeStamp = Math.floor(
        currentDate.setDate(currentDate.getDate() - daysBack) / 1000
      );
      return fetchData(
        `${process.env.NEXT_PUBLIC_BASE_PATH}/stock/candle?symbol=${stockSymbol}&resolution=1D&from=${fromTimeStamp}&to=${toTimeStamp}&token=${process.env.NEXT_PUBLIC_FINHUB_API}`
      );
    },
    enabled: !!stockSymbol,
  });
};
