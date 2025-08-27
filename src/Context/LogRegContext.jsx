// Context/AuthProvider.jsx
import { createContext, useContext, useReducer } from "react";
import { usersReducer, initialState } from "../Reducer/usersReduces.jsx";

export const LogRegContext = createContext();

export const LogRegReducerProvider = ({ children }) => {
    const [state, dispatch] = useReducer(usersReducer, initialState);

    return (
        <LogRegContext.Provider value={{ state, dispatch }}>
            {children}
        </LogRegContext.Provider>
    );
};

export const useLogReg = () => {
    return useContext(LogRegContext);
};
