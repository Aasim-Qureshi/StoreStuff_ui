import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './index.routes';

const Router = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default Router;
