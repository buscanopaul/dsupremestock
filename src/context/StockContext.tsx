import { StockContextType } from "@/types/stock";
import { createContext } from "react";

const StockContext = createContext<StockContextType | undefined>(undefined);

export default StockContext;
