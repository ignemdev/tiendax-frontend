import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import NavbarMenu from './NavbarMenu';

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <NavbarMenu />
                    <Button color="inherit" href='/'>Productos</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}