import { createContext, useState } from "react";


const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || false)

    console.log(auth, 'authData');

    return <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
        {children}
    </AuthContext.Provider>
}


export { AuthProvider, AuthContext };
