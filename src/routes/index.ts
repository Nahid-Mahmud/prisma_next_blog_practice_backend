import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { postRoutes } from "../modules/post/post.route";
import { UserRoutes } from "../modules/user/user.route";

export const router = Router();

interface IModuleRoute {
  path: string;
  route: Router;
}

const moduleRoutes: IModuleRoute[] = [
  {
    path: "/auth",
    route: authRoutes,
  },
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
