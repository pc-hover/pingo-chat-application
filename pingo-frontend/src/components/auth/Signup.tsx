import { Link } from "react-router-dom";
import Auth from "./Auth";
import { Link as MUILink } from "@mui/material"

const Signup = () => {
    return (<>
        <Auth submitButtonLabel="Signup" onSubmit={async () => { }}>
            <Link to="/login" style={{ alignSelf: "center" }}>
                <MUILink >Already a user Login</MUILink>
            </Link>
        </Auth >
    </>)
}
export default Signup