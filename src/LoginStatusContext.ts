import { createContext } from "react";

const LoginStatusContext = createContext<
	[boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, () => {}]);

export default LoginStatusContext;
