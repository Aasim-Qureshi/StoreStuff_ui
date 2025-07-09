import { type RouteObject } from "react-router-dom";
import SpaceView from "./pages/SpaceView/SpaceView";

const spaceViewRoutes: RouteObject[] = [
    {path: '/space-view/:spaceId', element: <SpaceView/>}
];

export default spaceViewRoutes;
