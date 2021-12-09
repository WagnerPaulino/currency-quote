import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Outlet } from 'react-router';

export function Dashboard() {

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Currency Quote
                        </Typography>
                        <Button color="inherit">Favorites</Button>
                    </Toolbar>
                </AppBar>
                <Outlet />
            </Box>
        </div>
    )
}