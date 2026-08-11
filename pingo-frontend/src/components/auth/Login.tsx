import Auth from "./Auth";
import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material"
import { useLogin } from "../../hooks/useLogin";
const Login = () => {
    const { login, error } = useLogin();

    return <Auth submitButtonLabel="Login" error={error} onSubmit={async (request) => login(request)
    }>
        <Link to="/signup" style={{ alignSelf: "center" }}>
            <MUILink> New User Sign up </MUILink>
        </Link>
    </Auth>
}
export default Login