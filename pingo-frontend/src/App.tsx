import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import router from "./components/Routes"
import { RouterProvider } from "react-router-dom"
import { ApolloProvider } from "@apollo/client/react";
import client from "./constants/apollo-client";
import Guard from "./components/auth/Guard";
import Header from "./components/header/Header";
const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
})

function App() {

  return (

    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header></Header>
        <Container>

          <Guard>
            <RouterProvider router={router} />
          </Guard>

        </Container>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
