import { SearchContext } from "@/contexts/search-context-provider";
import { useContext } from "react";

export function useSearchQuery() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      "useSearchQuery must be used within a SearchContextProvider"
    );
  }
  return context;
}
