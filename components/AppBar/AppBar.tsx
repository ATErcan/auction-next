'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import { nanoid } from 'nanoid'
import Link from 'next/link';
import { logout } from '../auth/getUser';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../auth/AuthContext';
import LoggedInAppBar from './LoggedInAppBar';
import NotLoggedInAppBar from './NotLoggedInAppBar';

// const pages = ['Auctions', 'Login', 'Register'];
// const settings = ['Profile', 'Items', 'Logout'];

const pages = [
  {
    id: nanoid(),
    name: "Auctions",
    url: "/auctions"
  },
  {
    id: nanoid(),
    name: "Login",
    url: "/login"
  },
  {
    id: nanoid(),
    name: "Register",
    url: "/register"
  }
]

const settings = [
  {
    id: nanoid(),
    name: "Profile",
    url: "/profile"
  },
  {
    id: nanoid(),
    name: "Items",
    url: "/items"
  },
  {
    id: nanoid(),
    name: "Logout",
    url: "#"
  }
]

function ResponsiveAppBar() {
  const { user } = React.useContext(AuthContext);

  if(user) {
    return <LoggedInAppBar />
  } else {
    return <NotLoggedInAppBar />
  }
}
export default ResponsiveAppBar;