import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/adminlogin",
    name: "adminlogin",
    component: () => import("../views/AdminLoginView.vue"),
  },
  {
    path: "/admindashboard",
    name: "admindashboard",
    component: () => import("../views/AdminDashboardView.vue"),
  },
  {
    path: "/userdashboard",
    name: "userdashboard",
    component: () => import("../views/UserDashboardView.vue"),
  },
  {
    path: "/user_bookings",
    name: "user_bookings",
    component: () => import("../views/UserTicketView.vue"),
  },
  {
    path: "/BookShow/:showing_id",
    name: "BookShow/:showing_id",
    component: () => import("../views/BookView.vue"),
  },
  {
    path: "/createTheatre/",
    name: "createTheatre/",
    component: () => import("../views/CreateTheatreView.vue"),
  },
  {
    path: "/createShow/",
    name: "createShow/",
    component: () => import("../views/CreateShowView.vue"),
  },
  {
    path: "/EditShow/:id",
    name: "EditShow/",
    component: () => import("../views/EditShowView.vue"),
  },
  {
    path: "/EditTheatre/:id",
    name: "EditTheatre/:id",
    component: () => import("../views/EditTheatreView.vue"),
  },

  {
    path: "/export_csv",
    name: "export_csv",
    component: () => import("../views/TheatreCSVView"),
  },

  {
    path: "/search_shows_by_tag",
    name: "search_shows_by_tag",
    component: () => import("../views/SearchTagView.vue"),
  },
  {
    path: "/search_theatres_by_location",
    name: "search_theatres_by_location",
    component: () => import("../views/SearchLocationView.vue"),
  },

  {
    path: "/",
    name: "first",
    component: () => import("../views/First.vue"),
  },

  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
