import { useEffect, type ReactNode } from "react";
import { useGetMe } from "../../hooks/useGetMe";
import excludedRoutes from "../../constants/excluded-routes";
import { authenticatedVar } from "../../constants/authenticate";
import { snackVar } from "../../constants/snack";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../../constants/error";
import { CombinedGraphQLErrors } from "@apollo/client";
interface GuardProps {
    children: ReactNode;
}

const Guard = ({ children }: GuardProps) => {
    const { data, error } = useGetMe();
    const user = data;
    // console.log("Inside GUARD", user)

    useEffect(() => {
        if (user) {
            authenticatedVar(true)
        }
    }, [user])

    useEffect(() => {
        if (error && !CombinedGraphQLErrors.is(error)) {
            snackVar(UNKNOWN_ERROR_SNACK_MESSAGE)
        }
    }, [error])
    return (
        <>
            {excludedRoutes.includes(window.location.pathname) ? children : user && children}
        </>
    );
};

export default Guard;