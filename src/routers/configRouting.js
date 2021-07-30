import Home from "../page/Home/Home";
import Error404 from "../page/Error404/Error404";
import User from "../page/User";

const routes = [
  {
    path: "/",
    exact: true,
    page: Home,
  },
  {
    path: "/:userId",
    exact: true,
    page: User,
  },
  {
    path: "*",
    page: Error404,
  },
];

export default routes;
