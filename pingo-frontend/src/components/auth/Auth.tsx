import { Button, Stack, TextField } from "@mui/material"
import { useState } from "react";

interface AuthType {
    submitButtonLabel: string,
    onSubmit: (credentials: { email: string, password: string }) => Promise<void>
    children: React.ReactNode,
    error?: string
}
const Auth = ({ submitButtonLabel, onSubmit, children, error }: AuthType) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    return <Stack spacing={3}
        sx={{
            height: "100vh",
            maxWidth: {
                xs: '70%', md: '30%'
            },
            margin: "0 auto",
            justifyContent: "center"
        }}
    >
        <h1
            style={{
                color: "white",
                textAlign: "center",
                fontSize: "50px",
                padding: "20px"
            }}
        >
            {submitButtonLabel}
        </h1>
        <TextField type="email" label="Email" variant="outlined" value={email} error={!!error} helperText={error} onChange={(event) => {
            setEmail(event.target.value)
        }} />
        <TextField type="password" label="Password" variant="outlined" value={password} error={!!error} helperText={error} onChange={(event) => {
            setPassword(event.target.value)
        }} />
        <Button variant="contained" onClick={() => { onSubmit({ email, password }) }} >{submitButtonLabel}</Button>
        {children}
    </Stack >
}
export default Auth