import Auth from "./Auth";
import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material"
const Login = () => {
    return <Auth submitButtonLabel="Login" onSubmit={async () => { }}>
        <Link to="/signup" style={{ alignSelf: "center" }}>
            <MUILink> New User Sign up </MUILink>
        </Link>
    </Auth>
}
export default Login