import router from "../components/Routes";
import client from "../constants/apollo-client";
import { authenticatedVar } from "../constants/authenticate";
import { clearToken } from "./token";
const onLogout = () => {
    authenticatedVar(false)
    clearToken();
    router.navigate('/login');
    client?.resetStore();
}
export default onLogout