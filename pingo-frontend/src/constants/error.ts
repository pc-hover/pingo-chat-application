import type { SnackMessage } from "../interfaces/snack-message.interface"

const UNKNOWN_ERROR_MESSAGE = "An Unknown Error has occured Please try again later. "
const UNKNOWN_ERROR_SNACK_MESSAGE: SnackMessage = {
    type: "error",
    message: UNKNOWN_ERROR_MESSAGE
}

export { UNKNOWN_ERROR_MESSAGE, UNKNOWN_ERROR_SNACK_MESSAGE }