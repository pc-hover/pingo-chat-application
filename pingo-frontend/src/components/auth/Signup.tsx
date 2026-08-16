import { Link, useViewTransitionState } from "react-router-dom";
import Auth from "./Auth";
import { Link as MUILink } from "@mui/material"
import { useCreateUser } from "../../hooks/useCreateUser";
import { useState } from "react";
import { extractErrorMessage } from "../../utils/erros";
import { useLogin } from "../../hooks/useLogin";
const Signup = () => {
    const [createUser] = useCreateUser()
    const [error, setError] = useState("");
    const { login } = useLogin()
    return (<>
        <Auth submitButtonLabel="Signup"
            error={error}
            onSubmit={async ({ email, password }) => {
                try {
                    await createUser({
                        variables: {
                            createUserInput: {
                                email,
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