// @flow strict

import { Button } from '@mui/material';
import * as React from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function HeaderPopover({ setUser }) {
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className='px-3 w-48 py-6 flex flex-col gap-3 items-start text-base'>
      <Link
        to='/ez-gf-internal/jigyasa/profile'
        className='flex gap-3 items-center no-underline text-gray-500 hover:text-orange-600'>
        <BsPersonFill size={18} />
        View Profile
      </Link>
      <Link
        to='/ez-gf-internal/jigyasa/users'
        className='flex gap-3 items-center no-underline text-gray-500 hover:text-orange-600'>
        <FaUsers size={18} />
        User List
      </Link>
      <Button
        onClick={handleLogout}
        className='text-gray-500 hover:text-orange-600 hover:bg-white p-0 capitalize flex gap-3'>
        <FiLogOut size={18} />
        Logout
      </Button>
    </div>
  );
};

export default HeaderPopover;