import { useState, useEffect } from "react";
import Book from "./Book.jsx";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [books, setBooks] = useState([]);
  const [searchedValue, setSearchedValue] = useState("");
  const [loading, SetLoading] = useState(true);

  console.log(searchedValue);

  useEffect(() => {
    SetLoading(true);
    const fetchData=async()=>{
      await fetch(
        `https://openlibrary.org/search.json?q=${searchedValue}&limit=10&page=1`
      )
        .then((dataRes) => {
          return dataRes.json();
        })
        .then((data) => {
          let actualBooks = data.docs;
          setBooks(actualBooks);
          SetLoading(false);
          console.log(books);
        });
    }
    fetchData()
  }, [searchedValue]);

  function handleLocalAdd(id, title, author, edition) {
    localStorage.setItem(id, JSON.stringify([title, author, edition]));
    toast("BOOK ADDED TO BOOKSHELF!")
  }

  return (
    <div className="w-full flex flex-col justify-center align-middle">
      {/* header */}
      <ToastContainer />
      <div className="flex flex-col md:flex-row justify-evenly w-[100%] h-36 md:h-16 p-2 px-6 mt-8 mb-8">
        <input
          type="text"
          placeholder="Search for books"
          value={searchedValue}
          onChange={(e) => setSearchedValue(e.target.value)}
          className="w-full md:w-2/6 p-3 border-2"
        />
        <Link
          to="/shelf"
          className="h-16 md:h-auto md:px-6 mt-6 md:mt-0 bg-cyan-500 text-white hover:bg-cyan-300 flex justify-center hover:text-black text-center items-center"
        >
          Bookshelf
        </Link>
      </div>

      {
        // Actual Searching in data unless api searching done here
        /* .filter((book)=>{
          return searchedValue.toLowerCase()===''?book:book.title.toLowerCase().includes(searchedValue)
        }) */
      }

      {/* Loader */}
      <div className="w-full flex flex-col justify-center items-center">
        <ClipLoader
          color={"#65aab1"}
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        {books.length === 0 ? (
          <p>Please search for books from the search bar</p>
        ) : null}
      </div>

      {/* Main Container for books */}
      <div className="h-full w-[100vw] gap-1 md:gap-10 px-2 md:px-24 py-6 flex justify-center items-center flex-wrap">
        {books.map((book, index) => (
          <Book
            key={book.cover_i}
            id={book.cover_i}
            title={book.title}
            author={book.author_name}
            edition={book.edition_count}
            inShelf={false}
            onAdd={handleLocalAdd}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
