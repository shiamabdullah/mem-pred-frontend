import { Button, Popover } from '@mui/material';
import * as React from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import HeaderPopover from './header-popover';

function Header({ user, setUser }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
        <Button
          onClick={handleClick}
          aria-describedby={id}
          className="min-w-fit rounded-full p-1 border border-solid border-[#FF5C01]">
          <BsFillPersonFill className='text-[#FF5C01]' size={20} />
        </Button>
        <span className="hidden sm:block font-medium text-gray-600">
          {user?.name}
        </span>

      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{ marginTop: 1 }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <HeaderPopover
          setUser={setUser}
        />
      </Popover>
    </header >
  );
};

export default Header;