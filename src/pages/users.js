// @flow strict

import * as React from 'react';
import UsersList from '../components/users/users';
import HomeLayout from '../layout/home-layout';

function Users() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <HomeLayout>
      <div className="px-6 pb-10">
        {
          user?.role.toLowerCase() !== 'admin' ?
            <p className='text-lg font-medium text-red-500'>You are not authorized to access this page.</p>
            :
            <UsersList />
        }
      </div>
    </HomeLayout>
  );
};

export default Users;