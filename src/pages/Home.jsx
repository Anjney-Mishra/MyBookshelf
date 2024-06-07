import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useDebounce } from "../Hooks/CustomHooks";
import SkeletonCard from "../components/SkeletonCard";
import toast from "react-hot-toast";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [load, setLoad] = useState(false);
  const [bookname, setBookName] = useState("");
  const debouncedSearch = useDebounce(bookname, 500);
  const [bookshelf, setBookshelf] = useState([]);

  //Search Section

  const loadBooks = async() => {
    if (debouncedSearch) {
      setLoad(true);
      try {
        const resBooks = await axios.get(
          `https://openlibrary.org/search.json?q=${debouncedSearch}&limit=10&page=1`
        );
        setBooks(resBooks.data.docs);
        setLoad(false)
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
  };

  useEffect(() => {
    loadBooks();
  }, [debouncedSearch]);


  //LocalStorage Section

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    setBookshelf(storedBookshelf);
  }, []);

  const addToBookshelf = (book) => {
    const updatedBookshelf = [...bookshelf, book];
    localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
    setBookshelf(updatedBookshelf);
    toast.success(`Added ${book.title} to bookshelf`);
  };

  const removeFromBookshelf = (book) => {
    const updatedBookshelf = bookshelf.filter((b) => b.key !== book.key);
    localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
    setBookshelf(updatedBookshelf);
    toast.success(`Removed ${book.title} from bookshelf`);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-4 flex-1">
        <h1 className="font-bold text-4xl mb-4">Search Book Here</h1>
        <input
          type="text"
          name="search"
          className="p-2 text-xl rounded-md w-full md:w-1/3 border border-gray-700"
          placeholder="Search Book Of Your Choice"
          onChange={(e) => setBookName(e.target.value)}
          value={bookname}
        />
      </div>
      <div className="flex justify-center mt-4">
        {load ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {books?.map((book) => {
              const isBookPresent = bookshelf.some((b) => b.key === book.key);
              return (
                <div
                  key={book.key}
                  className="bg-white p-4 rounded-lg shadow-md w-64"
                >
                  {book.cover_edition_key && (
                    <div className="flex-1">
                      <img
                        src={`https://covers.openlibrary.org/b/OLID/${book.cover_edition_key}-M.jpg`}
                        alt={book.title}
                        className="w-full h-[54vh] object-cover mb-4 rounded-lg"
                      />
                    </div>
                  )}
                  <div className="h-16 overflow-hidden">
                    <h2 className="text-lg font-semibold mb-1">{book.title}</h2>
                  </div>
                  <div className="h-12 overflow-hidden">
                    <h3 className="text-sm text-gray-700">
                      {book.author_name?.join(", ")}
                    </h3>
                  </div>
                  {isBookPresent ? (
                    <button
                      onClick={() => removeFromBookshelf(book)}
                      className="bg-red-800 w-full text-white p-3 rounded-md"
                    >
                      Remove From Bookshelf
                    </button>
                  ) : (
                    <button
                      onClick={() => addToBookshelf(book)}
                      className="bg-green-800 w-full text-white p-3 rounded-md"
                    >
                      Add To Bookshelf
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
