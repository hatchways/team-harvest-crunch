import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import SocketContext from "./socketContext";
import AuthContext from "./authContext";

const SocketState = ({ children }) => {
    const [socket, setSocket] = useState();

    const { user, isAuthenticated } = useContext(AuthContext);
    const id = user._id;
    useEffect(() => {
        if (isAuthenticated) {
            const newSocket = io("http://localhost:3001", { query: { id } });
            setSocket(newSocket);
            console.log(newSocket);

            return () => newSocket.close();
        }
    }, [isAuthenticated]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketState;
