import { flatRoutes } from "@react-router/fs-routes";
import { type RouteConfig, index } from "@react-router/dev/routes";

// export default [index("routes/home.tsx")] satisfies RouteConfig;

export default flatRoutes() satisfies RouteConfig;
