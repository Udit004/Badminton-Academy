import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const navLinks = [
    ['Home', '/'],
    ['About', '/about'],
    ['Programs', '/programs'],
    ['Coaches', '/coaches'],
    ['Schedule', '/schedule'],
    ['Contact', '/contact']
  ]
  return (
    <nav className='bg-black/30 backdrop-blur-sm sticky top-0 z-50 shadow-lg'>
        <div className='container mx-auto px-4 '>
            <div className='flex items-center justify-between h-20'>
                <Link to='/' className='flex items-center space-x-3 text-white text-xl font-bold hover:scale-105 transition-transform duration-200'>
                <img className='h-14 w-14 rounded-full object-cover border-2 border-purple-400' src="./images/logo.jpg" alt="logo" />
                   <span className=' text-white hover:scale-105 bg-gradient-to-r from-white to-purple-400 bg-clip-text hover:text-transparent transition-all duration-50'>Badminton Academy</span> 
                </Link>
                {/* desktop navigation */}
                <div className='hidden md:flex items-center space-x-6'>
                    {[
                        ['Home','/'],['About','/about'],['Programs','/programs'],['coaches','/coaches'],['Schedule','/schedule'],['Contact','/contact']
                    
                    ].map(([title,url]) => (<Link key={title} to={url} className='text-white hover:text-purple-400 transition-color duration-200 relative group'>{title} <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-200' ></span></Link>
                ))}
                    {/* <Link to='/' className='text-white hover:text-purple-400'>Home</Link> */}
                </div>

                {/* hamburger button  */}
                <button 
            onClick={() => setIsOpen(!isOpen)}
            className='md:hidden text-white focus:outline-none'
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
            </div>
            {/* Mobile Navigation */}
        {isOpen && (
          <div className='md:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {navLinks.map(([title, url]) => (
                <Link
                  key={title}
                  to={url}
                  className='text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-500/20'
                  onClick={() => setIsOpen(false)}
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>
        )}
        </div>
    </nav>
  )
}

export default Navbar