import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMagnifyingGlass,
    faBars,
    faXmark,
    faHeart,
    faCartShopping
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [categories, setCategories] = useState([])
    const [search, setSearch] = useState("")

    const navigate = useNavigate()

    const handleSearch = () => {
        if (!search.trim()) return
        navigate(`/products?search=${search}`)
        setSearch("")
    }

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev)
    }

    useEffect(() => {
        axios.get('https://api.escuelajs.co/api/v1/categories')
            .then(res => setCategories(res.data))
            .catch(err => {
                console.error('Error fetching categories:', err);
                setCategories([]);
            })
    }, [])

    return (
        <header className='sticky top-0 z-50'>
            <div className='flex justify-between items-center w-full bg-[#062c26] px-6 py-4 shadow-2xl border-b border-emerald-900/30'>
                <div className='flex items-center gap-6'>
                    <button
                        onClick={toggleMenu}
                        className='text-emerald-400 text-2xl hover:bg-white/5 p-2 rounded-lg'
                    >
                        <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
                    </button>

                    <Link to='/' className='flex items-center gap-2'>
                        <div className='bg-emerald-500 w-8 h-8 rounded-lg flex items-center justify-center'>
                            <span className='text-white font-black'>A</span>
                        </div>
                        <span className='text-white font-bold text-2xl'>
                            AON<span className='text-emerald-500'>SHOP</span>
                        </span>
                    </Link>
                </div>

                <div className='hidden md:flex flex-1 justify-center max-w-2xl mx-12'>
                    <div className='relative w-full'>
                        <input
                            type="text"
                            placeholder="Search premium products..."
                            className="w-full h-11 rounded-xl bg-[#0a3d35] text-white px-5 pr-12"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        />

                        <div
                            onClick={handleSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center cursor-pointer hover:bg-emerald-400"
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white text-sm" />
                        </div>
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                    <Link to='/favorites' className='p-3 text-emerald-100/70 hover:text-red-400'>
                        <FontAwesomeIcon icon={faHeart} />
                    </Link>

                    <Link to='/cart' className='p-3 text-emerald-100/70 hover:text-emerald-400'>
                        <FontAwesomeIcon icon={faCartShopping} />
                    </Link>

                    <Link to='/login' className='hidden md:block text-emerald-100'>
                        Log In
                    </Link>

                    <Link
                        to='/signup'
                        className='px-6 py-2 bg-emerald-500 text-[#062c26] font-bold rounded-xl'
                    >
                        Sign Up
                    </Link>
                </div>
            </div>

            <nav
                className={`absolute top-full left-0 w-full bg-[#062c26]/95 transition-all duration-500 ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <ul className='flex flex-col max-h-[400px] overflow-y-auto'>
                    {categories.map(category => (
                        <li key={category.id}>
                            <Link
                                to={`/Products?category=${category.id}`}
                                className='block px-8 py-3 text-white hover:bg-white/10'
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}
export default Header