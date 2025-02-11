
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import avatarImg from '../../assets/images/placeholder.jpg'
import logo from '/logo.jpg'
import useAuth from '../../hooks/useAuth'
const Navbar = () => {
    const { user, logOut } = useAuth()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className=' w-full bg-white  shadow-sm mb-5'>
            <div className='py-4 border-b-[1px]'>
                <div className='flex flex-row  items-center justify-between gap-3 md:gap-0'>
                    {/* Logo */}
                    <div className='flex items-center gap-1 '>
                        <Link >
                            <img src={logo} alt='logo' width='100' height='100' />
                        </Link>
                        <h1 className='text-3xl font-bold'>DreamHouzing</h1>

                    </div>
                    <div className=' flex justify-center items-center '>
                        <NavLink
                            to='/'
                            className='hidden lg:block  px-4 py-3 hover:bg-neutral-100 transition font-bold'
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to='/all-properties'
                            className='hidden lg:block  px-4 py-3 hover:bg-neutral-100 transition font-bold'
                        >
                            All Properties
                        </NavLink>
                    </div>
                    {/* Dropdown Menu */}
                    <div className='relative'>
                        <div className='flex flex-row items-center gap-3'>
                            {/* Dropdown btn */}
                            <div
                                onClick={() => setIsOpen(!isOpen)}
                                className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                            >
                                <AiOutlineMenu />
                                <div className='hidden md:block'>
                                    {/* Avatar */}
                                    <img
                                        className='rounded-full'
                                        referrerPolicy='no-referrer'
                                        src={user && user.photoURL ? user.photoURL : avatarImg}
                                        alt='profile'
                                        height='30'
                                        width='30'
                                    />
                                </div>
                            </div>
                        </div>
                        {isOpen && (
                            <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                                <div className='flex flex-col cursor-pointer'>
                                    <Link
                                        to='/'
                                        className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        to='/all-properties'
                                        className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                    >
                                        All Properties
                                    </Link>

                                    {user ? (
                                        <>
                                            <Link
                                                to='/dashboard'
                                                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                            >
                                                Dashboard
                                            </Link>
                                            <div
                                                onClick={logOut}
                                                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                                            >
                                                Logout
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to='/login'
                                                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                to='/signup'
                                                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                            >
                                                Sign Up
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* </Container> */}
            </div>
        </div>
    )
}

export default Navbar