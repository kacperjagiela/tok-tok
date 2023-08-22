import { RouteObject } from "react-router-dom";

import { FeedType } from "./components/Feed";
import { Main, SingleProfile, Upload } from "./pages";

export enum RoutesEnum {
  Home = "/",
  Following = "/following",
  Mentions = "/mentions",
  UserProfile = "/profile/:username",
  Upload = "/upload",
}

export const routes: RouteObject[] = [
  { path: RoutesEnum.Home, element: <Main /> },
  {
    path: RoutesEnum.Following,
    element: <Main feedType={FeedType.Following} />,
  },
  { path: RoutesEnum.Mentions, element: <Main feedType={FeedType.Mentions} /> },
  { path: RoutesEnum.UserProfile, element: <SingleProfile /> },
  { path: RoutesEnum.Upload, element: <Upload /> },
];
