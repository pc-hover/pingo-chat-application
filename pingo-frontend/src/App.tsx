import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import router from "./components/Routes"
import { RouterProvider } from "react-router-dom"
import { ApolloProvider } from "@apollo/client/react";
import client from "./constants/apollo-client";
import Guard from "./components/auth/Guard";
import Header from "./components/header/Header";
import Snackbar from "./components/snackbar/Snackbar";
import { Grid } from "@mui/material";
import ChatList from "./components/chat-list/ChatList";
import { usePath } from "./hooks/usePath";

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
})

function App() {
  const { path } = usePath()
  const showChatList = path === '/' || path.includes("chats")
  return (

    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header></Header>

        <Guard>
          <Container maxWidth="xl" sx={{ marginTop: "1rem" }}>

            {
              showChatList ? (
                <Grid container spacing={5}>
                  <Grid size={{ xs: 12, md: 5, xl: 3, lg: 4 }}>
                    <ChatList />
                  </Grid>
                  <Grid size={{ xs: 12, md: 7, lg: 8, xl: 9 }}>
                    <Routes />
                  </Grid>
                </Grid>
              ) : <Routes />
            }
          </Container>
        </Guard>

        <Snackbar />
      </ThemeProvider>
    </ApolloProvider>


  )
}
const Routes = () => {
  return (<>
    <RouterProvider router={router} />
  </>)
}

export default App
