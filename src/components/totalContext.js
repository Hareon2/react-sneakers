import React, { createContext, useState } from 'react';
import axios from "axios";

const TotalContext = createContext();
export const TotalProvider = ({ children }) => {
    const [total, setTotal] = useState(0);

    return (
        <TotalContext.Provider value={{ total,setTotal }}>
            {children}
        </TotalContext.Provider>
    );
};


export default TotalContext;
