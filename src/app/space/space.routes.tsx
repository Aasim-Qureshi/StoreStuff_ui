import { type RouteObject } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

const spaceRoutes: RouteObject[] = [
  { path: '/dashboard', element: <Dashboard/> },
];

export default spaceRoutes;
