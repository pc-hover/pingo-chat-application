import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import router from "./components/Routes"
import { RouterProvider } from "react-router-dom"
import { ApolloProvider } from "@apollo/client/react";
import client from "./constants/apollo-client";
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
        <Container>
          <h1>Pingo</h1>
        </Container>
        <Container>
          <RouterProvider router={router} />
        </Container>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
