import { ReactNode, useReducer } from "react";
import ConfirmContext from "../context/ConfirmContext";
import confirmSlice, { confirmState } from "../slices/confirmSlice";

const ConfirmContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(confirmSlice, confirmState);

    return (
        <ConfirmContext.Provider value={[state, dispatch]}>
            {children}
        </ConfirmContext.Provider>
    );
};

export default ConfirmContextProvider;

