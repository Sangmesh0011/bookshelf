import React, { useState, useEffect } from "react";
import Book from "./Book";
import { Link } from "react-router-dom";

const Bookshelf = ({ title, edition }) => {
  const [shelfBooks, setShelfBooks] = useState([]);
  const booksShelfArray = [];
  console.log("ls length", localStorage.length);
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    const finalVal = JSON.parse(value);
    booksShelfArray.push({ key, finalVal });
    console.log("loop ran ", booksShelfArray[i]);
  }

  useEffect(() => {
    setShelfBooks(booksShelfArray);
  }, []);

  console.log("aRRAY", shelfBooks);
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl mt-12">MY BOOKSHELF</h1>
      <Link to={"/"}>Back To Home</Link>
      <div className="h-full w-[100vw] gap-1 md:gap-10 px-2 md:px-24 py-6 flex justify-center items-center flex-wrap">
        {shelfBooks.map((book) => (
          <Book
            key={book.key}
            id={book.key}
            title={book.finalVal[0]}
            author={book.finalVal[1]}
            edition={book.finalVal[2]}
            inShelf={true}
            onAdd={""}
          />
        ))}
      </div>
    </div>
  );
};

export default Bookshelf;
