"use client";
import { Book, fetchBooks } from "@/api/fetchBooks";
import React from "react";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

const SearchSection: React.FC = () => {
  const [books, setBooks] = React.useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [debounceQuery, setDebounceQuery] = React.useState("");

  React.useEffect(() => {
    const searchTimer = setTimeout(() => setDebounceQuery(searchQuery), 400);

    return () => clearTimeout(searchTimer);
  }, [searchQuery]);

  React.useEffect(() => {
    if (!Boolean(debounceQuery)) {
      return setBooks([]);
    }

    const fetchBooksData = async () => {
      try {
        const booksData = await fetchBooks(debounceQuery);
        setBooks(booksData.documents);
      } catch (error) {
        // Handle error here, e.g. show an error message
        console.error("Error fetching books:", error);
      }
    };

    fetchBooksData();
  }, [debounceQuery]);

  return (
    <div>
      <input onChange={(e) => setSearchQuery(e.target.value)} />

      {books?.map((book) => (
        <div key={book.isbn}>{book.title}</div>
      ))}
    </div>
  );
};

export default SearchSection;
