import { useCallback, useState } from "react";
import { API_URL } from "../constants/urls";
import { snackVar } from "../constants/snack";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../constants/error";
import { commonFetch } from "../utils/fetch";

const useCountChats = () => {
    const [chatsCount, setChatsCount] = useState<number | undefined>();

    const countChats = useCallback(async () => {
        const res = await commonFetch(`${API_URL}/chats/count`)
        console.log("this is the countChats:", res.status)
        if (!res.ok) {
            if (res.status !== 401) {

                snackVar(UNKNOWN_ERROR_SNACK_MESSAGE)
                return
            }
        }
        const count = parseInt(
            await res.text()
        )
        if (Number.isNaN(count)) {
            console.error('Unexpected /chats/count response')
            return;
        }
        setChatsCount(count)
    }, [])

    return {
        chatsCount, countChats

    }
}

export { useCountChats }