import { Link, useLocation } from "react-router-dom";
import { HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { Book, GraduationCap, Library } from "lucide-react";
import { MdSell as Sell } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

import avatarImg from "../assets/avatar.png"
import navlogo from "../assets/navlogo.png"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
    {name: "Dashboard", href:"/user-dashboard"},
    {name: "Orders", href:"/orders"},
    {name: "Cart Page", href:"/cart"},
    {name: "Check Out", href:"/checkout"},
]

const menuItems = [
    {label: "ALL ITEMS", href:"/all-items", icon: <Book className="w-5 h-5" />},
    {label: "SELL", href:"/Sell", icon: <Sell className="w-5 h-5" />},
    {label: "STUDY MATERIALS", href:"/studymaterials", icon: <GraduationCap className="w-5 h-5" />},
    {label: "LIBRARY", href:"/library", icon: <Library className="w-5 h-5" />},
]

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const cartItems = useSelector(state => state.cart.cartItems);
    const {currentUser, logout} = useAuth()
    const location = useLocation();
    const isHomePage = location.pathname === '/' || location.pathname === '/home';
    
    const handleLogOut = () => {
        logout()
    }

    const handleNavigation = (href) => {
        window.location.href = href;
        setIsOpen(false);
    }

    // Enhanced scroll event listener
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            
            // Determine if we're scrolling up or down
            const isScrollingDown = currentScrollPos > prevScrollPos;
            
            // Update visibility based on scroll direction and position
            setIsVisible(!isScrollingDown || currentScrollPos < 10);
            setIsScrolled(currentScrollPos > 0);
            
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    const token = localStorage.getItem('token');
  
    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            isHomePage 
                ? isScrolled 
                    ? 'bg-black/95 backdrop-blur-md shadow-md' 
                    : 'bg-transparent'
                : 'bg-black/95 shadow-md'
        } ${!isVisible ? '-translate-y-full' : 'translate-y-0'}`}>
            <header className="max-w-screen-2xl mx-auto px-4 py-3 md:py-4">
                <div className={`flex justify-between items-center bg-transparent ${isOpen ? 'bg-black/95' : 'text-gray-800'}`}>
                    {/* left side */}
                    <div className="flex items-center">
                        <img 
                            src={navlogo}
                            alt="EcoScholar Logo" 
                            className="w-16 md:w-20 h-auto cursor-pointer hover:opacity-90 transition-opacity" 
                            onClick={() => window.location.href = '/'} 
                        />
                    </div>
                    <div className="flex items-center md:gap-16 gap-2">
                        {/* Theme Menu - Hidden on mobile */}
                        <div className="hidden md:flex items-center gap-8">
                            {menuItems.map((item) => (
                                <motion.button
                                    key={item.label}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleNavigation(item.href)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${isOpen ? 'text-gray-200 hover:text-green-500 hover:bg-gray-800' : 'text-gray-800 hover:text-green-500 hover:bg-gray-100'}`}
                                >
                                    {item.icon}
                                    {item.label}
                                </motion.button>
                            ))}
                        </div>

                        {/* search input - Collapsible on mobile */}
                        <div className="relative sm:w-72 w-full max-w-[160px]">
                            <IoSearchOutline className={`absolute inline-block left-3 inset-y-2 ${isOpen ? 'text-gray-400' : 'text-gray-600'}`} />
                            <input type="text" placeholder="Search"
                                className={`w-full py-2 md:py-1 pl-10 pr-4 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${isOpen ? 'bg-gray-900 text-white placeholder:text-gray-400' : 'bg-gray-100 text-gray-800 placeholder:text-gray-500'}`}
                            />
                        </div>
                    </div>

                    {/* right side */}
                    <div className="relative flex items-center space-x-2 md:space-x-3">
                        <div className="relative">
                            {
                                currentUser ? <>
                                <button 
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full"
                                >
                                    <img src={avatarImg} alt="" className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-green-500' : ''}`} />
                                </button>
                                {/* show dropdowns */}
                                {
                                    isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-gray-900 shadow-lg rounded-md z-40 border border-gray-700">
                                            <ul className="py-1">
                                                {
                                                    navigation.map((item) => (
                                                        <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                            <Link to={item.href} 
                                                                className="block px-4 py-3 text-sm bg-black/95 hover:bg-gray-800 hover:text-green-500 flex items-center gap-2 transition-colors"
                                                            >
                                                                {item.icon}
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                                <li>
                                                    <button
                                                    onClick={handleLogOut}
                                                    className="block w-full text-left px-4 py-3 text-sm text-gray-200 hover:bg-gray-800 hover:text-green-500 transition-colors">
                                                        Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                }
                                </> : token ? <Link to="/dashboard" className='border-b-2 border-white-500 text-green-500'>Dashboard</Link> : (
                                    <Link to="/login" className="p-2"> 
                                        <HiOutlineUser className={`size-6 ${isOpen ? 'text-gray-200 hover:text-green-500' : 'text-gray-800 hover:text-green-500'}`} />
                                    </Link>
                                )
                            }
                        </div>
                        
                        <button className="hidden sm:block p-2">
                            <HiOutlineHeart className={`size-6 ${isOpen ? 'text-gray-200 hover:text-green-500' : 'text-gray-800 hover:text-green-500'}`} />
                        </button>

                        <Link to="/cart" className="bg-green-600 hover:bg-green-700 p-2 sm:px-6 flex items-center rounded-md text-white transition-colors">
                            <HiOutlineShoppingCart className='size-5' />
                            {
                                cartItems.length > 0 ? <span className="text-sm font-semibold sm:ml-1">{cartItems.length}</span> : <span className="text-sm font-semibold sm:ml-1">0</span>
                            }
                        </Link>

                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                            aria-label="Toggle mobile menu"
                        >
                            <HiMiniBars3CenterLeft className={`size-6 ${isOpen ? 'text-green-500' : 'text-gray-800'}`} />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu - Enhanced */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden overflow-hidden backdrop-blur-md rounded-b-2xl"
                        >
                            <motion.div 
                                initial={{ y: -20 }}
                                animate={{ y: 0 }}
                                exit={{ y: -20 }}
                                className="px-2 py-4 space-y-2"
                            >
                                {menuItems.map((item, index) => (
                                    <motion.button
                                        key={item.label}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -20, opacity: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => handleNavigation(item.href)}
                                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-200 hover:text-green-500 hover:bg-gray-800/80 active:bg-gray-800 transition-all duration-200 font-bold text-left"
                                    >
                                        {item.icon}
                                        <span className="font-bold capitalize">{item.label}</span>
                                    </motion.button>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </nav>
    )
}

export default Navbar;