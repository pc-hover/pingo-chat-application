import { Box } from "@mui/material"
import { Button } from "@mui/material"
import React from "react"
import type { Page } from "../../interfaces/pages.interface"
import router from "../Routes"
interface NavigationProps {
    pages: Page[]
}
const Navigation = ({ pages }: NavigationProps) => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    return (<>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
                <Button
                    key={page.title}
                    onClick={() => {
                        router.navigate(page.path)
                        handleCloseNavMenu()
                    }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {page.title}
                </Button>
            ))}
        </Box>
    </>)
}

export default Navigation 