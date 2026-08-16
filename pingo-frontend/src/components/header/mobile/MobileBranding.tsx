import { Typography } from '@mui/material';
import ThreePIcon from '@mui/icons-material/ThreeP';
import router from '../../Routes';
const MobileBranding = () => {
    return <>
        <ThreePIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => { router.navigate("/") }}
            sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                cursor: "pointer",
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
            }}
        >
            PINGO
        </Typography>
    </>
}

export default MobileBranding