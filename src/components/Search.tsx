"use client";

import { useSearchSymbols } from "@/utils/api";
import { useCallback, useState } from "react";
import { MdClose, MdSearch } from "react-icons/md";
import SearchResults from "./SearchResults";

export default function Search() {
  const [input, setInput] = useState("");

  const { data: searchResults, isLoading, isError } = useSearchSymbols(input);

  const bestMatches = searchResults?.result || [];

  const clear = useCallback(() => {
    setInput("");
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex items-center">
      <div className="relative flex-grow">
        <input
          type="text"
          name="search"
          value={input}
          onChange={handleInputChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-full bg-black transition ease-in-out"
          placeholder="Search..."
        />
        <MdSearch
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={24}
        />
        {input && (
          <button onClick={clear}>
            <MdClose
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={24}
            />
          </button>
        )}

        {input && bestMatches.length > 0 ? (
          <SearchResults results={bestMatches} clear={clear} />
        ) : null}

        {input && bestMatches.length === 0 && (
          <div className="absolute top-12 border-2 w-full rounded-lg h-20 bg-black border-gray-700 items-center justify-center flex">
            <p>
              {isError
                ? "No results found"
                : isLoading
                ? "Loading..."
                : "No results found"}
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
