import { type RouteObject } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

const authRoutes: RouteObject[] = [
  { path: '/login', element: <Login />},
  { path: '/register', element: <Signup/>}
];

export default authRoutes;
