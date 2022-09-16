
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

export const Navbar = () => {
    return (
        <AppBar position='sticky' >
            <Toolbar>
                <IconButton
                    size='large'
                    edge='start'>
                    <MenuIcon />
                </IconButton>
                <Typography variant='h6'>
                    Open Jira
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
