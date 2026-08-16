import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MobileNavigation from './mobile/MobileNavigation';
import Container from '@mui/material/Container';
import Branding from './Branding';
import Navigation from './Navigation';
import MobileBranding from './mobile/MobileBranding';
import Settings from './Settings';
import { useReactiveVar } from '@apollo/client/react';
import { authenticatedVar } from '../../constants/authenticate';
import type { Page } from '../../interfaces/pages.interface';

const pages: Page[] = [
    {
        title: "Home",
        path: "/"
    }
];
const unauthenticatedPages: Page[] = [
    {
        title: "Login",
        path: "/login"
    },
    {
        title: "signup",
        path: "/signup"
    }
]
const settings = ['Logout'];

function Header() {

    const authenticated = useReactiveVar(authenticatedVar)
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Branding></Branding>
                    <MobileNavigation pages={authenticated ? pages : unauthenticatedPages} />
                    <MobileBranding />
                    <Navigation pages={authenticated ? pages : unauthenticatedPages} />
                    {authenticated && <Settings settings={settings} />}


                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
