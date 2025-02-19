import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BsSun, BsMoon } from "react-icons/bs"; // Import Sun & Moon Icons
import avatarImg from "../../assets/images/placeholder.jpg";
import logo from "/logo.jpg";
import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../providers/ThemeProvider"; 
const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme(); 
    
    const toggleDarkMode = () => {
        setTheme(theme === "dark" ? "light" : "dark"); 
    };

    return (
        <div className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white sticky top-0 z-10 shadow-sm mb-5">
            <div className="py-4 border-b-[1px] dark:border-gray-700">
                <div className="flex flex-row items-center justify-between gap-3 md:gap-0 max-w-[1280px] mx-auto">
                    {/* Logo */}
                    <div className="flex items-center gap-1">
                        <Link to="/">
                            <img src={logo} alt="logo" width="100" height="100" />
                        </Link>
                        <h1 className="text-3xl font-bold">DreamHouzing</h1>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex justify-center items-center">
                        <NavLink
                            to="/"
                            className="hidden lg:block px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 transition font-bold"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/all-properties"
                            className="hidden lg:block px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 transition font-bold"
                        >
                            All Properties
                        </NavLink>
                        <NavLink
                            to="/about"
                            className="hidden lg:block px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 transition font-bold"
                        >
                            About Us
                        </NavLink>
                    </div>

                    {/* Dark Mode Toggle + Dropdown Menu */}
                    <div className="relative flex items-center gap-4">
                        {/* Dark Mode Toggle Button */}
                        <button
                            onClick={toggleDarkMode} // Use the toggle function here
                            className="p-2 rounded-full transition bg-gray-200 dark:bg-gray-700"
                        >
                            {theme === "dark" ? (
                                <BsSun className="text-yellow-400" />
                            ) : (
                                <BsMoon className="text-gray-900 dark:text-white" />
                            )}
                        </button>

                        {/* Dropdown Button */}
                        <div
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 dark:border-gray-600 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                        >
                            <AiOutlineMenu className="dark:text-white" />
                            <div className="hidden md:block">
                                {/* Avatar */}
                                <img
                                    className="rounded-full"
                                    referrerPolicy="no-referrer"
                                    src={user && user.photoURL ? user.photoURL : avatarImg}
                                    alt="profile"
                                    height="30"
                                    width="30"
                                />
                            </div>
                        </div>

                        {/* Dropdown Menu */}
                        {isOpen && (
                            <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white dark:bg-gray-800 dark:text-white overflow-hidden right-0 top-12 text-sm">
                                <div className="flex flex-col cursor-pointer">
                                    <Link
                                        to="/"
                                        className="block md:hidden px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 transition font-semibold"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        to="/all-properties"
                                        className="block md:hidden px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 transition font-semibold"
                                    >
                                        All Properties
                                    </Link>

                                    {user ? (
                                        <>
                                            <Link
                                                to="/dashboard"
                                                className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 transition font-semibold"
                                            >
                                                Dashboard
                                            </Link>
                                            <div
                                                onClick={logOut}
                                                className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 transition font-semibold cursor-pointer"
                                            >
                                                Logout
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/login"
                                                className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 transition font-semibold"
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                to="/signup"
                                                className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 transition font-semibold"
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
            </div>
        </div>
    );
};

export default Navbar;
