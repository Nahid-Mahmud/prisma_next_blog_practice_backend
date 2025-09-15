import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { postRoutes } from "../modules/post/post.route";

export const router = Router();

interface IModuleRoute {
  path: string;
  route: Router;
}

const moduleRoutes: IModuleRoute[] = [
  //   {
  // path: "/auth",
  // route: authRoutes,
  //   },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/post",
    route: postRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
