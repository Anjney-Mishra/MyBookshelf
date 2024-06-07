import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import toast from 'react-hot-toast';

const PersonalBookshelf = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  
  const removeFromBookshelf = (book) => {
    const updatedBookshelf = bookshelf.filter((b) => b.key !== book.key);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
    setBookshelf(updatedBookshelf);
    toast.success(`Removed ${book.title} from bookshelf`)
  };

  return (
    
    <div>
        <Navbar/>
        <div className="flex justify-center mt-4">
        {
          bookshelf.length>0 ?
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {
              bookshelf.map((book)=>(
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
                  <button
                    onClick={() => removeFromBookshelf(book)}
                    className="bg-red-800 w-full text-white p-3 rounded-md"
                  >
                    Remove From Bookshelf
                  </button>
              </div>
              ))
            }
          </div>
          :
          <h1 className='font-bold text-2xl'>No Books In Bookshelf, Please Add Books To Bookshelf</h1>
        }
        </div>
    </div>
  )
}

export default PersonalBookshelf