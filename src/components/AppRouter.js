import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from "../routers";
import { Context } from "../index";

const AppRouter = () => {

    const { user } = useContext(Context);

    return (
        <Routes>
            {authRoutes.map(({ path, Component }) => (
                <Route
                    key={path}
                    path={path}
                    element={user.isAuth ? <Component /> : <Navigate to="/login" replace />}
                />
            ))}

            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
        </Routes>
    );
};

export default AppRouter;