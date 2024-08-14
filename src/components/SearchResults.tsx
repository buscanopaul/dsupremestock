import StockContext from "@/context/StockContext";
import { StockContextType } from "@/types/stock";
import { useContext } from "react";

interface SearchResult {
  symbol: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  clear: () => void;
}

export default function SearchResults({ results, clear }: SearchResultsProps) {
  const { setStockSymbol } = useContext(StockContext) as StockContextType;

  return (
    <ul className="absolute top-12 border-2 w-full rounded-lg h-64 overflow-y-scroll bg-black border-gray-700">
      {results.map((result) => (
        <li
          key={result.symbol}
          className="cursor-pointer p-4 m-2 flex items-center justify-between rounded-lg hover:bg-white hover:text-black transition ease-in-out"
          onClick={() => {
            setStockSymbol(result.symbol);
            clear();
          }}
        >
          <span>{result.symbol}</span>
        </li>
      ))}
    </ul>
  );
}
