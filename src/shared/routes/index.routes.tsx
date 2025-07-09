import { useRoutes } from 'react-router-dom';
import authRoutes from '../../app/auth/auth.routes';
import spaceRoutes from '../../app/space/space.routes';
import spaceViewRoutes from '../../app/spaceView/spaceView.routes';

const AppRoutes = () => {
  const element = useRoutes([
    ...authRoutes,
    ...spaceRoutes,
    ...spaceViewRoutes
  ]);

  return element;
};

export default AppRoutes;
