import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBars, faXmark, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [sreach, setSreach] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    if (!sreach.trim()) return

    navigate(`/products?title=${sreach}`)
    setSreach('')
  }

  return (
    <header className="relative">
      <div className="flex justify-between items-center w-full bg-linear-to-r from-[#0b4d43] to-[#0a3d35] px-6 py-4 shadow-lg">

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white text-2xl p-2"
          >
            <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <div className="bg-emerald-500 w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="text-white font-black">S</span>
            </div>
            <span className="text-white font-bold text-2xl">
              STARK<span className="text-emerald-500">SHOP</span>
            </span>
          </Link>
        </div>

        <div className="flex-1 flex justify-center mx-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search for anything..."
              className="w-full h-12 rounded-full bg-white/10 px-5 pr-12 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              value={sreach}
              onChange={(e) => setSreach(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />

            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-white/70"
              onClick={handleSearch}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative text-white text-xl hover:text-emerald-500 transition-all duration-200">
            <FontAwesomeIcon icon={faCartShopping} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hover:scale-110 transition-all duration-200">
              0
            </span>
          </Link>

          <Link to="/favorites" className="relative text-white text-xl hover:text-red-500 transition-all duration-200">
            <FontAwesomeIcon icon={faHeart} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hover:scale-110 transition-all duration-200">
              0
            </span>

          </Link>
          <Link to="/login" className="text-white px-4">Login</Link>
          <Link to="/signup" className="bg-emerald-500 text-white px-5 py-2 rounded-full">
            Sign Up
          </Link>
        </div>
      </div>
      <nav
        className={`absolute top-full left-0 w-full bg-linear-to-b from-[#0a3d35] to-[#083028] shadow-xl overflow-hidden transition-all duration-300 ease-in-out z-50 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <ul className='flex flex-col py-4'>
          <li>
            <Link
              to='/'
              className='block px-8 py-3 text-white text-lg hover:bg-white/10 hover:text-emerald-300 transition-all duration-200'
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/about'
              className='block px-8 py-3 text-white text-lg hover:bg-white/10 hover:text-emerald-300 transition-all duration-200'
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to='/contact'
              className='block px-8 py-3 text-white text-lg hover:bg-white/10 hover:text-emerald-300 transition-all duration-200'
              onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </li>
          <li>
            <Link
              to='/services'
              className='block px-8 py-3 text-white text-lg hover:bg-white/10 hover:text-emerald-300 transition-all duration-200'
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to='/products'
              className='block px-8 py-3 text-white text-lg hover:bg-white/10 hover:text-emerald-300 transition-all duration-200'
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header