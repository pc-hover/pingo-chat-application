import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material"

import router from "./components/Routes"
import { RouterProvider } from "react-router-dom"
const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
})

function App() {
  return <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Container>
      <h1>Pingo</h1>
    </Container>
    <Container>
      <RouterProvider router={router} />
    </Container>
  </ThemeProvider>
}

export default App
