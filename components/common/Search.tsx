"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Models } from "node-appwrite";
import SearchFileCard from "./SearchFileCard";
import { usePathname, useSearchParams } from "next/navigation";

const SearchComponent = ({ files }: { files: Models.Document[] }) => {
  const [filteredFiles, setFilteredFiles] = useState<Models.Document[]>(files);
  const [query, setQuery] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const pathname = usePathname(); // Tracks current route changes
  const searchParams = useSearchParams();
  const stringParams = searchParams.toString();

  // Close dropdown on route change
  useEffect(() => {
    setFocused(false); // Close dropdown when the pathname or query changes
  }, [pathname, stringParams]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setFilteredFiles(files);
    } else {
      setFilteredFiles(
        files.filter((file) =>
          file.name.toLowerCase().includes(query.trim().toLowerCase())
        )
      );
    }
  }, [query, files]);

  return (
    <div className="relative">
      <Input
        placeholder="Search"
        className="px-10 rounded-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          // Check if blur is caused by clicking inside the dropdown
          const relatedTarget = e.relatedTarget as HTMLElement;
          if (relatedTarget?.closest("[data-dropdown]")) return;
          setFocused(false);
        }}
      />
      <Search
        className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
        size={18}
      />
      <div
        data-dropdown
        className={`absolute -bottom-[400px] left-4 bg-background dark:bg-brand-dark-kohly z-40 h-[400px] min-w-[200px] lg:min-w-[500px] overflow-y-scroll flex-col gap-4 p-4 ${
          focused ? "flex" : "hidden"
        }`}
      >
        {filteredFiles.length > 0 ? (
          filteredFiles.map((file) => (
            <SearchFileCard file={file} key={file.$id} />
          ))
        ) : (
          <p>No files found</p>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
