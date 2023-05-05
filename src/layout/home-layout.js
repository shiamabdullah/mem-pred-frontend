// @flow strict
import cn from 'classnames';
import * as React from 'react';
import { useState } from 'react';
import Header from './header/header';
import LeftSidebar from './sidebar/left-sidebar';
import RightSidebar from './sidebar/right-sidebar';

function HomeLayout({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
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