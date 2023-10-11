// @flow strict

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import * as React from 'react';
import HomeLayout from '../layout/home-layout';
import { authUsers } from '../utils/data/users';

function Users() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <HomeLayout>
      <div className="px-6 pb-10">
        <h1>User List</h1>
        {
          user.role.toLowerCase() !== 'admin' ?
            <p className='text-lg font-medium text-red-500'>You are not authorized to access this page.</p>
            :
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className='text-left font-semibold text-base'>ID</TableCell>
                    <TableCell className='text-left font-semibold text-base'>Name</TableCell>
                    <TableCell className='text-left font-semibold text-base'>Email</TableCell>
                    <TableCell className='text-left font-semibold text-base'>Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    authUsers.map((user) => (
                      <TableRow
                        key={user.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>{user.id}</TableCell>
                        <TableCell align="left">{user.name}</TableCell>
                        <TableCell align="left">{user.email}</TableCell>
                        <TableCell align="left">{user.role}</TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
        }
      </div>
    </HomeLayout>
  );
};

export default Users;