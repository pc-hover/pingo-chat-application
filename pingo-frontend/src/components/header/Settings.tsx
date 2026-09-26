import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { useLogout } from '../../hooks/useLogout';
import onLogout from '../../utils/onLogout';
import { snackVar } from '../../constants/snack';
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../../constants/error"
import router from '../Routes';
import { useGetChats } from '../../hooks/useGetChats';
import { useGetMe } from '../../hooks/useGetMe';

interface SettingsProps {
    settings: string[]
}

const Settings = ({ settings }: SettingsProps) => {

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const { logout } = useLogout()

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const usernameFirstLetter = useGetMe().data?.me.username?.charAt(0).toUpperCase()
    return <>
        <Box sx={{ flexGrow: 0 }} >
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="" src="">{usernameFirstLetter} </Avatar>
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
                <MenuItem
                    key="profile"
                    onClick={() => router.navigate('/profile')}
                >
                    <Typography sx={{ textAlign: 'center' }}>
                        Profile
                    </Typography>
                </MenuItem>

                <MenuItem key='logout' onClick={async () => {

                    try {
                        await logout()
                        onLogout()
                        handleCloseUserMenu()
                    } catch (error) {
                        snackVar(UNKNOWN_ERROR_SNACK_MESSAGE)
                    }

                }}>
                    <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                </MenuItem>

            </Menu>
        </Box>
    </>
}

export default Settings