import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {useLocation} from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ArchiveIcon from '@mui/icons-material/Archive';
import Profile from '../../assets/2.jpg';
import { useEffect, useState } from 'react';
import Logo from "../../assets/logo-t.png";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { DotPulse } from "@uiball/loaders";

export default function CandidateProfile() {
  const [candidate, setCandidate] = useState({});
  const location = useLocation();
  const [candidateId, setcandidateId] = useState(location.state.candidateId);
  console.log(candidateId);
  const [open, setOpen] = React.useState(false);
  useEffect(async () => {
    try{
      let formData = new FormData();
          formData.append("candidateId",candidateId);
      let res;
    res = await axios.post(
      `http://localhost:5000/auth/getCandidateId`
      , formData, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  })
  if(res.data){
    setCandidate(res.data)
  }
}catch ( ex )
{
  console.log( ex );
}}, []);

  const drawerWidth = 240;

  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [response, setResponse] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex' }} className="bg-[#cfdae6] h-full ">
      <div className='absolute top-1/2 left-1/2 '>
        {loading ? <DotPulse size={40} color='black' /> : ""}
      </div>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar className="bg-gray-50 dark:bg-gray-900">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerClose}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <NavLink to="/">
            <img src={Logo} className="w-auto h-8" />
          </NavLink>

          <Box sx={{ flexGrow: 0, marginLeft: 'auto' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={Profile} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: '#1f2937'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon color="primary" /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Active Postings', 'Postings Archive'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton selected={index === 1 ? false : true}>
                <ListItemIcon>
                  {index % 2 === 0 ? <PersonSearchIcon sx={{ color: 'white' }} fontSize='medium' /> : <ArchiveIcon sx={{ color: 'white' }} fontSize='medium' />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ color: "white", fontSize: 'medium' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Main open={open} className="mt-12">
        {response.map((candidate) => (
          <div key={candidate.id} className="p-4 m-4 border border-gray-300 rounded-lg">
            <h1>{candidate.name}</h1>
            <p>Email: {candidate.email}</p>
            <p>Phone: {candidate.phone}</p>
            <p>Skills: {candidate.skills}</p>
            <p>Qualification: {candidate.qualification}</p>
            <p>Institutes: {candidate.institutes}</p>
          </div>
        ))}
      </Main>
    </Box>
  );
}
