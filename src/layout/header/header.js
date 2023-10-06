import { Button, Tooltip } from '@mui/material';
import * as React from 'react';
import { FiLogOut } from 'react-icons/fi';

function Header({ user, setUser }) {

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <header
      className='h-[10vh] relative w-full z-40 px-5 
      md:px-8 flex items-center justify-between'
    >
      <div
        className='relative flex items-center h-12 w-40 
        overflow-hidden md:w-44 md:h-14 shrink-0'>
        <img
          className='logo_image h-10'
          src="./gf-logo.png"
          alt="Global Foundries"
        />
      </div>
      <div className={"w-max sm:w-56 h-12 md:h-14 flex items-center gap-2"}>
        <div
          className="w-9 h-9 relative flex items-center 
            justify-center rounded-full border border-[#FF5C01] text-[#FF5C01]">
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 15.6 19.6'
            className='w-4 h-4 '>
            <path
              id='Path_11'
              data-name='Path 11'
              d='M16,7a4,4,0,1,1-4-4A4,4,0,0,1,16,7Zm-4,7a7,7,0,0,0-7,7H19a7,7,0,0,0-7-7Z'
              transform='translate(-4.2 -2.2)'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.6'
            />
          </svg>
        </div>
        <span className="hidden sm:block font-medium text-gray-600">
          {user?.name}
        </span>
        <Tooltip title="Logout account">
          <Button
            onClick={handleLogout}
            className='min-w-fit text-orange-700 ml-2'>
            <FiLogOut size={18} />
          </Button>
        </Tooltip>
      </div>
    </header >
  );
};

export default Header;