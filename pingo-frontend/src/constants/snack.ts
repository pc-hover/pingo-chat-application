import { makeVar } from "@apollo/client";
import type { SnackMessage } from "../interfaces/snack-message.interface";

export const snackVar = makeVar<SnackMessage | undefined>(undefined);