// @flow strict
import cn from 'classnames';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header/header';
import LeftSidebar from './sidebar/left-sidebar';
import RightSidebar from './sidebar/right-sidebar';

function HomeLayout({ children }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    if (!user){
       return navigate("/ez-gf-internal/jigyasa/login");
    }
 },[user]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header user={user} setUser={setUser} />
      <div className="w-full gap-4 2xl:gap-8 h-[90vh] flex justify-between overflow-y-auto">
        <div className={cn(open ? "w-2/12" : "w-[80px]")}>
          <LeftSidebar />
        </div>
        <div className={cn("h-fit bg-white shadow-md p-4 rounded-lg overflow-y-auto max-h-[100%]", open ? "w-8/12" : "w-[calc(84%_+_80px)] ")}>
          {children}
        </div>
        <div className="w-2/12 overflow-y-auto overflow-x-hidden">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;

// w-[calc(100%_-_10rem)]