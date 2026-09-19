import { Link } from "react-router-dom";
import Auth from "./Auth";
import { Link as MUILink } from "@mui/material"
import { useCreateUser } from "../../hooks/useCreateUser";
import { useState } from "react";
import { extractErrorMessage } from "../../utils/erros";
import { useLogin } from "../../hooks/useLogin";
import { TextField } from "@mui/material";
const Signup = () => {
    const [createUser] = useCreateUser()
    const [error, setError] = useState("");
    const { login } = useLogin()
    const [username, setUsername] = useState("")
    return (<>
        <Auth submitButtonLabel="Signup"
            error={error}
            extraFields={[
                <TextField type="name" label="User Name" variant="outlined" value={username} error={!!error} helperText={error} onChange={(event) => {
                    setUsername(event.target.value)
                }} />

            ]}
            onSubmit={async ({ email, password }) => {
                try {
                    await createUser({
                        variables: {
                            createUserInput: {
                                email,
                                username,
                                password
                            }
                        }
                    });

                    await login({ email, password })
                    setError("")
                } catch (err) {

                    const errorMessage = extractErrorMessage(err)
                    if (errorMessage) {
                        setError(errorMessage)
                        return;
                    }
                    setError("Unknown Error Occured")
                }
            }}

        >
            <Link to="/login" style={{ alignSelf: "center" }}>
                <MUILink >Already a user Login</MUILink>
            </Link>
        </Auth >
    </>)
}
export default Signup