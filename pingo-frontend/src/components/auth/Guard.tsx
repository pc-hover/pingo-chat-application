import type { ReactNode } from "react";
import { useGetMe } from "../../hooks/useGetMe";
import excludedRoutes from "../../constants/excluded-routes";

interface GuardProps {
    children: ReactNode;
}

const Guard = ({ children }: GuardProps) => {
    const { data } = useGetMe();
    const user = data;
    console.log("Inside GUARD", user)
    return (
        <>
            {excludedRoutes.includes(window.location.pathname) ? children : user && children}
        </>
    );
};

export default Guard;