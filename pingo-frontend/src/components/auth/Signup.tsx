import { Link } from "react-router-dom";
import Auth from "./Auth";
import { Link as MUILink } from "@mui/material"
import { useCreateUser } from "../../hooks/useCreateUser";

const Signup = () => {
    const [createUser] = useCreateUser()
    return (<>
        <Auth submitButtonLabel="Signup" onSubmit={async ({ email, password }) => {

            await createUser({
                variables: {
                    createUserInput: {
                        email,
                        password
                    }
                }
            })
        }}>
            <Link to="/login" style={{ alignSelf: "center" }}>
                <MUILink >Already a user Login</MUILink>
            </Link>
        </Auth >
    </>)
}
export default Signup