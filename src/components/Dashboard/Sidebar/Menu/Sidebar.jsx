
import { useState } from 'react';
import { GrLogout } from 'react-icons/gr';
import { FcSettings } from 'react-icons/fc';
import { AiOutlineBars } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import logo from '/logo.jpg';
import MenuItem from './MenuItem';
import AgentMenu from './AgentMenu';
import AdminMenu from './AdminMenu';
import CustomerMenu from './CustomerMenu';
import useAuth from '../../../../hooks/useAuth';
import useRole from '../../../../hooks/useRole';

const Sidebar = () => {
  const { logOut } = useAuth();
  const [role] = useRole();
  const [isActive, setActive] = useState(false);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div className="p-4 font-bold">
          <Link to="/">
            <img src={logo} alt="logo" width="50" height="50" />
          </Link>
        </div>
        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between bg-gray-100 lg:w-64 w-full md:w-64 space-y-6 px-4 py-4 absolute inset-y-0 left-0 transform ${isActive ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <div>
          {/* Logo Section */}
          <div className="w-full flex justify-center items-center bg-lime-100 px-4 py-2 shadow-md rounded-lg">
            <Link to="/">
              <img src={logo} alt="logo" width="80" height="80" />
            </Link>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              {/* Dynamic Menu Items Based on Role */}
              {role === 'customer' && <CustomerMenu />}
              {role === 'agent' && <AgentMenu />}
              {role === 'admin' && <AdminMenu />}
            </nav>
          </div>
        </div>

        {/* Logout Section */}
        <div>
          <hr />
          <MenuItem
            icon={FcSettings}
            label="Profile"
            address="/dashboard/profile"
          />
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
