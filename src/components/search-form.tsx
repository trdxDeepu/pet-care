"use client";


import { useSearchQuery } from "@/hooks/use-search-context";
import React, { useState } from "react";

export default function SearchForm() {
  const { searchQuery, handleSearchQuery } = useSearchQuery();

  return (
    <form className="w-full h-full">
      <input
        type="search"
        className="w-full h-full bg-white/20 rounded-md outline-none 
        transition focus:bg-white/50 hover:bg-white/30 
        placeholder-white/50 px-5 py-3    
        "
        value={searchQuery}
        placeholder="search pets"
        onChange={(e) => handleSearchQuery(e.target.value)}
        spellCheck="false"
      />
    </form>
  );
}
