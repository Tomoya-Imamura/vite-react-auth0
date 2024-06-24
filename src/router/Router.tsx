import React, { FC, ComponentType } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { CircularProgress } from '@chakra-ui/react';
import { Home } from "../views/Home";
import NotFound from "../views/NotFound"
import { UpdateUser } from "../views/UpdateUser";
import { useAuth0 } from "@auth0/auth0-react";
import CheckAuthentication from '../views/CheckAuthentication';
import ListUsers from '../views/ListUsers';

interface ProtectedRouteProps {
  component: ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();

  if (isLoading) {
    return <CircularProgress isIndeterminate color='green.300' />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/notfound" state={{ from: location }} replace />;
  }

  return <Component />;
};


export const Router: FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/notfound' element={<NotFound />} />
        <Route path='/listUsers' element={<ProtectedRoute component={ListUsers} />} />
        <Route path='/checkAuthentication' element={<CheckAuthentication />} />
        <Route path="/update" element={<ProtectedRoute component={UpdateUser} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}