import React, {createContext, useContext, useReducer} from 'react';

export const StateContext = createContext();

//Don't forget the return!
export const StateProvider = ({reducer, initialState, children}) => {
    return <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
};

export const useStateValue = () => useContext(StateContext)