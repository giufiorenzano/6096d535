import ActivityFeed from "./pages/activity/index.jsx";
import Call from "./pages/call/index.jsx";

export const routesConfig = [
  {
    id: "homepage",
    path: "/",
    name: "All",
    component: ActivityFeed,
    isNavLink: true,
  },
  {
    id: "archivedpage",
    path: "/archived",
    name: "Archived",
    component: ActivityFeed,
    isNavLink: true,
  },
  {
    id: "callpage",
    path: "/call/:id",
    name: "Call",
    component: Call,
    isNavLink: false,
  },
];
