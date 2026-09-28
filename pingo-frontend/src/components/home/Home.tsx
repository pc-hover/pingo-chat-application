
import { Container, Typography, Box } from "@mui/material";
import { useGetMe } from "../../hooks/useGetMe";

const Home = () => {
    const username = useGetMe().data?.me.username

    return (
        <Container maxWidth="xl">
            <Box sx={{ textAlign: "center", mt: 10 }}>
                <Typography sx={{ fontWeight: 600 }} variant="h3" gutterBottom>
                    Welcome, {username}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Your conversations, all in one place.
                    Connect with friends, share moments, and stay in the loop — anytime, anywhere.
                    <br />
                    Let's get chatting!
                </Typography>
            </Box>
        </Container >
    );
};

export default Home;