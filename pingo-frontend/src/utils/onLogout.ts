import router from "../components/Routes";
import client from "../constants/apollo-client";
import { authenticatedVar } from "../constants/authenticate";
const onLogout = () => {
    authenticatedVar(false)
    router.navigate('/login');
    client?.resetStore();
}
export default onLogout