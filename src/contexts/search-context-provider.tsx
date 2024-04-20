"use client";

import { createContext, useState } from "react";

type TSearchContext = {
  searchQuery: string;
  handleSearchQuery: (query: string) => void;
};

export const SearchContext = createContext<TSearchContext | null>(null);

type SearchContextProps = {
  children: React.ReactNode;
};

export default function SearchContextProvider({
  children,
}: SearchContextProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, handleSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
}
