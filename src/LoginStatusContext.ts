import { createContext, Dispatch, SetStateAction } from "react";

const LoginStatusContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>] | null>(null);

export default LoginStatusContext;