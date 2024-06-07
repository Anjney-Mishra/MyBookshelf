import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center bg-black p-4'>
        <Link to="/" className='text-white font-bold'>Personal Bookshelf</Link>
        <Link to="/personalbookshelf" className='bg-white p-2 font-bold rounded-lg hover:bg-slate-200'>My Bookshelf</Link>
    </div>
  )
}

export default Navbar